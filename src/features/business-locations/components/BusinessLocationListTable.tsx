import DataPagination from '@/components/shared/pagination/DataPagination';
import { DataTable } from '@/components/shared/table/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import httpClient from '@/lib/http';
import { BusinessEntity } from '@/types/business-entities';
import { BusinessLocation } from '@/types/business-locations';
import { FormattedApiError } from '@/types/errors';
import { Pagination } from '@/types/pagination';
import { getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { toast } from 'sonner';
import useBusinessLocationColumns from './columns';
import DeleteBusinessLocationDialog from './DeleteBusinessLocationDialog';

export interface BusinessLocationListTable {
  onRowClick?: (location: BusinessLocation) => void;
}

interface SelectOption {
  value: string | number;
  label: string;
}

interface Additional {
  page: number;
}

const fetchEntityOptions: LoadOptions<SelectOption, any, Additional> = async (inputValue = '', loadedOptions = [], additional = { page: 0 }) => {
  const results = await httpClient
    .get('web-app/business-entities', {
      params: { search: inputValue, size: 10, page: additional.page },
    })
    .then((res) => {
      const options = res.data.data.data.map((item: BusinessEntity) => ({
        value: item.id,
        label: item.option_label ?? item.name,
      }));

      return {
        options,
        hasMore: loadedOptions.length < res.data.data.total,
        additional: {
          page: (additional?.page ?? 0) + 1,
        },
      };
    })
    .catch((error) => {
      toast.error((error as FormattedApiError).message);
      return {
        options: [],
        hasMore: false,
      };
    });

  return results;
};

const BusinessLocationListTable = (props: BusinessLocationListTable) => {
  const { onRowClick } = props;

  const [isBatchDeleteDialogOpen, setIsBatchDeleteDialogOpen] = useState(false);
  const [isSingleDeleteDialogOpen, setIsSingleDeleteDialogOpen] = useState(false);
  const [selectedEntityFilter, setSelectedEntityFilter] = useState<SelectOption | null>(null);
  const [businessLocationToDelete, setBusinessLocationToDelete] = useState<BusinessLocation | null>(null);
  const [businessLocations, setBusinessLocations] = useState<BusinessLocation[]>([]);
  const [businessLocationsSearch, setBusinessLocationsSearch] = useState<string>('');
  const [businessLocationsSorting, setBusinessLocationsSorting] = useState<SortingState>([]);
  const [businessLocationsPagination, setBusinessLocationsPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  });

  const debouncedSearch = useDebounce(businessLocationsSearch, 300);
  const columns = useBusinessLocationColumns({
    onRowClick: (location: BusinessLocation) => onRowClick && onRowClick(location),
    onRowDelete: (location: BusinessLocation) => handleSingleDelete(location),
  });

  const table = useReactTable({
    data: businessLocations,
    columns,
    state: { sorting: businessLocationsSorting },
    manualSorting: true,
    onSortingChange: setBusinessLocationsSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchBusinessLocations = useCallback(() => {
    const controller = new AbortController();
    const sortBy = businessLocationsSorting.length ? businessLocationsSorting[0].id : '';
    const sortOrder = businessLocationsSorting.length ? (businessLocationsSorting[0].desc ? 'desc' : 'asc') : '';

    httpClient
      .get('/web-app/business-locations', {
        signal: controller.signal,
        params: {
          page: businessLocationsPagination.currentPage,
          size: businessLocationsPagination.pageSize,
          business_entity_id: selectedEntityFilter?.value,
          search: debouncedSearch,
          sort: sortBy,
          order: sortOrder,
        },
      })
      .then((res) => {
        setBusinessLocations(res.data.data.data);
        setBusinessLocationsPagination((current) => ({ ...current, totalItems: res.data.data.total }));
      })
      .catch((error: FormattedApiError) => {
        toast(error.message);
      });

    return controller;
  }, [businessLocationsPagination.currentPage, businessLocationsPagination.pageSize, debouncedSearch, businessLocationsSorting, selectedEntityFilter]);

  const handlePageChange = (page: number) => {
    table.resetRowSelection();
    setBusinessLocationsPagination((current) => ({ ...current, currentPage: page }));
  };

  const handleBatchDelete = () => {
    const isOpen = table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected();
    setIsBatchDeleteDialogOpen(isOpen);
  };

  const handleSingleDelete = (location: BusinessLocation) => {
    setBusinessLocationToDelete(location);
    setIsSingleDeleteDialogOpen(!!location);
  };

  const refreshLocations = useCallback(() => {
    table.resetRowSelection();
    if (businessLocationsPagination.currentPage > 1) {
      setBusinessLocationsPagination((prev) => ({ ...prev, currentPage: 1 }));
    } else {
      fetchBusinessLocations();
    }
  }, [fetchBusinessLocations, businessLocationsPagination.currentPage, table]);

  useEffect(() => {
    // Reset pagination and fetch data when search changes
    setBusinessLocationsPagination((prev) => ({ ...prev, currentPage: 1 }));
    const controller = fetchBusinessLocations();
    return () => controller.abort();
  }, [debouncedSearch, fetchBusinessLocations]);

  useEffect(() => {
    // Setup event listeners for refresh
    window.addEventListener('business-location-created', refreshLocations);
    window.addEventListener('business-location-updated', refreshLocations);
    window.addEventListener('business-location-deleted', refreshLocations);

    return () => {
      window.removeEventListener('business-location-created', refreshLocations);
      window.removeEventListener('business-location-updated', refreshLocations);
      window.removeEventListener('business-location-deleted', refreshLocations);
    };
  }, [refreshLocations]);

  return (
    <>
      {/* List Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid w-full gap-4">
            <div className="flex w-full items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" absoluteStrokeWidth />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full max-w-full pl-8 md:w-64"
                  value={businessLocationsSearch}
                  onChange={(e) => setBusinessLocationsSearch(e.target.value)}
                />
              </div>
              <div className="relative">
                <AsyncPaginate
                  value={selectedEntityFilter}
                  loadOptions={fetchEntityOptions}
                  onChange={setSelectedEntityFilter}
                  debounceTimeout={300}
                  pageSize={10}
                  additional={{ page: 1 }}
                  placeholder="All Entities"
                  className="w-48 max-w-full text-sm text-black"
                  isClearable={true}
                />
              </div>
            </div>

            {(table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()) && (
              <div className="flex items-center gap-3">
                <Button variant="destructive" size="sm" onClick={handleBatchDelete}>
                  <span>Delete</span>
                </Button>
                <p className="text-sm text-muted-foreground">{table.getSelectedRowModel().rows.length} row(s) selected</p>
              </div>
            )}

            {/* Main Table */}
            <DataTable table={table} />

            <div className="flex w-full justify-center overflow-x-auto md:justify-end">
              <div className="w-fit">
                <DataPagination
                  pageSize={businessLocationsPagination.pageSize}
                  totalItems={businessLocationsPagination.totalItems}
                  currentPage={businessLocationsPagination.currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batch Delete Dialog */}
      <DeleteBusinessLocationDialog
        isOpen={isBatchDeleteDialogOpen}
        setIsOpen={setIsBatchDeleteDialogOpen}
        selectedIds={table.getSelectedRowModel().rows.map((row) => row.original.id)}
      />

      {/* Single Delete Dialog */}
      <DeleteBusinessLocationDialog
        isOpen={isSingleDeleteDialogOpen}
        setIsOpen={setIsSingleDeleteDialogOpen}
        selectedIds={businessLocationToDelete ? [businessLocationToDelete.id] : []}
      />
    </>
  );
};

export default BusinessLocationListTable;

import DataPagination from '@/components/shared/pagination/DataPagination';
import { DataTable } from '@/components/shared/table/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import httpClient from '@/lib/http';
import { BusinessEntity } from '@/types/business-entities';
import { FormattedApiError } from '@/types/errors';
import { Pagination } from '@/types/pagination';
import { getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Search, Trash } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import useBusinessEntityColumns from './columns';
import DeleteBusinessEntityDialog from './DeleteBusinessEntityDialog';

export interface BusinessEntityListTable {
  onRowClick?: (entity: BusinessEntity) => void;
}

const BusinessEntityListTable = (props: BusinessEntityListTable) => {
  const { onRowClick } = props;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [businessEntities, setBusinessEntities] = useState<BusinessEntity[]>([]);
  const [businessEntitiesSearch, setBusinessEntitiesSearch] = useState<string>('');
  const [businessEntitiesSorting, setBusinessEntitiesSorting] = useState<SortingState>([]);
  const [businessEntitiesPagination, setBusinessEntitiesPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  });

  const debouncedSearch = useDebounce(businessEntitiesSearch, 300);
  const columns = useBusinessEntityColumns({
    onRowClick: (entity: BusinessEntity) => onRowClick && onRowClick(entity),
  });

  const table = useReactTable({
    data: businessEntities,
    columns,
    state: { sorting: businessEntitiesSorting },
    manualSorting: true,
    onSortingChange: setBusinessEntitiesSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchBusinessEntities = useCallback(() => {
    const controller = new AbortController();
    const sortBy = businessEntitiesSorting.length ? businessEntitiesSorting[0].id : '';
    const sortOrder = businessEntitiesSorting.length ? (businessEntitiesSorting[0].desc ? 'desc' : 'asc') : '';

    httpClient
      .get('/web-app/business-entities', {
        signal: controller.signal,
        params: {
          page: businessEntitiesPagination.currentPage,
          size: businessEntitiesPagination.pageSize,
          search: debouncedSearch,
          sort: sortBy,
          order: sortOrder,
        },
      })
      .then((res) => {
        setBusinessEntities(res.data.data.data);
        setBusinessEntitiesPagination((current) => ({ ...current, totalItems: res.data.data.total }));
      })
      .catch((error: FormattedApiError) => {
        toast(error.message);
      });

    return controller;
  }, [businessEntitiesPagination.currentPage, businessEntitiesPagination.pageSize, debouncedSearch, businessEntitiesSorting]);

  const handlePageChange = (page: number) => {
    table.resetRowSelection();
    setBusinessEntitiesPagination((current) => ({ ...current, currentPage: page }));
  };

  const handleBatchDelete = () => {
    const isOpen = table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected();
    setIsDeleteDialogOpen(isOpen);
  };

  const refreshEntities = useCallback(() => {
    table.resetRowSelection();
    if (businessEntitiesPagination.currentPage > 1) {
      setBusinessEntitiesPagination((prev) => ({ ...prev, currentPage: 1 }));
    } else {
      fetchBusinessEntities();
    }
  }, [fetchBusinessEntities, businessEntitiesPagination.currentPage, table]);

  useEffect(() => {
    // Reset pagination and fetch data when search changes
    setBusinessEntitiesPagination((prev) => ({ ...prev, currentPage: 1 }));
    const controller = fetchBusinessEntities();
    return () => controller.abort();
  }, [debouncedSearch, fetchBusinessEntities]);

  useEffect(() => {
    // Setup event listeners for refresh
    window.addEventListener('business-entity-created', refreshEntities);
    window.addEventListener('business-entity-updated', refreshEntities);
    window.addEventListener('business-entity-deleted', refreshEntities);

    return () => {
      window.removeEventListener('business-entity-created', refreshEntities);
      window.removeEventListener('business-entity-updated', refreshEntities);
      window.removeEventListener('business-entity-deleted', refreshEntities);
    };
  }, [refreshEntities]);

  return (
    <>
      {/* List Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid w-full gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex-1">
                {(table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected()) && (
                  <div className="flex items-center gap-2">
                    <Button variant="destructive" size="sm" className="text-xs" onClick={handleBatchDelete}>
                      <Trash className="size-3" absoluteStrokeWidth />
                      <span>Delete</span>
                    </Button>
                    <span className="text-sm text-muted-foreground">{table.getSelectedRowModel().rows.length} row(s) selected</span>
                  </div>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" absoluteStrokeWidth />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full max-w-full pl-8 md:w-64"
                  value={businessEntitiesSearch}
                  onChange={(e) => setBusinessEntitiesSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Main Table */}
            <DataTable table={table} />

            <div className="flex w-full justify-center overflow-x-auto md:justify-end">
              <div className="w-fit">
                <DataPagination
                  pageSize={businessEntitiesPagination.pageSize}
                  totalItems={businessEntitiesPagination.totalItems}
                  currentPage={businessEntitiesPagination.currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <DeleteBusinessEntityDialog isOpen={isDeleteDialogOpen} setIsOpen={setIsDeleteDialogOpen} selectedRows={table.getSelectedRowModel().rows} />
    </>
  );
};

export default BusinessEntityListTable;

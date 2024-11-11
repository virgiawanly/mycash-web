import DataPagination from '@/components/shared/pagination/DataPagination';
import { DataTable } from '@/components/shared/table/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import httpClient from '@/lib/http';
import { BusinessEntity } from '@/types/business-entities';
import { FormattedApiError } from '@/types/errors';
import { Pagination } from '@/types/pagination';
import { SortingState } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import useBusinessEntityColumns from './columns';

export interface BusinessEntityListTable {
  onRowClick?: (entity: BusinessEntity) => void;
}

const BusinessEntityListTable = (props: BusinessEntityListTable) => {
  const { onRowClick } = props;
  const [businessEntities, setBusinessEntities] = useState<BusinessEntity[]>([]);
  const [businessEntitiesSearch, setBusinessEntitiesSearch] = useState<string>('');
  const [businessEntitiesSort, setBusinessEntitiesSort] = useState<SortingState>([]);
  const [businessEntitiesPagination, setBusinessEntitiesPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  });

  const debouncedSearch = useDebounce(businessEntitiesSearch, 300);
  const columns = useBusinessEntityColumns({
    onRowClick: (entity: BusinessEntity) => onRowClick && onRowClick(entity),
  });

  const fetchBusinessEntities = useCallback(() => {
    const controller = new AbortController();
    const sortBy = businessEntitiesSort.length ? businessEntitiesSort[0].id : '';
    const sortOrder = businessEntitiesSort.length ? (businessEntitiesSort[0].desc ? 'desc' : 'asc') : '';

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
  }, [businessEntitiesPagination.currentPage, businessEntitiesPagination.pageSize, debouncedSearch, businessEntitiesSort]);

  const handlePageChange = (page: number) => {
    setBusinessEntitiesPagination((current) => ({ ...current, currentPage: page }));
  };

  useEffect(() => {
    if (debouncedSearch) {
      setBusinessEntitiesPagination((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const controller = fetchBusinessEntities();
    return () => controller.abort();
  }, [fetchBusinessEntities]);

  useEffect(() => {
    window.addEventListener('business-entity-created', fetchBusinessEntities);
    window.addEventListener('business-entity-updated', fetchBusinessEntities);

    return () => {
      window.removeEventListener('business-entity-created', fetchBusinessEntities);
      window.removeEventListener('business-entity-updated', fetchBusinessEntities);
    };
  }, [fetchBusinessEntities]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid w-full gap-4">
          <div className="w-full items-center justify-end md:flex">
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

          <DataTable columns={columns} data={businessEntities} sorting={businessEntitiesSort} onSortingChange={setBusinessEntitiesSort} />

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
  );
};

export default BusinessEntityListTable;

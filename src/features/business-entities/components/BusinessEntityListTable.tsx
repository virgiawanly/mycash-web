import DataPagination from '@/components/shared/pagination/DataPagination';
import { DataTable } from '@/components/shared/table/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import apiService from '@/services/api';
import { BusinessEntity } from '@/types/business-entities';
import { FormattedApiError } from '@/types/errors';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import columns from './columns';

const BusinessEntityListTable = () => {
  const [businessEntities, setBusinessEntities] = useState<BusinessEntity[]>([]);

  const getBusinessEntities = useCallback((signal: AbortSignal) => {
    apiService
      .get('/web-app/business-entities', { signal })
      .then((res) => {
        setBusinessEntities(res.data.data.data);
      })
      .catch((error: FormattedApiError) => {
        toast(error.message);
      });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    getBusinessEntities(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [getBusinessEntities]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid w-full gap-4">
          <div className="flex items-center w-full justify-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" absoluteStrokeWidth />
              <Input type="search" placeholder="Search..." className="pl-8 max-w-full w-64" />
            </div>
          </div>
          <DataTable columns={columns} data={businessEntities} />
          <div className="flex items-center justify-end w-full">
            <div className="w-fit">
              <DataPagination pageSize={10} totalItems={businessEntities.length} currentPage={1} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessEntityListTable;

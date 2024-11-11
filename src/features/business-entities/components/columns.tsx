import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { BusinessEntity } from '@/types/business-entities';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { useMemo } from 'react';

export interface BusinessEntityColumnsProps {
  onRowClick: (row: BusinessEntity) => void;
}

const useBusinessEntityColumns = ({ onRowClick }: BusinessEntityColumnsProps): ColumnDef<BusinessEntity>[] => {
  const columns = useMemo<ColumnDef<BusinessEntity>[]>(
    () => [
      {
        id: 'select',
        size: 10,
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'code',
        size: 200,
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between"
            onClick={() => {
              const isSorted = column.getIsSorted();
              if (isSorted === 'asc') {
                column.toggleSorting(true);
              } else if (isSorted === 'desc') {
                column.clearSorting();
              } else {
                column.toggleSorting(false);
              }
            }}
          >
            Code
            {column.getIsSorted() === 'asc' && <ChevronUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ChevronDown className="ml-2 h-4 w-4" />}
            {!column.getIsSorted() && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex size-full cursor-pointer items-center pl-4" onClick={() => onRowClick(row.original)}>
            {row.getValue('code')}
          </div>
        ),
      },
      {
        accessorKey: 'name',
        size: 300,
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between"
            onClick={() => {
              const isSorted = column.getIsSorted();
              if (isSorted === 'asc') {
                column.toggleSorting(true);
              } else if (isSorted === 'desc') {
                column.clearSorting();
              } else {
                column.toggleSorting(false);
              }
            }}
          >
            Name
            {column.getIsSorted() === 'asc' && <ChevronUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ChevronDown className="ml-2 h-4 w-4" />}
            {!column.getIsSorted() && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex size-full cursor-pointer items-center pl-4" onClick={() => onRowClick(row.original)}>
            {row.getValue('name')}
          </div>
        ),
      },
    ],
    [onRowClick],
  );

  return columns;
};

export default useBusinessEntityColumns;

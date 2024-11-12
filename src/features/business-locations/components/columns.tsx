import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BusinessLocation } from '@/types/business-locations';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { useMemo } from 'react';

export interface BusinessLocationColumnsProps {
  onRowClick: (row: BusinessLocation) => any;
  onRowDelete: (row: BusinessLocation) => any;
}

const useBusinessLocationColumns = ({ onRowClick, onRowDelete }: BusinessLocationColumnsProps): ColumnDef<BusinessLocation>[] => {
  const columns = useMemo<ColumnDef<BusinessLocation>[]>(
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
        id: 'business_entity',
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
            Entity
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
            {!column.getIsSorted() && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex size-full cursor-pointer items-center pl-4" onClick={() => onRowClick(row.original)}>
            {row.original.business_entity?.code} - {row.original.business_entity?.name}
          </div>
        ),
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
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
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
        size: 350,
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
            {column.getIsSorted() === 'asc' && <ArrowUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDown className="ml-2 h-4 w-4" />}
            {!column.getIsSorted() && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-30" />}
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex size-full cursor-pointer items-center pl-4" onClick={() => onRowClick(row.original)}>
            {row.getValue('name')}
          </div>
        ),
      },
      {
        id: 'actions',
        size: 30,
        cell: ({ row }) => (
          <div className="flex w-full items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onRowDelete(row.original)} className="cursor-pointer">
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [onRowClick, onRowDelete],
  );

  return columns;
};

export default useBusinessLocationColumns;

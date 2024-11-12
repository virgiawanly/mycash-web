import PageBreadcrumb, { PageBreadcrumbItem } from '@/components/shared/breadcrumbs/PageBreadcrumb';
import { BusinessEntity } from '@/types/business-entities';
import { useState } from 'react';
import BusinessEntityListHeader from '../components/BusinessEntityListHeader';
import BusinessEntityListTable from '../components/BusinessEntityListTable';
import CreateBusinessEntityDialog from '../components/CreateBusinessEntityDialog';
import EditBusinessEntityDialog from '../components/EditBusinessEntityDialog';

const breadcrumbItems: PageBreadcrumbItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Settings', url: '/settings' },
  { name: 'Business Entities', url: '/settings/business-entities', isActive: true },
];

const BusinessEntityListPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [businessEntityToEdit, setBusinessEntityToEdit] = useState<BusinessEntity | null>(null);

  const handleRowClick = (entity: BusinessEntity) => {
    setIsEditDialogOpen(true);
    setBusinessEntityToEdit(entity);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-background">
      <div className="w-full border-b bg-background p-4">
        <div className="w-full max-w-screen-2xl">
          <PageBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-2xl p-5">
        <div className="grid gap-5">
          {/* Header */}
          <BusinessEntityListHeader onClickCreate={() => setIsCreateDialogOpen(true)} />

          {/* Table */}
          <BusinessEntityListTable onRowClick={handleRowClick} />

          {/* Create Dialog */}
          <CreateBusinessEntityDialog isOpen={isCreateDialogOpen} setIsOpen={setIsCreateDialogOpen} />

          {/* Edit Dialog */}
          <EditBusinessEntityDialog isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} businessEntity={businessEntityToEdit} />
        </div>
      </div>
    </div>
  );
};

export default BusinessEntityListPage;

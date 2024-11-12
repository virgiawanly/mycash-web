import PageBreadcrumb, { PageBreadcrumbItem } from '@/components/shared/breadcrumbs/PageBreadcrumb';
import { BusinessLocation } from '@/types/business-locations';
import { useState } from 'react';
import BusinessLocationListHeader from '../components/BusinessLocationListHeader';
import BusinessLocationListTable from '../components/BusinessLocationListTable';
import CreateBusinessLocationDialog from '../components/CreateBusinessLocationDialog';
import EditBusinessLocationDialog from '../components/EditBusinessLocationDialog';

const breadcrumbItems: PageBreadcrumbItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Settings', url: '/settings' },
  { name: 'Business Locations', url: '/settings/business-locations', isActive: true },
];

const BusinessLocationListPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [businessLocationToEdit, setBusinessLocationToEdit] = useState<BusinessLocation | null>(null);

  const handleRowClick = (location: BusinessLocation) => {
    setBusinessLocationToEdit(location);
    setIsEditDialogOpen(true);
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
          <BusinessLocationListHeader onClickCreate={() => setIsCreateDialogOpen(true)} />

          {/* Table */}
          <BusinessLocationListTable onRowClick={handleRowClick} />

          {/* Create Dialog */}
          <CreateBusinessLocationDialog isOpen={isCreateDialogOpen} setIsOpen={setIsCreateDialogOpen} />

          {/* Edit Dialog */}
          <EditBusinessLocationDialog isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} businessLocation={businessLocationToEdit} />
        </div>
      </div>
    </div>
  );
};

export default BusinessLocationListPage;

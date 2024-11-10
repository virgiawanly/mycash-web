import PageBreadcrumb, { PageBreadcrumbItem } from '@/components/shared/breadcrumbs/PageBreadcrumb';
import BusinessEntityListHeader from '../components/BusinessEntityListHeader';
import BusinessEntityListTable from '../components/BusinessEntityListTable';

const breadcrumbItems: PageBreadcrumbItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Settings', url: '/settings' },
  { name: 'Business Entities', url: '/settings/business-entities', isActive: true },
];

const BusinessEntityListPage = () => {
  return (
    <div className="grid gap-5">
      <div className="w-full">
        <PageBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Header */}
      <BusinessEntityListHeader />

      {/* Table */}
      <BusinessEntityListTable />
    </div>
  );
};

export default BusinessEntityListPage;

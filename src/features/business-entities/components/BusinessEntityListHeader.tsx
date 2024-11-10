import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessEntityListHeader = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center w-full justify-between">
          <div className="flex-1">
            <CardTitle>Business Entities</CardTitle>
          </div>
          <div className="flex items-center">
            <Button asChild>
              <Link to="/settings/business-entities/new">
                <Plus />
                <span>Add Entity</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BusinessEntityListHeader;

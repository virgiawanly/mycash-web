import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export interface BusinessEntityListHeaderProps {
  onClickCreate?: () => void;
}

const BusinessEntityListHeader = (props: BusinessEntityListHeaderProps) => {
  const { onClickCreate } = props;

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div className="flex-1">
            <CardTitle>Business Entities</CardTitle>
          </div>
          <div className="flex items-center">
            <Button onClick={() => onClickCreate && onClickCreate()} size="sm">
              <Plus />
              <span>Add Entity</span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BusinessEntityListHeader;

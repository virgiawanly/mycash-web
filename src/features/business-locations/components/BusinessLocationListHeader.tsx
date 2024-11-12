import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export interface BusinessLocationListHeaderProps {
  onClickCreate?: () => void;
}

const BusinessLocationListHeader = (props: BusinessLocationListHeaderProps) => {
  const { onClickCreate } = props;

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div className="flex-1">
            <CardTitle>Business Locations</CardTitle>
          </div>
          <div className="flex items-center">
            <Button onClick={() => onClickCreate && onClickCreate()} size="sm">
              <Plus />
              <span>Add Location</span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BusinessLocationListHeader;

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form } from '@/components/ui/form';
import useMediaQuery from '@/hooks/use-media-query';
import httpClient from '@/lib/http';
import { FormattedApiError } from '@/types/errors';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import BusinessEntityForm from './BusinessEntityForm';
import { useBusinessEntityForm } from './form';

export interface CreateBusinessEntityDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateBusinessEntityDialog = (props: CreateBusinessEntityDialogProps) => {
  const { isOpen, setIsOpen } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const createBusinessEntityForm = useBusinessEntityForm();

  const handleSubmit = async (formData: any) => {
    await httpClient
      .post('/web-app/business-entities', formData)
      .then((res) => {
        toast.success(res.data.message);
        createBusinessEntityForm.reset();
        window.dispatchEvent(new CustomEvent('business-entity-created'));
        setIsOpen(false);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      });
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[576px]">
          <Form {...createBusinessEntityForm}>
            <form onSubmit={createBusinessEntityForm.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Business Entity</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <div className="pb-8 pt-4">
                <BusinessEntityForm form={createBusinessEntityForm} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={createBusinessEntityForm.handleSubmit(handleSubmit)} disabled={createBusinessEntityForm.formState.isSubmitting}>
                  {createBusinessEntityForm.formState.isSubmitting && <Loader2 className="animate-spin" />}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <Form {...createBusinessEntityForm}>
          <form onSubmit={createBusinessEntityForm.handleSubmit(handleSubmit)}>
            <DrawerHeader className="text-left">
              <DrawerTitle>Add Business Entity</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="px-4">
              <BusinessEntityForm form={createBusinessEntityForm} />
            </div>
            <DrawerFooter className="pt-8">
              <Button type="submit" variant="default">
                Save
              </Button>
              <DrawerClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateBusinessEntityDialog;

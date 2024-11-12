import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form } from '@/components/ui/form';
import useMediaQuery from '@/hooks/use-media-query';
import httpClient from '@/lib/http';
import { FormattedApiError } from '@/types/errors';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import BusinessLocationForm from './BusinessLocationForm';
import { useBusinessLocationForm } from './form';

export interface CreateBusinessLocationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateBusinessLocationDialog = (props: CreateBusinessLocationDialogProps) => {
  const { isOpen, setIsOpen } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const createBusinessLocationForm = useBusinessLocationForm();

  const handleSubmit = async (formData: any) => {
    await httpClient
      .post('/web-app/business-locations', formData)
      .then((res) => {
        toast.success(res.data.message);
        createBusinessLocationForm.reset();
        window.dispatchEvent(new CustomEvent('business-location-created'));
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
          <Form {...createBusinessLocationForm}>
            <form onSubmit={createBusinessLocationForm.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Business Location</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <div className="pb-8 pt-4">
                <BusinessLocationForm form={createBusinessLocationForm} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={createBusinessLocationForm.handleSubmit(handleSubmit)} disabled={createBusinessLocationForm.formState.isSubmitting}>
                  {createBusinessLocationForm.formState.isSubmitting && <Loader2 className="animate-spin" />}
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
        <Form {...createBusinessLocationForm}>
          <form onSubmit={createBusinessLocationForm.handleSubmit(handleSubmit)}>
            <DrawerHeader className="text-left">
              <DrawerTitle>Add Business Location</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="px-4">
              <BusinessLocationForm form={createBusinessLocationForm} />
            </div>
            <DrawerFooter className="pt-8">
              <Button type="submit" variant="default">
                Save
              </Button>
              <DrawerClose asChild>
                <Button type="button" variant="secondary">
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

export default CreateBusinessLocationDialog;

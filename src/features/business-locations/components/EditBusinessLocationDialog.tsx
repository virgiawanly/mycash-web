import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form } from '@/components/ui/form';
import useMediaQuery from '@/hooks/use-media-query';
import httpClient from '@/lib/http';
import { BusinessLocation } from '@/types/business-locations';
import { FormattedApiError } from '@/types/errors';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import BusinessLocationForm from './BusinessLocationForm';
import { useBusinessLocationForm } from './form';

export interface EditBusinessLocationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  businessLocation: BusinessLocation | null;
}

const EditBusinessLocationDialog = (props: EditBusinessLocationDialogProps) => {
  const { isOpen, setIsOpen, businessLocation } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const editBusinessLocationForm = useBusinessLocationForm();

  const handleSubmit = async (formData: any) => {
    if (!businessLocation) {
      return;
    }

    await httpClient
      .patch(`/web-app/business-locations/${businessLocation.id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        editBusinessLocationForm.reset();
        window.dispatchEvent(new CustomEvent('business-location-updated'));
        setIsOpen(false);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    editBusinessLocationForm.setValue('business_entity_id', businessLocation?.business_entity_id?.toString() ?? '');
    editBusinessLocationForm.setValue('code', businessLocation?.code ?? '');
    editBusinessLocationForm.setValue('name', businessLocation?.name ?? '');
  }, [businessLocation, editBusinessLocationForm]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[576px]">
          <Form {...editBusinessLocationForm}>
            <form onSubmit={editBusinessLocationForm.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>Edit Business Location</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <div className="pb-8 pt-4">
                <BusinessLocationForm form={editBusinessLocationForm} businessLocation={businessLocation} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={editBusinessLocationForm.handleSubmit(handleSubmit)} disabled={editBusinessLocationForm.formState.isSubmitting}>
                  {editBusinessLocationForm.formState.isSubmitting && <Loader2 className="animate-spin" />}
                  Submit
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
        <Form {...editBusinessLocationForm}>
          <form onSubmit={editBusinessLocationForm.handleSubmit(handleSubmit)}>
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit Business Location</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="px-4">
              <BusinessLocationForm form={editBusinessLocationForm} businessLocation={businessLocation} />
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

export default EditBusinessLocationDialog;

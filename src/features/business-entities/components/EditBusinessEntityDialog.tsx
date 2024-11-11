import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form } from '@/components/ui/form';
import useMediaQuery from '@/hooks/use-media-query';
import httpClient from '@/lib/http';
import { BusinessEntity } from '@/types/business-entities';
import { FormattedApiError } from '@/types/errors';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import BusinessEntityForm from './BusinessEntityForm';
import { useBusinessEntityForm } from './form';

export interface EditBusinessEntityDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  businessEntity: BusinessEntity | null;
}

const EditBusinessEntityDialog = (props: EditBusinessEntityDialogProps) => {
  const { isOpen, setIsOpen, businessEntity } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const editBusinessEntityForm = useBusinessEntityForm();

  const handleSubmit = async (formData: any) => {
    if (!businessEntity) {
      return;
    }

    await httpClient
      .patch(`/web-app/business-entities/${businessEntity.id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        editBusinessEntityForm.reset();
        window.dispatchEvent(new CustomEvent('business-entity-updated'));
        setIsOpen(false);
      })
      .catch((err: FormattedApiError) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    editBusinessEntityForm.setValue('code', businessEntity?.code ?? '');
    editBusinessEntityForm.setValue('name', businessEntity?.name ?? '');
  }, [businessEntity, editBusinessEntityForm]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[576px]">
          <Form {...editBusinessEntityForm}>
            <form onSubmit={editBusinessEntityForm.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>Edit Business Entity</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <div className="pb-8 pt-4">
                <BusinessEntityForm form={editBusinessEntityForm} />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={editBusinessEntityForm.handleSubmit(handleSubmit)} disabled={editBusinessEntityForm.formState.isSubmitting}>
                  {editBusinessEntityForm.formState.isSubmitting && <Loader2 className="animate-spin" />}
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
        <Form {...editBusinessEntityForm}>
          <form onSubmit={editBusinessEntityForm.handleSubmit(handleSubmit)}>
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit Business Entity</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <div className="px-4">
              <BusinessEntityForm form={editBusinessEntityForm} />
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

export default EditBusinessEntityDialog;

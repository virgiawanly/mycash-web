import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

export interface BusinessEntityFormProps {
  form: UseFormReturn<any>;
}

const BusinessEntityForm = (props: BusinessEntityFormProps) => {
  const { form } = props;

  return (
    <div className="grid gap-5">
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter entity code" {...field} disabled={form.formState.isSubmitting} onKeyDown={(e) => e.key === 'Enter'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter entity name" {...field} disabled={form.formState.isSubmitting} onKeyDown={(e) => e.key === 'Enter'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessEntityForm;

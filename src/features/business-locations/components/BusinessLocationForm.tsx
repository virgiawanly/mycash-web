import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import httpClient from '@/lib/http';
import { BusinessEntity } from '@/types/business-entities';
import { BusinessLocation } from '@/types/business-locations';
import { FormattedApiError } from '@/types/errors';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { toast } from 'sonner';

export interface BusinessLocationFormProps {
  form: UseFormReturn<any>;
  businessLocation?: BusinessLocation | null;
}

interface SelectOption {
  value: string | number;
  label: string;
}

interface Additional {
  page: number;
}

const fetchEntityOptions: LoadOptions<SelectOption, any, Additional> = async (inputValue = '', loadedOptions = [], additional = { page: 0 }) => {
  const results = await httpClient
    .get('web-app/business-entities', {
      params: { search: inputValue, size: 10, page: additional.page },
    })
    .then((res) => {
      const options = res.data.data.data.map((item: BusinessEntity) => ({
        value: item.id,
        label: item.option_label ?? item.name,
      }));

      return {
        options,
        hasMore: loadedOptions.length < res.data.data.total,
        additional: {
          page: (additional?.page ?? 0) + 1,
        },
      };
    })
    .catch((error) => {
      toast.error((error as FormattedApiError).message);
      return {
        options: [],
        hasMore: false,
      };
    });

  return results;
};

const BusinessLocationForm = (props: BusinessLocationFormProps) => {
  const { form, businessLocation } = props;

  const [defaultEntityOptions, setDefaultEntityOptions] = useState<SelectOption[]>([]);
  const [selectedEntityOption, setSelectedEntityOption] = useState<SelectOption | null>(null);

  const handleBusinessEntityChange = (selectedOption: SelectOption | null) => {
    form.setValue('business_entity_id', selectedOption?.value);
    form.trigger('business_entity_id');
    setSelectedEntityOption(selectedOption);
  };

  useEffect(() => {
    if (businessLocation) {
      setDefaultEntityOptions([{ value: businessLocation.business_entity_id, label: businessLocation.business_entity?.option_label ?? '' }]);
      setSelectedEntityOption({ value: businessLocation.business_entity_id, label: businessLocation.business_entity?.option_label ?? '' });
    } else {
      setDefaultEntityOptions([]);
      setSelectedEntityOption(null);
    }
  }, [businessLocation]);

  return (
    <div className="grid gap-5">
      <FormField
        control={form.control}
        name="business_entity_id"
        render={() => (
          <FormItem>
            <FormLabel>Business Entity</FormLabel>
            <FormControl>
              <AsyncPaginate
                value={selectedEntityOption}
                loadOptions={fetchEntityOptions}
                onChange={handleBusinessEntityChange}
                debounceTimeout={300}
                pageSize={10}
                additional={{ page: 1 }}
                defaultOptions={defaultEntityOptions}
                className="w-full text-sm text-black"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter location code" {...field} disabled={form.formState.isSubmitting} onKeyDown={(e) => e.key === 'Enter'} />
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
              <Input placeholder="Enter location name" {...field} disabled={form.formState.isSubmitting} onKeyDown={(e) => e.key === 'Enter'} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessLocationForm;

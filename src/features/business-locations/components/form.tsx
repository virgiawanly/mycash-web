import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const businessLocationFormSchema = z.object({
  business_entity_id: z.string({ coerce: true }).min(1, { message: 'Business Entity is required' }),
  code: z.string().min(1, { message: 'Code is required' }).max(100, { message: 'Code must be less than 100 characters' }),
  name: z.string().min(1, { message: 'Name is required' }).max(255, { message: 'Name must be less than 255 characters' }),
});

export const useBusinessLocationForm = () => {
  const form = useForm<z.infer<typeof businessLocationFormSchema>>({
    resolver: zodResolver(businessLocationFormSchema),
    defaultValues: {
      business_entity_id: '',
      code: '',
      name: '',
    },
  });

  return form;
};

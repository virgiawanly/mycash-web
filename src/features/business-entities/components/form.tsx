import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const businessEntityFormSchema = z.object({
  code: z.string().min(1, { message: 'Code is required' }).max(100, { message: 'Code must be less than 100 characters' }),
  name: z.string().min(1, { message: 'Name is required' }).max(255, { message: 'Name must be less than 255 characters' }),
});

export const useBusinessEntityForm = () => {
  const form = useForm<z.infer<typeof businessEntityFormSchema>>({
    resolver: zodResolver(businessEntityFormSchema),
    defaultValues: {
      code: '',
      name: '',
    },
  });

  return form;
};

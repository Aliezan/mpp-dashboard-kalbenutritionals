import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useStore from '@/store/store';

const SelectMonthViewModel = () => {
  const { setSelectedMonth, selectedMonth } = useStore();

  const Schema = z.object({
    month: z.string(),
  });
  type SchemaType = z.infer<typeof Schema>;

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      month: selectedMonth,
    },
  });

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { month } = data;
    setSelectedMonth(month);
  };

  return {
    form,
    onSubmit,
    selectedMonth,
  };
};

export default SelectMonthViewModel;

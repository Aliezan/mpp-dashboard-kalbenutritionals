import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useStore from '@/store/store';
import { trpc } from '@/app/_trpc/client';

const SelectCategoryViewModel = () => {
  const { selectedMonth, setSelectedCategory } = useStore();

  const { data: Categories } =
    trpc.adminRouter.getCurrentMonthCategory.useQuery(
      { month: selectedMonth },
      {
        enabled: !!selectedMonth,
      },
    );

  const Schema = z.object({
    category: z.string(),
  });

  type SchemaType = z.infer<typeof Schema>;

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      category: '',
    },
  });

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { category } = data;

    setSelectedCategory(category);
  };

  return {
    form,
    Categories,
    onSubmit,
  };
};

export default SelectCategoryViewModel;

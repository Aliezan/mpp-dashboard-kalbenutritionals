import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import { trpc } from '@/app/_trpc/client';
// import { useEffect } from 'react';
import useStore from '@/store/store';

const SelectMonthViewModel = () => {
  // const { MPPData, setMPPData, selectedMonth, setSelectedMonth } = useStore();

  const { setSelectedMonth } = useStore();

  const Schema = z.object({
    month: z.string(),
  });
  type SchemaType = z.infer<typeof Schema>;

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  });

  // const { data: MonthlyMPPQuery, isLoading } =
  //   trpc.adminRouter.getMonthlyMPP.useQuery(
  //     { month: selectedMonth },
  //     {
  //       enabled: !!selectedMonth,
  //     },
  //   );

  // useEffect(() => {
  //   if (MonthlyMPPQuery) {
  //     setMPPData(MonthlyMPPQuery);
  //   }
  // }, [MonthlyMPPQuery, setMPPData]);

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { month } = data;
    setSelectedMonth(month);
  };

  return {
    form,
    // MPPData,
    // isLoading,
    onSubmit,
    // selectedMonth,
  };
};

export default SelectMonthViewModel;

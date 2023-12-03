import useStore from '@/store/store';
import { trpc } from '@/app/_trpc/client';

const MPPSumAdminViewModel = () => {
  const { selectedCategory, selectedMonth } = useStore();

  const { data: TableData } = trpc.adminRouter.getTableDataByCategory.useQuery({
    month: selectedMonth,
    category: selectedCategory,
  });

  return {
    TableData,
  };
};

export default MPPSumAdminViewModel;

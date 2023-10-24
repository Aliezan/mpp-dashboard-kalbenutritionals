import useStore from '@/store/store';
import { trpc } from '@/app/_trpc/client';
import { useEffect } from 'react';

const ManageMPPViewModel = () => {
  const { MPPData, MPPGapData, selectedMonth, setMPPData, setMPPGapData } =
    useStore();

  const { data: MonthlyMPPQuery, isLoading: isLoadingMPPQuery } =
    trpc.adminRouter.getMonthlyMPP.useQuery(
      { month: selectedMonth },
      {
        enabled: !!selectedMonth,
      },
    );

  const { data: MonthlyMPPGapQuery, isLoading: isLoadingMPPGapQuery } =
    trpc.adminRouter.getMonthlyMPPGap.useQuery(
      { month: selectedMonth },
      {
        enabled: !!selectedMonth,
      },
    );

  useEffect(() => {
    if (MonthlyMPPQuery && MonthlyMPPGapQuery) {
      setMPPData(MonthlyMPPQuery);
      setMPPGapData(MonthlyMPPGapQuery);
    }
  }, [MonthlyMPPQuery, MonthlyMPPGapQuery, setMPPData, setMPPGapData]);

  return {
    MPPData,
    MPPGapData,
    isLoadingMPPQuery,
    isLoadingMPPGapQuery,
  };
};

export default ManageMPPViewModel;

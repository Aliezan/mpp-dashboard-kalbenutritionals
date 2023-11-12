import useStore from '@/store/store';
import { trpc } from '@/app/_trpc/client';
import { useEffect } from 'react';

const UserMPPViewModel = () => {
  const { MPPData, MPPGapData, selectedMonth, setMPPData, setMPPGapData } =
    useStore();

  const { data: UserMonthlyMPP, isLoading: isLoadingUserMonthlyMPP } =
    trpc.tableRouter.getMonthlyMPPUser.useQuery(
      { month: selectedMonth },
      {
        enabled: !!selectedMonth,
      },
    );

  const { data: UserMonthlyMPPGap, isLoading: isLoadingUserMonthlyMPPGap } =
    trpc.tableRouter.getMonthlyMPPGapUser.useQuery(
      { month: selectedMonth },
      {
        enabled: !!selectedMonth,
      },
    );

  useEffect(() => {
    if (UserMonthlyMPP && UserMonthlyMPPGap) {
      setMPPData(UserMonthlyMPP);
      setMPPGapData(UserMonthlyMPPGap);
    }
  }, [UserMonthlyMPP, UserMonthlyMPPGap, setMPPData, setMPPGapData]);

  return {
    MPPData,
    MPPGapData,
    isLoadingUserMonthlyMPP,
    isLoadingUserMonthlyMPPGap,
  };
};

export default UserMPPViewModel;

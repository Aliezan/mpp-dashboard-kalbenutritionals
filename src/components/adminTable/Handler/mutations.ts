/* eslint-disable no-confusing-arrow */
import { trpc } from '@/app/_trpc/client';
import useStore from '@/store/store';

const MutationsHandler = () => {
  const utils = trpc.useUtils();
  const { selectedMonth } = useStore();

  const editMPP = trpc.adminRouter.editMPP.useMutation({
    onMutate: async (input) => {
      await utils.adminRouter.getMonthlyMPP.cancel();

      const previousMPPs = utils.adminRouter.getMonthlyMPP.getData();
      const optimisticMPPs = previousMPPs?.map((mpp) =>
        mpp.id === input.id ? { ...mpp, ...input } : mpp,
      );

      utils.adminRouter.getMonthlyMPP.setData(
        { month: selectedMonth },
        optimisticMPPs,
      );

      return { previousMPPs };
    },
    onError: (err, _editedMPP, context) => {
      utils.adminRouter.getMonthlyMPP.setData(
        { month: selectedMonth },
        context?.previousMPPs,
      );
    },
    onSuccess: () => {
      utils.adminRouter.getMonthlyMPP.invalidate();
    },
    onSettled: () => {
      utils.adminRouter.getMonthlyMPP.invalidate();
    },
  });

  const addMPPGap = trpc.adminRouter.addMPPGap.useMutation({
    onMutate: async () => {
      await utils.adminRouter.getMonthlyMPPGap.cancel();

      return { previousMPPGaps: utils.adminRouter.getMonthlyMPPGap.getData() };
    },
    onError: (err, _newMPPGap, context) => {
      utils.adminRouter.getMonthlyMPPGap.setData(
        { month: selectedMonth },
        context?.previousMPPGaps,
      );
    },
    onSuccess: (newMPPGap) => {
      utils.adminRouter.getMonthlyMPPGap.setData(
        { month: selectedMonth },
        (oldData) => [...(oldData ?? []), newMPPGap],
      );
    },
    onSettled: () => {
      utils.adminRouter.getMonthlyMPPGap.invalidate({ month: selectedMonth });
    },
  });

  return {
    editMPP,
    addMPPGap,
  };
};

export default MutationsHandler;

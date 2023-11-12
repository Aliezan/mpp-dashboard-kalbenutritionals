/* eslint-disable no-confusing-arrow */
import { trpc } from '@/app/_trpc/client';
import useStore from '@/store/store';
import { Status } from '@prisma/client';

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

  const editMPPOrg = trpc.adminRouter.editMPPOrg.useMutation({
    onMutate: async (input: {
      id: string;
      Employee_ID: string;
      Employee_Name: string;
      Org_Group_Name: string;
      Join_Date: string;
      Job_Title_Name: string;
      Job_Level_Code: string;
      Category: string;
      Status: string;
    }) => {
      const previousMPPs = utils.adminRouter.getMonthlyMPP.getData();

      const optimisticMPPs = previousMPPs?.filter((mpp) => mpp.id !== input.id);

      utils.adminRouter.getMonthlyMPP.setData(
        { month: selectedMonth },
        optimisticMPPs,
      );

      return { previousMPPs };
    },
    onError: (err, _editedMPPOrg, context) => {
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

  const assignMPPGap = trpc.adminRouter.assignMPPGap.useMutation({
    onMutate: async (input) => {
      await utils.adminRouter.getMonthlyMPPGap.cancel();

      const previousMPPGaps = utils.adminRouter.getMonthlyMPPGap.getData();
      const optimisticMPPGaps = previousMPPGaps?.map((mppGap) =>
        mppGap.id === input.id ? { ...mppGap, ...input } : mppGap,
      );

      utils.adminRouter.getMonthlyMPPGap.setData(
        { month: selectedMonth },
        optimisticMPPGaps,
      );

      return { previousMPPGaps };
    },
    onError: (err, _editedMPPGap, context) => {
      utils.adminRouter.getMonthlyMPPGap.setData(
        { month: selectedMonth },
        context?.previousMPPGaps,
      );
    },
    onSuccess: () => {
      utils.adminRouter.getMonthlyMPPGap.invalidate();
    },
    onSettled: () => {
      utils.adminRouter.getMonthlyMPPGap.invalidate();
    },
  });

  const deleteMPPRow = trpc.adminRouter.deleteMPPRow.useMutation({
    onMutate: async (input) => {
      await utils.adminRouter.getMonthlyMPP.cancel();

      const previousMPPs = utils.adminRouter.getMonthlyMPP.getData();
      const optimisticMPPs = previousMPPs?.filter((mpp) => mpp.id !== input.id);

      utils.adminRouter.getMonthlyMPP.setData(
        { month: selectedMonth },
        optimisticMPPs,
      );

      return { previousMPPs };
    },
    onError: (err, _deletedMPP, context) => {
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

  const addMPPRow = trpc.adminRouter.addMPPRow.useMutation({
    onMutate: async (input) => {
      await utils.adminRouter.getMonthlyMPP.cancel();

      const previousMPPs = utils.adminRouter.getMonthlyMPP.getData() || [];
      const newMPP = {
        ...input,
        MPP: '1',
        Actual: '0',
        Gap: '1',
        id: Math.random().toString(),
        isApproved: Status.PENDING,
        createdAt: new Date().toISOString(),
      };

      utils.adminRouter.getMonthlyMPP.setData({ month: selectedMonth }, [
        ...previousMPPs,
        newMPP,
      ]);

      return { previousMPPs };
    },
    onError: (err, _newMPP, context) => {
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

  return {
    editMPP,
    editMPPOrg,
    addMPPGap,
    assignMPPGap,
    deleteMPPRow,
    addMPPRow,
  };
};

export default MutationsHandler;

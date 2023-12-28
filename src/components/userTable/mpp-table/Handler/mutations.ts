import { trpc } from '@/app/_trpc/client';
import { Status } from '@prisma/client';
import { toast } from 'sonner';
import useStore from '@/store/store';

const MutationsHandler = () => {
  const { tableRouter } = trpc;
  const utils = trpc.useUtils();
  const { selectedMonth } = useStore();

  const approveMPP = tableRouter.approveMPP.useMutation({
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.tableRouter.getMonthlyMPPUser.cancel();

      // Snapshot the previous value
      const previousData = utils.tableRouter.getMonthlyMPPUser.getData();

      // Optimistically update to the new value
      const newDataIds = new Set(newData.ids);
      const updatedData = (previousData ?? []).map((row) => {
        if (newDataIds.has(row.Employee_ID as string)) {
          return {
            ...row,
            isApproved: 'APPROVED' as Status,
          };
        }
        return row;
      });
      utils.tableRouter.getMonthlyMPPUser.setData(
        { month: selectedMonth },
        updatedData,
      );

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, _newData, context) => {
      // Rollback to the previous value if mutation fails
      utils.tableRouter.getMonthlyMPPUser.setData(
        { month: selectedMonth },
        context?.previousData,
      );
      toast.error('Gagal approve MPP');
    },
    onSuccess: () => {
      toast.success('Berhasil approve MPP');
    },
    onSettled: () => {
      utils.tableRouter.getMonthlyMPPUser.invalidate();
    },
  });

  const rejectMPP = tableRouter.rejectMPP.useMutation({
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.tableRouter.getMonthlyMPPUser.cancel();

      // Snapshot the previous value
      const previousData = utils.tableRouter.getMonthlyMPPUser.getData();

      // Optimistically update to the new value
      const newDataIds = new Set(newData.ids);
      const updatedData = (previousData ?? []).map((row) => {
        if (newDataIds.has(row.Employee_ID as string)) {
          return {
            ...row,
            isApproved: 'REJECTED' as Status,
          };
        }
        return row;
      });
      utils.tableRouter.getMonthlyMPPUser.setData(
        { month: selectedMonth },
        updatedData,
      );

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, _newData, context) => {
      // Rollback to the previous value if mutation fails
      utils.tableRouter.getMonthlyMPPUser.setData(
        { month: selectedMonth },
        context?.previousData,
      );
      toast.error('Gagal me-reject MPP');
    },
    onSuccess: () => {
      toast.success('Berhasil reject MPP');
    },
    onSettled: () => {
      utils.tableRouter.getMonthlyMPPUser.invalidate();
    },
  });

  return {
    approveMPP,
    rejectMPP,
  };
};

export default MutationsHandler;

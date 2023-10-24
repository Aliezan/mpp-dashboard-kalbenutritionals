import { trpc } from '@/app/_trpc/client';
import { Status } from '@prisma/client';
import { toast } from 'sonner';

const MutationsHandler = () => {
  const { tableRouter, useContext } = trpc;
  const utils = useContext();

  const approveMPP = tableRouter.approveMPP.useMutation({
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.tableRouter.getMPP.cancel();

      // Snapshot the previous value
      const previousData = utils.tableRouter.getMPP.getData();

      // Optimistically update to the new value
      const newDataIds = new Set(newData.ids);
      const updatedData = (previousData ?? []).map((row) => {
        if (newDataIds.has(row.Employee_ID)) {
          return {
            ...row,
            isApproved: 'APPROVED' as Status,
          };
        }
        return row;
      });
      utils.tableRouter.getMPP.setData(undefined, updatedData);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, _newData, context) => {
      // Rollback to the previous value if mutation fails
      utils.tableRouter.getMPP.setData(undefined, context?.previousData);
      toast.error('Gagal approve MPP');
    },
    onSuccess: () => {
      toast.success('Berhasil approve MPP');
    },
    onSettled: () => {
      utils.tableRouter.getMPP.invalidate();
    },
  });

  const rejectMPP = tableRouter.rejectMPP.useMutation({
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.tableRouter.getMPP.cancel();

      // Snapshot the previous value
      const previousData = utils.tableRouter.getMPP.getData();

      // Optimistically update to the new value
      const newDataIds = new Set(newData.ids);
      const updatedData = (previousData ?? []).map((row) => {
        if (newDataIds.has(row.Employee_ID)) {
          return {
            ...row,
            isApproved: 'REJECTED' as Status,
          };
        }
        return row;
      });
      utils.tableRouter.getMPP.setData(undefined, updatedData);

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, _newData, context) => {
      // Rollback to the previous value if mutation fails
      utils.tableRouter.getMPP.setData(undefined, context?.previousData);
      toast.error('Gagal me-reject MPP');
    },
    onSuccess: () => {
      toast.success('Berhasil reject MPP');
    },
    onSettled: () => {
      utils.tableRouter.getMPP.invalidate();
    },
  });

  return {
    approveMPP,
    rejectMPP,
  };
};

export default MutationsHandler;

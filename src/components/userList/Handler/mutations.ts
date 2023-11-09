/* eslint-disable no-confusing-arrow */
import { trpc } from '@/app/_trpc/client';
import { Role } from '@prisma/client';

type UserLite = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  Org_Group_Name: string | null;
};
const MutationsHandler = () => {
  const utils = trpc.useUtils();

  const addUser = trpc.adminRouter.addUser.useMutation({
    onMutate: async () => {
      await utils.adminRouter.getUsers.cancel();

      return { previousUsers: utils.adminRouter.getUsers.getData() };
    },
    onError: (err, _newUser, context) => {
      utils.adminRouter.getUsers.setData(undefined, context?.previousUsers);
    },
    onSuccess: (newUser) => {
      utils.adminRouter.getUsers.setData(
        undefined,
        (oldData: UserLite[] | undefined) =>
          [...(oldData ?? []), newUser] as UserLite[],
      );
    },
    onSettled: () => {
      utils.adminRouter.getUsers.invalidate();
    },
  });

  const deleteUser = trpc.adminRouter.deleteUser.useMutation({
    onMutate: async ({ email }) => {
      await utils.adminRouter.getUsers.cancel();

      const previousUsers = utils.adminRouter.getUsers.getData();
      const optimisticUsers = previousUsers?.filter(
        (user) => user.email !== email,
      );

      utils.adminRouter.getUsers.setData(undefined, optimisticUsers);

      return { previousUsers };
    },
    onError: (err, _deletedUserId, context) => {
      utils.adminRouter.getUsers.setData(undefined, context?.previousUsers);
    },
    onSuccess: () => {
      utils.adminRouter.getUsers.invalidate();
    },
    onSettled: () => {
      utils.adminRouter.getUsers.invalidate();
    },
  });

  const editUser = trpc.adminRouter.editUser.useMutation({
    onMutate: async (input) => {
      await utils.adminRouter.getUsers.cancel();

      const previousUsers = utils.adminRouter.getUsers.getData();
      const optimisticUsers = previousUsers?.map((user) =>
        user.email === input.email ? { ...user, ...input } : user,
      );

      utils.adminRouter.getUsers.setData(undefined, optimisticUsers);

      return { previousUsers };
    },
    onError: (err, _editedUser, context) => {
      utils.adminRouter.getUsers.setData(undefined, context?.previousUsers);
    },
    onSuccess: () => {
      utils.adminRouter.getUsers.invalidate();
    },
    onSettled: () => {
      utils.adminRouter.getUsers.invalidate();
    },
  });

  return { addUser, deleteUser, editUser };
};

export default MutationsHandler;

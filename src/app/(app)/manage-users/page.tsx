import UsersList from '@/components/userList/UsersList';
import React, { FC } from 'react';
import UserModal from '@/components/admin/UserModal';
import DeleteUserModal from '@/components/admin/DeleteUserModal';

const ManageUsers: FC = () => (
  <section className='mt-[40px]'>
    <UserModal />
    <DeleteUserModal />
    <div className='container px-20 mx-auto'>
      <h1 className='font-bold text-[30px]'>Manage Users</h1>
      <UsersList />
    </div>
  </section>
);

export default ManageUsers;

import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import MutationsHandler from '@/components/userList/Handler/mutations';
import { useEffect } from 'react';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt-ts';
import { trpc } from '@/app/_trpc/client';

const UserModalViewModel = () => {
  const userSchema = z.object({
    name: z.string().min(3, 'Masukkan nama dengan benar'),
    email: z.string().email('Masukkan email dengan benar'),
    password: z.string().min(4, 'Masukkan password dengan benar'),
    role: z.enum(['USER', 'ADMIN', 'SUPER']),
    OrgGroupName: z.string().min(3, 'Masukkan nama Organisasi dengan benar'),
  });

  type UserSchemaType = z.infer<typeof userSchema>;

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'USER',
      OrgGroupName: '',
      password: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const { addUser, editUser } = MutationsHandler();

  const router = useRouter();

  const searchParams = useSearchParams();
  const formMode = searchParams.get('formMode');

  const userID = searchParams.get('id') || '';

  const onSubmit: SubmitHandler<UserSchemaType> = async (data) => {
    const { name, email, role, OrgGroupName, password } = data;
    const hashedPassword = await hash(password, 12);

    if (formMode === 'add') {
      addUser.mutate(
        {
          name,
          email,
          role,
          OrgGroupName,
          password: hashedPassword,
        },
        {
          onSuccess: () => {
            router.push('/manage-users');
            toast.success('User berhasil ditambahkan');
          },
          onError: () => {
            router.push('/manage-users');
            toast.error('Gagal menambahkan user. Coba lagi');
          },
        },
      );
    }

    if (formMode === 'edit') {
      editUser.mutate(
        { id: userID, name, email, role, OrgGroupName, password },
        {
          onSuccess: () => {
            router.push('/manage-users');
            toast.success('User berhasil diubah');
          },
          onError: () => {
            router.push('/manage-users');
            toast.error('Gagal mengubah user. Coba lagi');
          },
        },
      );
    }
  };

  useEffect(() => {
    if (formMode === 'edit') {
      const email = searchParams.get('email') || '';
      const name = searchParams.get('name') || '';
      const role = searchParams.get('role') as Role;
      const OrgGroupName = searchParams.get('OrgGroupName') || '';

      form.setValue('name', name, {
        shouldValidate: true,
      });
      form.setValue('email', email, {
        shouldValidate: true,
      });
      form.setValue('role', role as Role, {
        shouldValidate: true,
      });
      form.setValue('OrgGroupName', OrgGroupName, {
        shouldValidate: true,
      });
    } else {
      form.reset();
    }
  }, [formMode, searchParams, form]);

  const { data: MPPOrganisations } = trpc.adminRouter.getOrgMPP.useQuery();

  return {
    form,
    onSubmit,
    errors,
    formMode,
    MPPOrganisations,
  };
};

export default UserModalViewModel;

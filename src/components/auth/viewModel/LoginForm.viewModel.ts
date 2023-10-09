import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginFormViewModel = () => {
  const LoginSchema = z.object({
    email: z.string().email('Masukkan email dengan benar'),
    password: z.string().min(3, 'Masukkan password dengan benar'),
  });

  type LoginSchemaType = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const { email, password } = data;
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        toast.error('Email atau password anda salah');
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default LoginFormViewModel;

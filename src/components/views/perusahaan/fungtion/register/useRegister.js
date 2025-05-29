import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const registerSchema = yup.object().shape({
  name: yup.string().required('masukkan nama anda'),
  email: yup.string().email('masukkan format email yang benar').required('masukkan email anda'),
  password: yup.string().required('masukkan password anda'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password not match')
    .required('masukkan kembali password'),
});

const useRegisterSupervisor = () => {
  const router = useRouter();
  const [visiblePass, setvisiblePass] = useState();
  const {data: session} = useSession()

  const handleVisiblePass = () => {
    setvisiblePass(!visiblePass);
  };
  const [visibleConfirm, setvisiblecConfirm] = useState();
  const handleVisibleConfirm = () => {
    setvisiblecConfirm(!visibleConfirm);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const registerService = async ({
    name,
    email,
    password,
    confirmPassword,
  }) => {
    const perusahaan = session?.user.name
    const role = 'supervisor';
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        role,
        perusahaan,
        password,
        confirmPassword,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result.user;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: registerService,
    onError(error) {
      toast.error(error.message)
    },
    onSuccess: () => {
      reset();
      toast.success('Berhasil mendaftarkan Supervisor');
    },
  });

  const handleRegister = ({
    name,
    email,
    password,
    confirmPassword,
  }) => mutate({ name, email, password, confirmPassword });

  return {
    handleRegister,
    isPending,
    visibleConfirm,
    visiblePass,
    handleVisibleConfirm,
    handleVisiblePass,
    handleSubmit,
    control,
    errors
  };
};

export default useRegisterSupervisor;

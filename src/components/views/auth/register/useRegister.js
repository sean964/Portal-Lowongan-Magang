import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NEXT_PUBLIC_API_URL } from '../../../../../environment/env';
import { useMutation } from '@tanstack/react-query';

const registerSchema = yup.object().shape({
  name: yup.string().required('masukkan nama perusahaan anda'),
  email: yup.string().email().required('masukkan email perusahaan anda'),
  adress: yup.string().required('masukkan alamat perusahaan anda'),
  password: yup.string().required('masukkan password anda'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password not match')
    .required('masukkan kembali password'),
});

const useRegister = () => {
  const router = useRouter();

  const [visiblePass, setvisiblePass] = useState();

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
    adress,
    password,
    confirmPassword,
  }) => {
    const role = 'perusahaan';

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        role,
        adress,
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
      setError('root', { message: error.message });
    },
    onSuccess: () => {
      router.push('/auth/login');
      reset();
    },
  });

  const handleRegister = ({ name, email, adress, password, confirmPassword }) =>
    mutate({ name, adress, email, password, confirmPassword });

  return {
    handleRegister,
    isPending,
    visibleConfirm,
    visiblePass,
    handleVisibleConfirm,
    handleVisiblePass,
    handleSubmit,
    control,
    errors,
  };
};

export default useRegister;

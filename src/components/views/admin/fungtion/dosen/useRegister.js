import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const registerSchema = yup.object().shape({
  name: yup.string().required('masukkan nama dosen'),
  nip: yup.number().required('masukkan nip dosen'),
  email: yup.string().email().required('masukkan email dosen'),
  adress: yup.string().required('masukkan alamat dosen'),
  password: yup.string().required('masukkan password dosen'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password not match')
    .required('masukkan kembali password'),
});

const useRegisterDosen = () => {

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
    reset
  } = useForm({ resolver: yupResolver(registerSchema) });

  const registerService = async ({
    name,
    nip,
    adress,
    password,
    confirmPassword,
    email,
  }) => {
    const role = 'dosen';

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        nip,
        adress,
        role,
        email,
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
      toast.success('berhasil mendaftarkan dosen')
      reset();
    },
  });

  const handleRegister = ({
    name,
    nip,
    adress,
    email,
    password,
    confirmPassword,
  }) => mutate({ name, nip, adress, email, password, confirmPassword });

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

export default useRegisterDosen;

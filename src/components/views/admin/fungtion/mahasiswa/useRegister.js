import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { NEXT_PUBLIC_API_URL } from '../../../../../../environment/env';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const registerSchema = yup.object().shape({
  name: yup.string().required('masukkan nama perusahaan anda'),
  nim: yup.number().required('masukkan no.perusahaan anda'),
  password: yup.string().required('masukkan password anda'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password not match')
    .required('masukkan kembali password'),
  email: yup.string().email().required('masukkan email perusahaan anda'),
  birth: yup.date().required('masukkan tanggal lahir anda'),
  gender: yup.string().required('masukkan jenis kelamin anda'),
  jurusan: yup.string().required('pilh jurusan mahasiswa'),
  adress: yup.string().required('masukkan alamat mahasiswa')
});

const useRegisterMahasiswa = () => {
  const gender = [{ label: 'pria' }, { label: 'wanita' }];

  const jurusan = [
    { label: 'Teknik Sipil' },
    { label: 'Teknologi Pangan' },
    { label: 'Teknik Metalurgi' },
    { label: 'Teknik Sistem Energi' },
    { label: 'Teknik Arsitektur' },
    { label: 'Matematika' },
    { label: 'Sistem Informasi' },
    { label: 'Sains Akurturia' },
    { label: 'Sains Data' },
    { label: 'Ilmu komputer' },
    { label: 'bioteknologi' },
  ];

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
    nim,
    password,
    confirmPassword,
    email,
    adress,
    birth,
    gender,
    jurusan,
  }) => {
    const role = 'mahasiswa';
    const birthFormatted = birth.toISOString().split('T')[0];
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        nim,
        role,
        email,
        birthFormatted,
        gender,
        adress,
        jurusan,
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
      toast.success('Berhasil mendaftarkan mahasiswa')
      reset();
    },
  });

  const handleRegister = ({
    name,
    nim,
    password,
    confirmPassword,
    email,
    adress,
    birth,
    gender,
    jurusan,
  }) =>
    mutate({
      name,
      nim,
      password,
      confirmPassword,
      email,
      adress,
      birth,
      gender,
      jurusan,
    });

  return {
    handleRegister,
    isPending,
    visibleConfirm,
    visiblePass,
    handleVisibleConfirm,
    handleVisiblePass,
    handleSubmit,
    control,
    gender,
    jurusan,
    errors,
  };
};

export default useRegisterMahasiswa;

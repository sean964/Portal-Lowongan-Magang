import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';

const loginSchema = yup.object().shape({
  email: yup.string().email().required('masukkan email anda'),
  password: yup.string().required('masukkan password anda'),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState();

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const callbackUrl = router.query.callbackUrl || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const loginServices = async ({ email, password }) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error && result.status === 401) {
      throw new Error(result.error);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginServices,
    onError(error) {
      setError('root', { message: error.message });
    },
    onSuccess: () => {
      router.push(callbackUrl);
    },
  });

  const handleLogin = ({ email, password }) => mutate({ email, password });

  return {
    isVisible,
    toggle,
    control,
    handleSubmit,
    handleLogin,
    isPending,
    errors,
  };
};

export default useLogin;

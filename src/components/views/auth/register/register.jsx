import { Controller } from 'react-hook-form';
import useRegister from './useRegister';
import { Button, Card, CardBody, Input, Spinner } from '@heroui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Link from 'next/link';
import { cn } from '../../../../../utils/cn';
import Image from 'next/image';

const Register = () => {
  const {
    handleRegister,
    isPending,
    visibleConfirm,
    visiblePass,
    handleVisibleConfirm,
    handleVisiblePass,
    handleSubmit,
    control,
    errors,
  } = useRegister();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div>
        <Card className="m-10">
          <CardBody className="flex w-full flex-col items-center justify-center px-10 py-8">
            <Image
              className="mb-2"
              src="/logo/logoIth.png"
              width={30}
              height={30}
              alt=""
            />
            <h2 className="text-2xl font-bold text-primary-500">
              Register Perusahaan
            </h2>
            <p className={cn('mb-2', errors?.root?.message ? 'mb-0' : 'mb-2')}>
              sudah punya akun?&nbsp;
              <Link
                className="font-semibold text-primary-400"
                href="/auth/login"
              >
                Login disini
              </Link>
            </p>
            {errors.root && (
              <p className="mb-2 font-medium text-danger">
                {errors?.root?.message}
              </p>
            )}
            <form
              onSubmit={handleSubmit(handleRegister)}
              className={cn(
                'flex flex-col',
                Object.keys(errors).length > 0 ? 'gap-2' : 'gap-4'
              )}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="nama perusahaan"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    label="email"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="adress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="alamat perusahaan"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.adress !== undefined}
                    errorMessage={errors.adress?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visiblePass ? 'text' : 'password'}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePass('password')}
                      >
                        {visiblePass ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={visibleConfirm ? 'text' : 'password'}
                    label="Confirm Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisibleConfirm('password')}
                      >
                        {visibleConfirm ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    }
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button color="primary" size="lg" type="submit">
                {isPending ? <Spinner color="white" size="sm" /> : 'Register'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;

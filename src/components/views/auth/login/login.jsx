import { Button, Card, CardBody, Input, Spinner } from '@heroui/react';
import Link from 'next/link';
import useLogin from './useLogin';
import { Controller } from 'react-hook-form';
import { cn } from '../../../../../utils/cn';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Image from 'next/image';

const Login = () => {
  const {
    isVisible,
    isPending,
    control,
    errors,
    handleLogin,
    handleSubmit,
    toggle,
  } = useLogin();

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
            <h2 className="text-2xl font-bold text-primary-500">Login</h2>
            <p>
              Belum punya akun perusahaan?&nbsp;
              <Link
                className="font-semibold text-primary-400"
                href="/auth/register"
              >
                Register disini
              </Link>
            </p>

            {errors.root && (
              <p className="mb-2 font-medium text-primary">
                {errors?.root?.message}
              </p>
            )}

            <form
              className={cn(
                'flex flex-col',
                Object.keys(errors).length > 0 ? 'gap-2' : 'gap-4'
              )}
              onSubmit={handleSubmit(handleLogin)}
            >
              {/* basic penggunaan react-hook-form untuk mengatur control*/}
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
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={isVisible ? 'text' : 'password'}
                    label="Password"
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggle}
                      >
                        {isVisible ? (
                          <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                      </button>
                    }
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Button color="primary" size="lg" type="submit">
                {isPending ? <Spinner color="white" size="sm" /> : 'Login'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;

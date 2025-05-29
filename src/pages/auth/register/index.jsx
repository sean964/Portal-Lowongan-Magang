import AuthLayout from '@/components/layouts/authLayout';
import Register from '@/components/views/auth/register/register';

const RegisterPage = () => {
  return (
    <AuthLayout title="Magang | Register Perusahaan">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;

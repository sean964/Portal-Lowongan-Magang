import AuthLayout from '@/components/layouts/authLayout';
import Login from '@/components/views/auth/login/login';
import { encrypt } from '../../../../utils/encrypt';

const LoginPage = () => {
  return (
    <AuthLayout title={'Login Akun'}>
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;

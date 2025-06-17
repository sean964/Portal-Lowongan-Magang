import BackButton from '@/components/commons/backButton';
import AuthLayout from '@/components/layouts/authLayout';
import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import RegisterMahasiswa from '@/components/views/admin/fungtion/mahasiswa/register';

const RegisterMahasiswaPage = () => {
  return (
    <DashboardLayout title="Magang | Register Mahasiswa" type={'admin'}>
      <AuthLayout title="Magang | Register Mahasiswa" />
      <RegisterMahasiswa />
    </DashboardLayout>

  );
};
export default RegisterMahasiswaPage;

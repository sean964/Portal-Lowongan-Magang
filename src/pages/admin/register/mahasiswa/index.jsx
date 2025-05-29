import BackButton from '@/components/commons/backButton';
import AuthLayout from '@/components/layouts/authLayout';
import RegisterMahasiswa from '@/components/views/admin/fungtion/mahasiswa/register';

const RegisterMahasiswaPage = () => {
  return (
    <div>
      <AuthLayout title="Magang | Register Mahasiswa" />
      <BackButton />
      <RegisterMahasiswa />
    </div>
  );
};
export default RegisterMahasiswaPage;

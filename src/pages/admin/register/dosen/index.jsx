import BackButton from '@/components/commons/backButton';
import PageHaead from '@/components/commons/pageHead';
import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import RegisterDosen from '@/components/views/admin/fungtion/dosen/register';

const RegisterDosenPage = () => {
  return (
      <DashboardLayout title={'Admin | Register Dosen'} type={'admin'}>
      <PageHaead title={'Admin | Register Dosen'} />
      <RegisterDosen />
        </DashboardLayout>
  );
};
export default RegisterDosenPage;

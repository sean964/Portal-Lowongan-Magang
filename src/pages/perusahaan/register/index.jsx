import BackButton from '@/components/commons/backButton';
import PageHaead from '@/components/commons/pageHead';
import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import RegisterSupervisor from '@/components/views/perusahaan/fungtion/register/register';

const registerSupervisorPage = () => {
  return (
    <DashboardLayout title={'register | Supervisor'} type={'perusahaan'}>
      <PageHaead title={'register | Supervisor'} />
      <RegisterSupervisor />
    </DashboardLayout>
  );
};


export default registerSupervisorPage;

import BackButton from '@/components/commons/backButton';
import PageHaead from '@/components/commons/pageHead';
import RegisterSupervisor from '@/components/views/perusahaan/fungtion/register/register';

const registerSupervisorPage = () => {
  return (
    <>
      <PageHaead title={'register | Supervisor'} />
      <BackButton />
      <RegisterSupervisor />
    </>
  );
};


export default registerSupervisorPage;

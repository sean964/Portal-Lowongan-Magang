import BackButton from '@/components/commons/backButton';
import PageHaead from '@/components/commons/pageHead';
import RegisterDosen from '@/components/views/admin/fungtion/dosen/register';

const RegisterDosenPage = () => {
  return (
    <div>
        <PageHaead title={'Admin | Register Dosen'} />
        <BackButton role={'admin'} />
        <RegisterDosen />
    </div>
  );
};
export default RegisterDosenPage;

import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import DosenPerusahaan from '@/components/views/mahasiswa/dashboard/dosenPerusahaan';
import MahasiswaDashboard from '@/components/views/mahasiswa/dashboard/mahasiswaDashboard';

const DashboardMahasiswaPage = () => {
  return (
    <DashboardLayout 
    title={'Mahasiswa | Dashboard'} 
    type={'mahasiswa'} >
      <MahasiswaDashboard/>
    </DashboardLayout>
  );
};

export default DashboardMahasiswaPage;

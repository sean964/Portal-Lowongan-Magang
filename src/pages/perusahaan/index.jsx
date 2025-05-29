import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import PerusahaanDashboard from '@/components/views/perusahaan/dashboard/perusahaanDashboard';

const PerusahaanDashboardPage = () => {
      
  return (
    <>
      <DashboardLayout 
      title={'Perusahaan | Dashboard'} 
      type={'perusahaan'} >
        <PerusahaanDashboard />
      </DashboardLayout>
    </>
  );
};


export default PerusahaanDashboardPage;

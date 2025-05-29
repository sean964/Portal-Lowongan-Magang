import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import AdminDashboard from '@/components/views/admin/dashboard/adminDashboard';

const AdminDashboardPage = () => {
  return (
    <>
      <DashboardLayout
        title={'Admin | Dashboard'}
        type={'admin'}
      >
        <AdminDashboard/>
      </DashboardLayout>
    </>
  );
};

export default AdminDashboardPage;

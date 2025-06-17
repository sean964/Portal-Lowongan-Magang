import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import SupervisorDashboard from '@/components/views/supervisor/dashboard/supervisorDashboard';
import Magang from '@/components/views/supervisor/fungtion/magang';

const SupervisorDashboardPage = ({user}) => {
  return (
      <DashboardLayout 
      title={'Supervisor | Dashboard'} 
      type={'supervisor'} >
        <SupervisorDashboard />
        <Magang/>
      </DashboardLayout>
  );
};

export default SupervisorDashboardPage;

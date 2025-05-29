import DashboardLayout from '@/components/layouts/dashboardLayout/dashboardLayout';
import DosenDashboard from '@/components/views/dosen/dashboard/dosenDashboard';
import { getSession } from 'next-auth/react';
import { NEXT_PUBLIC_API_URL } from '../../../environment/env';

const DashboardDosenPage = () => {
  return (
    <DashboardLayout 
    title={'Dosen | Dashboard'} 
    type={'dosen'} >
      <DosenDashboard />
    </DashboardLayout>
  );
};


export default DashboardDosenPage;

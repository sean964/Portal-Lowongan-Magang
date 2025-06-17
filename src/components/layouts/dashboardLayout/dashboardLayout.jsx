import { useState } from 'react';
import DashboardLayoutSidebar from './dashboardLayoutSidebar';
import {
  DOSEN_SIDEBAR,
  MAHASISWA_SIDEBAR,
  PERUSAHAAN_SIDEBAR,
  SUPERVISOR_SIDEBAR,
  ADMIN_SIDEBAR,
} from './dashboardLayout.constants';
import PageHaead from '@/components/commons/pageHead';
import { Navbar, NavbarMenuToggle } from '@heroui/react';

const DashboardLayout = ({ title, type, children }) => {
  const [open, setOpen] = useState(false);
   return (
      <div>
        <PageHaead title={title} />
        <div key={''} className="max-w-screen-3xl 3xl:container flex">
          {type === 'perusahaan' ? <DashboardLayoutSidebar
            sidebarItems={PERUSAHAAN_SIDEBAR}
            isOpen={open}
          /> : null}
          {type === 'supervisor' ? <DashboardLayoutSidebar
            sidebarItems={SUPERVISOR_SIDEBAR}
            isOpen={open}
          /> : null}
          {type === 'mahasiswa' ? <DashboardLayoutSidebar
            sidebarItems={MAHASISWA_SIDEBAR}
            isOpen={open}
          /> : null}
          {type === 'dosen' ? <DashboardLayoutSidebar
            sidebarItems={DOSEN_SIDEBAR}
            isOpen={open}
          /> : null}
          {type === 'admin' ? <DashboardLayoutSidebar
            sidebarItems={ADMIN_SIDEBAR}
            isOpen={open}
          /> : null}

          <div className="lg:w-[65.5rem] lg:absolute lg:left-[300px] w-full">
            <Navbar
              className="flex justify-between bg-transparent w-full border-b-2 border-b-black px-8 py-2"
              isBlurred={false}
              position="static"
              classNames={{ wrapper: 'p-0' }}
            >
              <h1 className="text-3xl font-bold">{title}</h1>
              <NavbarMenuToggle
                aria-label={open ? 'close menu' : 'open menu'}
                onClick={() => setOpen(!open)}
                className="lg:hidden"
              />
            </Navbar>
            <div className='w-full h-[34.9rem] overflow-y-auto p-8 dashBg lg:bg-[30rem]'>
            {children}
            </div>
          </div>
        </div>
      </div>
    );
};
export default DashboardLayout;

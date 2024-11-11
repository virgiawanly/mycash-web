import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import ApplicationLayoutNavbar from './ApplicationLayoutNavbar';
import { ApplicationLayoutSidebar } from './ApplicationLayoutSidebar';
import { Toaster } from '@/components/ui/sonner';

export default function ApplicationLayout() {
  return (
    <>
      <SidebarProvider>
        <ApplicationLayoutSidebar />
        <SidebarInset>
          <ApplicationLayoutNavbar />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors position="top-right" />
    </>
  );
}

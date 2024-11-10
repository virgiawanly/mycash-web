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
          <div className="bg-gray-50 dark:bg-background min-h-screen w-full">
            <div className="w-full max-w-screen-2xl mx-auto p-5">
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
}

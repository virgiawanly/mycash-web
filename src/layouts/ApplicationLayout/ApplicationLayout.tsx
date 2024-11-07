import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import ApplicationLayoutNavbar from "./ApplicationLayoutNavbar";
import { ApplicationLayoutSidebar } from "./ApplicationLayoutSidebar";

export default function ApplicationLayout() {
  return (
    <SidebarProvider>
      <ApplicationLayoutSidebar />
      <SidebarInset>
        <ApplicationLayoutNavbar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

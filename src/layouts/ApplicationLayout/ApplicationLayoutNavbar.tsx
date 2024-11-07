import ToggleThemeDropdown from "@/components/app/dropdowns/ToggleThemeDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LucideLogOut, LucideSettings, LucideUser } from "lucide-react";

const ApplicationLayoutNavbar = () => {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between border-b px-4">
      <div className="flex w-fit items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Input className="w-72 max-w-full" placeholder="Search..." />
      </div>
      <div className="flex w-fit items-center gap-3">
        {/* Language Dropdown */}

        {/* Theme Dropdown */}
        <ToggleThemeDropdown />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LucideUser className="size-4" absoluteStrokeWidth />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LucideSettings className="size-4" absoluteStrokeWidth />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LucideLogOut className="size-4" absoluteStrokeWidth />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ApplicationLayoutNavbar;

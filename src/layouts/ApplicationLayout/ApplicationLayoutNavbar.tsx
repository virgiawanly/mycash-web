import ToggleThemeDropdown from '@/components/shared/dropdowns/ToggleThemeDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LucideLogOut, LucideSettings, LucideUser, Search, ShoppingBag, ShoppingCart } from 'lucide-react';

const ApplicationLayoutNavbar = () => {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between border-b px-4">
      <div className="flex w-fit items-center gap-2">
        <SidebarTrigger className="-ml-1" size="sm" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-3">
          <Button className="lg:w-28 max-w-full max-xs:hidden" size="sm" variant="outline">
            <ShoppingCart absoluteStrokeWidth />
            <span className="max-lg:hidden">Sell</span>
          </Button>
          <Button className="lg:w-28 max-w-full max-xs:hidden" size="sm" variant="outline">
            <ShoppingBag absoluteStrokeWidth />
            <span className="max-lg:hidden">Purchase</span>
          </Button>
          <Button className="lg:w-72 md:w-48 max-w-full justify-start max-xs:hidden" size="sm" variant="outline">
            <Search absoluteStrokeWidth />
            <div className="max-md:hidden flex flex-1 items-center">
              <span className="flex-1 text-left">Search...</span>
              <span className="size-4">⌘K</span>
            </div>
          </Button>
        </div>
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

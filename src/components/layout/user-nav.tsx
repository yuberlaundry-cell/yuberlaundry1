
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { getRedirectPathForRole } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HardHat, User, Briefcase } from "lucide-react";


export function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const dashboardPath = getRedirectPathForRole(user.role);
  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} data-ai-hint="profile person" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
            {user.companyName && <p className="text-xs leading-none text-muted-foreground">{user.companyName}</p>}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={dashboardPath}>Dashboard</Link>
          </DropdownMenuItem>
           { user.role === 'consumer' &&
             <DropdownMenuItem asChild>
                <Link href="/app/account">Account Settings</Link>
             </DropdownMenuItem>
           }
           { (user.role === 'business_admin' || user.role === 'business_employee') &&
             <DropdownMenuItem asChild>
                <Link href="/business/settings">Settings</Link>
             </DropdownMenuItem>
           }
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
         <DropdownMenuSub>
            <DropdownMenuSubTrigger>Switch Role</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                 <DropdownMenuItem>
                    <User className="mr-2"/>
                    <span>Customer</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <HardHat className="mr-2"/>
                    <span>Driver</span>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Edit } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const allPermissions = {
  'Platform': [
    'access_superadmin_portal',
    'manage_all_users',
    'manage_roles_permissions',
    'impersonate_users',
    'view_global_dashboard',
    'manage_platform_settings',
    'manage_integrations',
    'manage_feature_flags',
    'view_system_health',
  ],
  'Content Management': [
    'manage_marketing_content',
    'manage_faq',
    'manage_legal_pages',
  ],
  'Consumer': [
    'access_consumer_portal',
    'book_manage_own_orders',
    'view_own_order_history',
    'manage_own_payment_methods',
    'manage_own_subscriptions',
  ],
  'Business': [
    'access_business_portal',
    'manage_company_employees',
    'view_company_orders',
    'view_company_reports',
    'manage_company_billing',
    'set_employee_allowances',
  ],
  'Driver': [
    'access_driver_portal',
    'view_accept_jobs',
    'update_job_status',
    'view_own_earnings',
  ],
  'Laundromat': [
    'access_laundromat_portal',
    'manage_facility_orders',
    'manage_facility_resources',
    'view_facility_financials',
  ],
};


const rolesAndPermissions = [
  {
    role: 'Superadmin',
    description: 'Has unrestricted access to all platform features and settings.',
    permissions: [
      'access_superadmin_portal',
      'manage_all_users',
      'manage_roles_permissions',
      'impersonate_users',
    ],
  },
  {
    role: 'Consumer',
    description: 'A standard customer user.',
    permissions: [
      'access_consumer_portal',
      'book_manage_own_orders',
      'view_own_order_history',
      'manage_own_payment_methods',
    ],
  },
  {
    role: 'Driver',
    description: 'A courier responsible for pickups and deliveries.',
    permissions: [
      'access_driver_portal',
      'view_accept_jobs',
      'update_job_status',
      'view_own_earnings',
    ],
  },
  {
    role: 'Laundromat Staff',
    description: 'Staff at a partner laundry facility.',
    permissions: [
      'access_laundromat_portal',
      'manage_facility_orders',
      'manage_facility_resources',
    ],
  },
  {
    role: 'Business Admin',
    description: 'Manages a company account.',
    permissions: [
      'access_business_portal',
      'manage_company_employees',
      'view_company_orders',
      'view_company_reports',
      'manage_company_billing',
    ],
  },
  {
    role: 'Business Employee',
    description: 'An employee under a company account.',
    permissions: [
      'access_business_portal',
      'book_manage_own_orders',
      'view_own_order_history',
    ],
  },
];

const formatPermission = (p: string) => p.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Roles & Permissions</h1>
        <p className="text-muted-foreground">
          Define and manage what each user type can see and do on the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rolesAndPermissions.map((role) => (
          <Card key={role.role} className="flex flex-col">
            <CardHeader>
              <CardTitle>{role.role}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {role.permissions.map((permission) => (
                  <li key={permission} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{formatPermission(permission)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
             <div className="p-6 pt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Edit className="mr-2 h-4 w-4" /> Manage Permissions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Manage Permissions for {role.role}</DialogTitle>
                      <DialogDescription>
                        Select the permissions this role should have access to.
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-6 max-h-[60vh] overflow-y-auto pr-6">
                      {Object.entries(allPermissions).map(([category, perms]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-lg mb-2">{category}</h3>
                            <div className="space-y-3">
                              {perms.map(p => (
                                <div key={p} className="flex items-center space-x-2">
                                  <Checkbox id={`${role.role}-${p}`} defaultChecked={role.permissions.includes(p)} />
                                  <Label htmlFor={`${role.role}-${p}`} className="font-normal">{formatPermission(p)}</Label>
                                </div>
                              ))}
                            </div>
                            <Separator className="mt-4" />
                        </div>
                      ))}
                    </form>
                     <DialogFooter>
                        <Button type="submit">Save Permissions</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

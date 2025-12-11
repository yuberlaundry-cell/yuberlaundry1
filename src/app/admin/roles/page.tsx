
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Edit } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import React, { useState, useEffect } from 'react';

const allPermissions = {
  'Platform': [
    { id: 'access_superadmin_portal', label: 'Access Superadmin Portal' },
    { id: 'view_global_dashboard', label: 'View Global Dashboard' },
    { id: 'manage_all_users', label: 'Manage All Users (Invite, Suspend)' },
    { id: 'manage_roles_permissions', label: 'Manage Roles & Permissions' },
    { id: 'impersonate_users', label: 'Impersonate Users' },
    { id: 'manage_platform_settings', label: 'Manage Platform Settings' },
    { id: 'manage_integrations', label: 'Manage Integrations (Paystack, Google Maps)' },
    { id: 'manage_feature_flags', label: 'Manage Feature Flags' },
    { id: 'view_system_health', label: 'View System Health & API Status' },
    { id: 'view_all_orders', label: 'View All Platform Orders' },
    { id: 'manage_all_laundromats', label: 'Manage All Laundromats' },
    { id: 'manage_all_drivers', label: 'Manage All Drivers' },
  ],
  'Content Management': [
    { id: 'manage_marketing_content', label: 'Manage Marketing Content (Homepage)' },
    { id: 'manage_faq', label: 'Manage FAQ Page' },
    { id: 'manage_legal_pages', label: 'Manage Legal Pages (Privacy, T&Cs)' },
  ],
  'Consumer': [
    { id: 'access_consumer_portal', label: 'Access Consumer Portal' },
    { id: 'book_manage_own_orders', label: 'Book & Manage Own Orders' },
    { id: 'view_own_order_history', label: 'View Own Order History' },
    { id: 'manage_own_payment_methods', label: 'Manage Own Payment Methods' },
    { id: 'manage_own_subscriptions', label: 'Manage Own Subscriptions' },
    { id: 'use_referral_system', label: 'Use Referral System' },
  ],
  'Business': [
    { id: 'access_business_portal', label: 'Access Business Portal' },
    { id: 'manage_company_employees', label: 'Manage Company Employees' },
    { id: 'view_company_orders', label: 'View All Company Orders' },
    { id: 'view_company_reports', label: 'View Company-wide Reports' },
    { id: 'manage_company_billing', label: 'Manage Company Billing & Invoices' },
    { id: 'set_employee_allowances', label: 'Set Employee Spending Allowances' },
  ],
  'Driver': [
    { id: 'access_driver_portal', label: 'Access Driver Portal' },
    { id: 'view_accept_jobs', label: 'View & Accept Available Jobs' },
    { id: 'update_job_status', label: 'Update Job Status (Arrived, Collected, Delivered)' },
    { id: 'view_own_earnings', label: 'View Own Earnings & Payouts' },
    { id: 'chat_with_support', label: 'Chat with Support' },
  ],
  'Laundromat': [
    { id: 'access_laundromat_portal', label: 'Access Laundromat Portal' },
    { id: 'manage_facility_orders', label: 'Manage Facility Orders (Intake, Processing)' },
    { id: 'manage_facility_resources', label: 'Manage Facility Resources (Staff, Machines)' },
    { id: 'view_facility_financials', label: 'View Facility Financials & Payouts' },
    { id: 'manage_facility_settings', label: 'Manage Facility Settings' },
  ],
};


const rolesAndPermissions = [
  {
    role: 'Superadmin',
    description: 'Has unrestricted access to all platform features and settings.',
    permissions: [
      'access_superadmin_portal',
      'view_global_dashboard',
      'manage_all_users',
      'manage_roles_permissions',
      'impersonate_users',
      'manage_platform_settings',
      'manage_integrations',
      'manage_feature_flags',
      'view_system_health',
      'view_all_orders',
      'manage_all_laundromats',
      'manage_all_drivers',
      'manage_marketing_content',
      'manage_faq',
      'manage_legal_pages'
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
      'manage_own_subscriptions',
      'use_referral_system',
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
      'chat_with_support',
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
    role: 'Laundromat Supervisor',
    description: 'A manager at a partner laundry facility with extended permissions.',
    permissions: [
      'access_laundromat_portal',
      'manage_facility_orders',
      'manage_facility_resources',
      'view_facility_financials',
      'manage_facility_settings',
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
      'set_employee_allowances',
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
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Manage Permissions for {role.role}</DialogTitle>
                      <DialogDescription>
                        Select the permissions this role should have access to.
                      </DialogDescription>
                    </DialogHeader>
                    <PermissionForm initialPermissions={role.permissions} />
                     <DialogFooter>
                        <Button type="submit" form="permission-form">Save Permissions</Button>
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

function PermissionForm({ initialPermissions }: { initialPermissions: string[] }) {
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() => {
        const state: Record<string, boolean> = {};
        for (const category of Object.values(allPermissions)) {
            for (const perm of category) {
                state[perm.id] = initialPermissions.includes(perm.id);
            }
        }
        return state;
    });

    const handleCategoryCheck = (categoryKey: keyof typeof allPermissions, isChecked: boolean) => {
        const categoryPerms = allPermissions[categoryKey].map(p => p.id);
        const newState = { ...checkedState };
        categoryPerms.forEach(permId => {
            newState[permId] = isChecked;
        });
        setCheckedState(newState);
    };

    return (
        <form id="permission-form" className="space-y-6 max-h-[60vh] overflow-y-auto pr-6">
            {Object.entries(allPermissions).map(([category, perms]) => {
                const categoryPermIds = perms.map(p => p.id);
                const isAllChecked = categoryPermIds.every(id => checkedState[id]);
                const isIndeterminate = categoryPermIds.some(id => checkedState[id]) && !isAllChecked;

                return (
                    <div key={category}>
                        <div className="flex items-center gap-3 bg-muted -ml-6 -mr-6 px-6 py-2 sticky top-0">
                            <Checkbox 
                                id={`category-${category}`}
                                onCheckedChange={(checked) => handleCategoryCheck(category as keyof typeof allPermissions, checked as boolean)}
                                checked={isAllChecked}
                                // The native checkbox doesn't have a visual indeterminate state in shadcn by default,
                                // but the logic is here if we were to customize it.
                            />
                            <Label htmlFor={`category-${category}`} className="font-semibold text-lg">{category}</Label>
                        </div>
                        <div className="space-y-3 mt-4">
                            {perms.map(p => (
                                <div key={p.id} className="flex items-center space-x-2 ml-2">
                                    <Checkbox 
                                        id={p.id}
                                        checked={checkedState[p.id] || false}
                                        onCheckedChange={(checked) => {
                                            setCheckedState(prev => ({ ...prev, [p.id]: checked }));
                                        }}
                                    />
                                    <Label htmlFor={p.id} className="font-normal">{p.label}</Label>
                                </div>
                            ))}
                        </div>
                        <Separator className="mt-6" />
                    </div>
                );
            })}
        </form>
    );
}


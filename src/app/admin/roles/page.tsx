
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const rolesAndPermissions = [
  {
    role: 'Superadmin',
    description: 'Has unrestricted access to all platform features and settings.',
    permissions: [
      'Manage all platform users and roles',
      'Configure global settings and integrations',
      'View all financial data and reports',
      'Impersonate any user',
    ],
  },
  {
    role: 'Consumer',
    description: 'A standard customer user.',
    permissions: [
      'Book and manage their own laundry orders',
      'View own order history',
      'Manage own payment methods and subscriptions',
    ],
  },
  {
    role: 'Driver',
    description: 'A courier responsible for pickups and deliveries.',
    permissions: [
      'View and accept available jobs',
      'Update job status (e.g., picked up, delivered)',
      'View own earnings and payout history',
    ],
  },
  {
    role: 'Laundromat Staff',
    description: 'Staff at a partner laundry facility.',
    permissions: [
      'Manage orders assigned to their facility',
      'Update order status through the cleaning lifecycle',
      'View facility-specific financials',
      'Manage facility resources (staff, machines)',
    ],
  },
  {
    role: 'Business Admin',
    description: 'Manages a company account.',
    permissions: [
      'Add and manage company employees',
      'View all company orders and reports',
      'Manage company billing and payment methods',
      'Set spending allowances for employees',
    ],
  },
  {
    role: 'Business Employee',
    description: 'An employee under a company account.',
    permissions: [
      'Place orders using the company allowance',
      'View their own order history',
      'View personal spending reports',
    ],
  },
];

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
                    <span className="text-muted-foreground">{permission}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
             <div className="p-6 pt-0">
                <Button variant="outline" className="w-full">Manage Permissions</Button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

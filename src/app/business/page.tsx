
'use client';

import { useAuth } from '@/hooks/use-auth';
import { AdminDashboard } from '@/components/business/admin-dashboard';
import { EmployeeDashboard } from '@/components/business/employee-dashboard';

export default function BusinessDashboardPage() {
    const { user } = useAuth();
    
    if (user?.role === 'business_admin') {
        return <AdminDashboard />;
    }
    
    if (user?.role === 'business_employee') {
        return <EmployeeDashboard />;
    }

    return null;
}

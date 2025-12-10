
'use client';

import { useAuth } from '@/hooks/use-auth';
import { AdminReports } from '@/components/business/reports/admin-reports';
import { EmployeeReports } from '@/components/business/reports/employee-reports';

export default function ReportsPage() {
    const { user } = useAuth();
    
    if (user?.role === 'business_admin') {
        return <AdminReports />;
    }
    
    if (user?.role === 'business_employee') {
        return <EmployeeReports />;
    }

    return null;
}


'use client';

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const employees = [
    { name: 'Emily Brown', spend: '£512.40', orders: 12, avatar: 'https://picsum.photos/seed/emp1/40/40' },
    { name: 'Michael Smith', spend: '£480.10', orders: 10, avatar: 'https://picsum.photos/seed/emp2/40/40' },
    { name: 'Jessica Davis', spend: '£450.90', orders: 11, avatar: 'https://picsum.photos/seed/emp3/40/40' },
];

export function EmployeeUsageWidget() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Employees by Usage</CardTitle>
                <CardDescription>This month's highest spending employees.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {employees.map((employee) => (
                    <div key={employee.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="profile person" />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{employee.name}</p>
                                <p className="text-xs text-muted-foreground">{employee.orders} orders</p>
                            </div>
                        </div>
                        <p className="font-medium text-sm">{employee.spend}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

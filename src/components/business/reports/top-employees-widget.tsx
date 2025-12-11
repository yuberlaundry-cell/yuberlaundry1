
'use client';

import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { mockBusinessEmployees } from "@/lib/mock-data";

export function TopEmployeesWidget() {
    const employees = mockBusinessEmployees.slice(0, 5).sort((a,b) => b.totalSpend - a.totalSpend);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Employees by Usage</CardTitle>
                <CardDescription>This month's highest spending employees.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Orders</TableHead>
                            <TableHead className="text-right">Spend</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                             <TableRow key={employee.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{employee.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{employee.totalOrders}</TableCell>
                                <TableCell className="text-right font-semibold">R{employee.totalSpend.toFixed(2)}</TableCell>
                             </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

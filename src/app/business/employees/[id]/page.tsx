
'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockBusinessEmployees } from "@/lib/mock-data";
import { ArrowLeft, Edit, Trash2, ShieldOff, BarChart2, DollarSign, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const statusStyles: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
};

const orderStatusColors: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'In progress': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
};

export default function EmployeeDetailsPage() {
    const params = useParams();
    const employeeId = params.id as string;
    const employee = mockBusinessEmployees.find(e => e.id === employeeId);

    if (!employee) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold">Employee not found</h2>
                <Button variant="link" asChild><Link href="/business/employees">Return to list</Link></Button>
            </div>
        );
    }

    const allowanceUsed = employee.allowance.monthly - employee.allowance.remaining;
    const allowanceProgress = (allowanceUsed / employee.allowance.monthly) * 100;

    const kpiCards = [
        { title: "Total Orders", value: employee.totalOrders, icon: ShoppingCart },
        { title: "Total Spend", value: `$${employee.totalSpend.toFixed(2)}`, icon: DollarSign },
        { title: "Avg. Turnaround", value: `${employee.avgTurnaround} hours`, icon: BarChart2 }
    ]

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/business/employees">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all employees
                    </Link>
                </Button>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                             <h1 className="text-3xl font-bold font-headline">{employee.name}</h1>
                             <Badge variant="secondary" className={statusStyles[employee.status]}>{employee.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{employee.email}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild><Link href={`/business/employees/${employee.id}/edit`}><Edit className="mr-2 h-4 w-4" /> Edit</Link></Button>
                    <Button variant="outline"><ShieldOff className="mr-2 h-4 w-4" /> Deactivate</Button>
                    <Button variant="destructive" className="hidden sm:flex"><Trash2 className="mr-2 h-4 w-4" /> Remove</Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Profile Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Role</span> <span className="font-medium">{employee.role}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Department</span> <span className="font-medium">{employee.department}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Join Date</span> <span className="font-medium">{employee.joinDate}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Mobile</span> <span className="font-medium">{employee.mobile}</span></div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary"/> Allowance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <p className="font-medium">Monthly Allowance</p>
                                    <p><span className="font-bold">${employee.allowance.remaining.toFixed(2)}</span> remaining</p>
                                </div>
                                <Progress value={allowanceProgress} />
                                <p className="text-xs text-muted-foreground mt-1">Used ${allowanceUsed.toFixed(2)} of ${employee.allowance.monthly.toFixed(2)}</p>
                            </div>
                            <Separator/>
                            <div className="flex justify-between items-center text-sm">
                                <p className="font-medium">Per-Order Limit</p>
                                <p className="font-bold">${employee.allowance.perOrder.toFixed(2)}</p>
                            </div>
                            <Button variant="outline" className="w-full">Edit Allowance</Button>
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2 space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {kpiCards.map(card => (
                            <Card key={card.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className="h-4 w-4 text-muted-foreground"/>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{card.value}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                             <Button variant="link" size="sm" asChild>
                                <Link href="#">View all</Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Cost</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employee.recentOrders.map(order => (
                                         <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell><Badge variant="secondary" className={orderStatusColors[order.status]}>{order.status}</Badge></TableCell>
                                            <TableCell className="text-right">${order.cost.toFixed(2)}</TableCell>
                                         </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}

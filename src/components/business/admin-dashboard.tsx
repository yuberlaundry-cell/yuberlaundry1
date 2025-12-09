'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, AlertCircle, FilePlus, UserPlus, FileText, Settings } from "lucide-react";
import { SpendChart } from "./spend-chart";
import { RecentOrdersTable } from "./recent-orders-table";
import { EmployeeUsageWidget } from "./employee-usage-widget";
import { Button } from "../ui/button";

const kpiCards = [
    { title: "Total Spend (Month)", value: "$4,250", change: "+12%", icon: DollarSign },
    { title: "Total Orders (Month)", value: "128", change: "+8%", icon: ShoppingCart },
    { title: "Active Employees", value: "42", change: "-2", icon: Users },
    { title: "Overdue Invoices", value: "3", change: "+1", icon: AlertCircle, color: "text-destructive" },
];

export function AdminDashboard() {
    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Business Dashboard</h1>
                <p className="text-muted-foreground">Track company laundry usage, spending, and activity.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpiCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className={`text-xs text-muted-foreground ${card.color || ''}`}>
                                {card.change} vs last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Spend Over Time</CardTitle>
                            <CardDescription>Company-wide spending for the last 6 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SpendChart />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <EmployeeUsageWidget />
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <Button variant="outline"><UserPlus className="mr-2"/> Add Employee</Button>
                            <Button variant="outline"><FilePlus className="mr-2"/> New Order</Button>
                            <Button variant="outline"><FileText className="mr-2"/> Get Invoice</Button>
                            <Button variant="outline"><Settings className="mr-2"/> Manage Billing</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <RecentOrdersTable />

        </div>
    );
}

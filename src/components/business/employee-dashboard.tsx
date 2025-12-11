
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, CircleHelp, PlusCircle } from "lucide-react";
import { RecentOrdersTable } from "./recent-orders-table";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { mockBusinessEmployees } from "@/lib/mock-data";


export function EmployeeDashboard() {
    const { user } = useAuth();
    const employeeData = mockBusinessEmployees.find(e => e.id === user?.id) || mockBusinessEmployees[0];

    const kpiCards = [
        { title: "Your Orders (Month)", value: "4", icon: ShoppingCart },
        { title: "Your Spend (Month)", value: `R${(employeeData.allowance.monthly - employeeData.allowance.remaining).toFixed(2)}`, icon: DollarSign },
    ];


    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Your Dashboard</h1>
                    <p className="text-muted-foreground">Track your personal laundry usage and order history.</p>
                </div>
                <Button asChild>
                    <Link href="/business/orders/new">
                        <PlusCircle className="mr-2" /> New Order
                    </Link>
                </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {kpiCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Allowance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R{employeeData.allowance.remaining.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">remaining</span></div>
                        <p className="text-xs text-muted-foreground">of R{employeeData.allowance.monthly.toFixed(2)}</p>
                        <Progress value={(employeeData.allowance.remaining / employeeData.allowance.monthly)*100} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            <RecentOrdersTable />

             <Card className="bg-muted/50 border-dashed">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-2">
                        <div className="bg-background rounded-full p-3 border">
                            <CircleHelp className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle>Questions?</CardTitle>
                    <CardDescription>
                        Have questions about the laundry benefit? Contact your HR department.
                    </CardDescription>
                </CardHeader>
            </Card>

        </div>
    );
}

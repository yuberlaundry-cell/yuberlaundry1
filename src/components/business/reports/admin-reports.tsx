
'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockBusinessEmployees } from "@/lib/mock-data";
import { AlertCircle, BarChart, CalendarIcon, ChevronDown, DollarSign, Download, RefreshCw, ShoppingCart, User, Users } from "lucide-react";
import { DetailedOrdersTable } from "./detailed-orders-table";
import { SpendOverTimeChart } from "./spend-over-time-chart";
import { ServiceTypeChart } from "./service-type-chart";
import { TopEmployeesWidget } from "./top-employees-widget";

const kpiCards = [
    { title: "Total Spend", value: "$1,250.75", change: "+5.2%", icon: DollarSign },
    { title: "Total Orders", value: "38", change: "+10", icon: ShoppingCart },
    { title: "Active Employees", value: "8", change: "+1", icon: Users },
    { title: "Avg. Order Cost", value: "$32.91", change: "-2.1%", icon: BarChart },
];

export function AdminReports() {
    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Reports & Analytics</h1>
                <p className="text-muted-foreground">View company-wide laundry usage, spend, and performance.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Last 30 days
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="range" />
                    </PopoverContent>
                </Popover>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                        Employee: All <ChevronDown className="ml-auto h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>All</DropdownMenuItem>
                        {mockBusinessEmployees.map(e => <DropdownMenuItem key={e.id}>{e.name}</DropdownMenuItem>)}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex gap-2">
                    <Button className="w-full sm:w-auto">Apply</Button>
                    <Button variant="ghost" className="w-full sm:w-auto"><RefreshCw className="mr-2" /> Reset</Button>
                </div>
                <div className="md:ml-auto flex items-center gap-2">
                     <Button variant="outline" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" /> Export All Data
                    </Button>
                </div>
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
                            <p className="text-xs text-muted-foreground">{card.change} vs previous period</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

             <div className="grid lg:grid-cols-5 gap-8 items-start">
                <div className="lg:col-span-3">
                    <SpendOverTimeChart />
                </div>
                <div className="lg:col-span-2">
                    <ServiceTypeChart />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <TopEmployeesWidget />
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-primary" />
                            Insights & Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                            💡 <span className="font-semibold">Insight:</span> Your company's laundry usage increased 18% this month.
                         </div>
                         <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                           ⚠️ <span className="font-semibold">Alert:</span> 3 employees exceeded their allowance in November.
                         </div>
                    </CardContent>
                </Card>
            </div>

            <DetailedOrdersTable />
        </div>
    );
}

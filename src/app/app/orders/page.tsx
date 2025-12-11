
'use client';

import { OrderList } from "@/components/orders/order-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Search, ChevronDown } from "lucide-react";

export default function OrdersPage() {

    const upcomingOrders = mockOrders.filter(o => o.statusCategory === 'upcoming');
    const inProgressOrders = mockOrders.filter(o => o.statusCategory === 'in-progress');
    const completedOrders = mockOrders.filter(o => o.statusCategory === 'completed');
    const cancelledOrders = mockOrders.filter(o => o.statusCategory === 'cancelled');

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Orders</h1>
                <p className="text-muted-foreground">View and manage all your past and current laundry orders.</p>
            </div>

             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="all">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                            <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-auto w-full md:w-auto">
                                <TabsTrigger value="all">All ({mockOrders.length})</TabsTrigger>
                                <TabsTrigger value="in-progress">Active ({inProgressOrders.length})</TabsTrigger>
                                <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
                                <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
                            </TabsList>
                            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
                                 <div className="relative flex-1 md:grow-0">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                    type="search"
                                    placeholder="Search by Order ID..."
                                    className="w-full rounded-lg bg-background pl-8"
                                    />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full sm:w-auto justify-between">
                                        Date Range <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                                        <DropdownMenuItem>Last 3 months</DropdownMenuItem>
                                        <DropdownMenuItem>Last year</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full sm:w-auto justify-between">
                                        Service <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>All</DropdownMenuItem>
                                        <DropdownMenuItem>Wash & Fold</DropdownMenuItem>
                                        <DropdownMenuItem>Dry Cleaning</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <OrderList orders={mockOrders} />
                        </TabsContent>
                        <TabsContent value="in-progress">
                            <OrderList orders={inProgressOrders} />
                        </TabsContent>
                        <TabsContent value="completed">
                            <OrderList orders={completedOrders} />
                        </TabsContent>
                        <TabsContent value="cancelled">
                            <OrderList orders={cancelledOrders} />
                        </TabsContent>
                    </Tabs>
                </div>
                 <div className="lg:sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle>Order Statistics</CardTitle>
                            <CardDescription>A summary of your laundry journey with us.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-around text-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">Lifetime Orders</p>
                                    <p className="text-2xl font-bold">48</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Spent</p>
                                    <p className="text-2xl font-bold">R12,450.50</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-center mb-4">Environmental Impact</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="text-muted-foreground">Water Saved</p>
                                        <p className="font-bold text-green-600">6,200 gal</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="text-muted-foreground">CO2 Offset</p>
                                        <p className="font-bold text-green-600">1,240 kg</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full">View detailed stats</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

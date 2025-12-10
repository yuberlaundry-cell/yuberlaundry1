
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockBusinessEmployees, mockBusinessOrders } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, ChevronDown, Download, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

const statusColors: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'In progress': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Scheduled': 'bg-blue-100 text-blue-800',
};

export default function BusinessOrdersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const isAdmin = user?.role === 'business_admin';
    const orders = isAdmin ? mockBusinessOrders : mockBusinessOrders.filter(o => o.employee.id === user?.id);

    if (orders.length === 0 && !isAdmin) {
         return (
            <div className="text-center py-16 border-2 border-dashed rounded-lg mt-4">
                <div className="flex justify-center mb-4">
                    <div className="bg-secondary rounded-full p-4">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold">You have no orders yet</h3>
                <p className="text-muted-foreground mb-4">When you place an order, it will appear here.</p>
            </div>
        );
    }
    
    if (orders.length === 0 && isAdmin) {
         return (
             <div className="text-center py-16 border-2 border-dashed rounded-lg mt-4">
                <div className="flex justify-center mb-4">
                    <div className="bg-secondary rounded-full p-4">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold">No company orders yet</h3>
                <p className="text-muted-foreground mb-4">Get started by creating the first order for an employee.</p>
                <Button asChild>
                    <Link href="/business/orders/new">Create Order</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Orders</h1>
                        <p className="text-muted-foreground">
                            {isAdmin ? 'Track laundry orders across your company.' : 'Track your personal laundry orders.'}
                        </p>
                    </div>
                    {isAdmin && (
                        <div className="flex gap-2">
                             <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" /> Export CSV
                            </Button>
                            <Button asChild>
                                <Link href="/business/orders/new">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Create Order
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                         <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by order ID, employee..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                            />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                    Status: All <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>All</DropdownMenuItem>
                                    <DropdownMenuItem>Scheduled</DropdownMenuItem>
                                    <DropdownMenuItem>In progress</DropdownMenuItem>
                                    <DropdownMenuItem>Completed</DropdownMenuItem>
                                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Date: All time <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="range" />
                                </PopoverContent>
                            </Popover>
                            {isAdmin && (
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full sm:w-auto">
                                        Employee: All <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>All</DropdownMenuItem>
                                        {mockBusinessEmployees.map(e => <DropdownMenuItem key={e.id}>{e.name}</DropdownMenuItem>)}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                {isAdmin && <TableHead>Employee</TableHead>}
                                <TableHead>Status</TableHead>
                                <TableHead>Pickup</TableHead>
                                <TableHead>Delivery</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/business/orders/${order.id.replace("#","")}`)}>
                                    <TableCell>
                                        <div className="font-medium">{order.id}</div>
                                        <div className="text-sm text-muted-foreground">{order.service}</div>
                                    </TableCell>
                                    {isAdmin && (
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{order.employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{order.employee.name}</span>
                                            </div>
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Badge variant="secondary" className={statusColors[order.status]}>{order.status}</Badge>
                                    </TableCell>
                                    <TableCell>{order.pickup}</TableCell>
                                    <TableCell>{order.delivery}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="font-medium">${order.cost.toFixed(2)}</div>
                                        {isAdmin && order.employeeShare > 0 && (
                                            <div className="text-xs text-muted-foreground">
                                                ${order.employeeShare.toFixed(2)} by employee
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { mockBusinessOrders } from "@/lib/mock-data";

const statusColors: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'In progress': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Scheduled': 'bg-blue-100 text-blue-800',
};

export function RecentOrdersTable() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'business_admin';
    const orders = isAdmin ? mockBusinessOrders.slice(0, 5) : mockBusinessOrders.filter(o => o.employee.name.includes(user?.firstName || 'Emily')).slice(0,5);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/business/orders">View all orders</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            {isAdmin && <TableHead>Employee</TableHead>}
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Pickup</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead className="text-right">Cost</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/business/orders/${order.id.replace('#', '')}`} className="hover:underline">{order.id}</Link>
                                </TableCell>
                                {isAdmin && <TableCell>{order.employee.name}</TableCell>}
                                <TableCell>{order.service}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={statusColors[order.status]}>{order.status}</Badge>
                                </TableCell>
                                <TableCell>{order.pickup}</TableCell>
                                <TableCell>{order.delivery}</TableCell>
                                <TableCell className="text-right">${order.cost.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

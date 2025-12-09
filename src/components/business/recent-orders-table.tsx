'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

const orders = [
    { id: '#C-54321', employee: 'Emily Brown', service: 'Wash & Fold', status: 'Delivered', pickup: 'Dec 1, 2024', delivery: 'Dec 3, 2024', cost: '$45.50' },
    { id: '#C-54320', employee: 'John Smith', service: 'Dry Cleaning', status: 'In progress', pickup: 'Dec 2, 2024', delivery: 'Dec 4, 2024', cost: '$62.00' },
    { id: '#C-54319', employee: 'Jessica Davis', service: 'Wash & Fold', status: 'Delivered', pickup: 'Nov 28, 2024', delivery: 'Nov 30, 2024', cost: '$38.75' },
    { id: '#C-54318', employee: 'Michael Smith', service: 'Wash & Fold', status: 'Cancelled', pickup: 'Nov 27, 2024', delivery: 'Nov 29, 2024', cost: '$0.00' },
    { id: '#C-54317', employee: 'Emily Brown', service: 'Ironing', status: 'Delivered', pickup: 'Nov 25, 2024', delivery: 'Nov 26, 2024', cost: '$25.00' },
];

const statusColors: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'In progress': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
};

export function RecentOrdersTable() {
    const { user } = useAuth();
    const isAdmin = user?.role === 'business_admin';
    const displayedOrders = isAdmin ? orders : orders.filter(o => o.employee.includes(user?.firstName || ''));

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm">View all orders</Button>
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
                        {displayedOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                {isAdmin && <TableCell>{order.employee}</TableCell>}
                                <TableCell>{order.service}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={statusColors[order.status]}>{order.status}</Badge>
                                </TableCell>
                                <TableCell>{order.pickup}</TableCell>
                                <TableCell>{order.delivery}</TableCell>
                                <TableCell className="text-right">{order.cost}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

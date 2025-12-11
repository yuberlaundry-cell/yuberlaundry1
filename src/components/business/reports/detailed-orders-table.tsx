
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import Link from "next/link";
import { mockBusinessOrders } from "@/lib/mock-data";
import { Download, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";

const statusColors: { [key: string]: string } = {
    'Delivered': 'bg-green-100 text-green-800',
    'In progress': 'bg-amber-100 text-amber-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Scheduled': 'bg-blue-100 text-blue-800',
};

export function DetailedOrdersTable() {
    const orders = mockBusinessOrders;
    const router = useRouter();

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                 <div>
                    <CardTitle>Detailed Orders</CardTitle>
                    <p className="text-sm text-muted-foreground">A full log of all orders within the selected date range.</p>
                </div>
                 <div className="flex w-full md:w-auto items-center gap-2">
                    <div className="relative flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="Search orders..."
                        className="w-full rounded-lg bg-background pl-8"
                        />
                    </div>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Pickup</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead className="text-right">Cost</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/business/orders/${order.id.replace('#', '')}`)}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.employee.name}</TableCell>
                                <TableCell>{order.service}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={statusColors[order.status]}>{order.status}</Badge>
                                </TableCell>
                                <TableCell>{order.pickup}</TableCell>
                                <TableCell>{order.delivery}</TableCell>
                                <TableCell className="text-right">
                                    <div className="font-semibold">R{order.cost.toFixed(2)}</div>
                                    <div className="text-xs text-muted-foreground">Co: R{order.companyShare.toFixed(2)}</div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

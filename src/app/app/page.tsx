
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, FileText, ShoppingCart, Tag, Wallet } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { mockOrders } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const statusColors: { [key: string]: string } = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
};

export default function ConsumerDashboard() {
  const recentOrders = mockOrders.filter(o => o.statusCategory === 'completed' || o.statusCategory === 'in-progress').slice(0, 3);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Jane!</h1>
        <p className="text-muted-foreground">Here's what's happening with your laundry.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="flex flex-col bg-primary text-primary-foreground md:col-span-2 xl:col-span-1 xl:row-span-2">
            <CardHeader>
                <CardTitle>Schedule a Pickup</CardTitle>
                <CardDescription className="text-primary-foreground/80">Ready for your next laundry day? We are.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                 <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                    <Link href="/app/book/address">
                        New Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Order</CardTitle>
                 <Link href="/app/orders/YL12345" className="text-sm font-medium text-primary hover:underline">
                    #YL12345
                </Link>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="font-medium">Status: Washing</p>
                </div>
                <Progress value={60} aria-label="60% complete" />
                <p className="text-sm text-muted-foreground">Estimated delivery: Tomorrow, 4-6 PM</p>
            </CardContent>
             <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/app/orders/YL12345">
                        Track Order
                    </Link>
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">$15.50</p>
                <p className="text-sm text-muted-foreground">Credits apply automatically.</p>
            </CardContent>
             <CardFooter>
                <Button variant="secondary" className="w-full" asChild>
                    <Link href="/app/wallet">Manage Wallet</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
             <Button variant="outline" size="sm" asChild>
                <Link href="/app/orders">View all orders</Link>
            </Button>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentOrders.map(order => (
                        <TableRow key={order.id} className="cursor-pointer" onClick={() => window.location.href = `/app/orders/${order.id.replace('#','')}`}>
                             <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className={statusColors[order.statusCategory]}>
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{order.serviceSummary}</TableCell>
                            <TableCell>{order.pickupTime.split(',')[1]}</TableCell>
                            <TableCell className="text-right">{order.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {recentOrders.length === 0 && (
                 <div className="text-center py-8 text-muted-foreground">
                    <p>You have no recent orders.</p>
                    <Button variant="link" asChild>
                        <Link href="/app/book/address">Schedule your first order</Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

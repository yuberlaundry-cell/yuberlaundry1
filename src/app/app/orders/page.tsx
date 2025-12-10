import { OrderList } from "@/components/orders/order-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders } from "@/lib/mock-data";

export default function OrdersPage() {

    const upcomingOrders = mockOrders.filter(o => o.statusCategory === 'upcoming');
    const inProgressOrders = mockOrders.filter(o => o.statusCategory === 'in-progress');
    const completedOrders = mockOrders.filter(o => o.statusCategory === 'completed');
    const cancelledOrders = mockOrders.filter(o => o.statusCategory === 'cancelled');

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Your Orders</h1>
                <p className="text-muted-foreground">Track your upcoming, in-progress, and completed laundry.</p>
            </div>

            <Tabs defaultValue="in-progress">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <OrderList orders={upcomingOrders} />
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
    );
}

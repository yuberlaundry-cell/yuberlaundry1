import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function ConsumerDashboard() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, Jane!</h1>
        <p className="text-muted-foreground">Here's what's happening with your laundry.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle>Schedule a Pickup</CardTitle>
                <CardDescription className="text-primary-foreground/80">Ready for your next laundry day? We are.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter>
                 <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
                    <Link href="#">
                        New Order
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Active Order</CardTitle>
                <CardDescription>Your clothes are in good hands.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="font-medium">Status: Washing</p>
                    <p className="text-sm text-muted-foreground">Order #YL12345</p>
                </div>
                <Progress value={60} aria-label="60% complete" />
                <p className="text-sm text-muted-foreground">Estimated delivery: Tomorrow, 4-6 PM</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="#">
                        Track Order
                    </Link>
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Your available credits.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">$15.50</p>
                <p className="text-sm text-muted-foreground">Credits will be applied automatically.</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" className="w-full" asChild>
                    <Link href="#">Manage Wallet</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
             <div className="border rounded-lg">
                <div className="p-4 flex items-center justify-between hover:bg-muted/50">
                    <div>
                        <p className="font-semibold">Order #YL12344</p>
                        <p className="text-sm text-muted-foreground">Delivered on Tuesday</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-medium">$25.50</p>
                        <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Receipt</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="text-center py-8 text-muted-foreground">
                <p>You have no other recent orders.</p>
                <Button variant="link" asChild>
                    <Link href="#">View all orders</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

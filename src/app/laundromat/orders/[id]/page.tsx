
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Package, User, CheckSquare, Image as ImageIcon, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';

const orderData = {
    id: '#YL12345',
    customer: 'Jane Doe',
    service: 'Wash & Fold',
    status: 'Washing',
    pickup: 'Today, 10:15 AM',
    deliveryDue: 'Tomorrow, 5:00 PM',
    bags: [
        { id: 'BAG-001', items: 15, notes: 'Standard wash'},
        { id: 'BAG-002', items: 8, notes: 'Cold wash only'},
    ],
    timeline: [
        { status: 'Intake Completed', time: '10:30 AM'},
        { status: 'Washing Started', time: '11:00 AM'},
    ],
    notes: 'Customer requested hypoallergenic detergent.'
}

const qcChecklist = [
    { id: 'check-stains', label: 'Stains addressed' },
    { id: 'check-damage', label: 'No new damage' },
    { id: 'check-folding', label: 'Folding meets standard' },
    { id: 'check-packaging', label: 'Packaging is secure' },
    { id: 'check-completeness', label: 'All items accounted for' },
];

export default function OrderProcessingDetailsPage() {
    const params = useParams();
    const orderId = `#${params.id as string}`;
    // In a real app, you would fetch the order details based on the orderId
    const order = orderData;


  return (
    <div className="space-y-8 pb-8">
      <div>
        <Button variant="ghost" asChild className="-ml-4">
          <Link href="/laundromat/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all orders
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            Order {orderId}
          </h1>
          <p className="text-muted-foreground mt-1">Status: {order.status}</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Move to Drying</Button>
            <Button>Move to Folding/QC</Button>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Bags & Items</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    {order.bags.map(bag => (
                        <div key={bag.id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{bag.id}</p>
                                <p className="text-sm text-muted-foreground">{bag.items} items</p>
                                {bag.notes && <p className="text-sm italic text-muted-foreground">Notes: {bag.notes}</p>}
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-primary" />
                      Quality Control Checklist
                  </CardTitle>
                  <CardDescription>
                      Perform these checks before moving the order to the next stage.
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="space-y-3">
                      {qcChecklist.map(item => (
                          <div key={item.id} className="flex items-center space-x-2">
                              <Checkbox id={item.id} />
                              <Label htmlFor={item.id} className="font-medium">
                                  {item.label}
                              </Label>
                          </div>
                      ))}
                  </div>
                  <Separator />
                  <div className="space-y-3">
                      <Button variant="outline" className="w-full sm:w-auto">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Upload QC Photo
                      </Button>
                       <Button variant="destructive" className="w-full sm:w-auto">
                          <MessageSquareWarning className="mr-2 h-4 w-4" />
                          Log Issue / Defect
                      </Button>
                  </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {order.timeline.map(item => (
                            <li key={item.status} className="flex gap-4">
                                <span className="font-semibold text-sm w-24">{item.time}</span>
                                <span className="text-sm text-muted-foreground">{item.status}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

         <div className="lg:col-span-1 space-y-8 lg:sticky top-24">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{order.customer}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{order.service}</span>
                    </div>
                     <Separator />
                     <div>
                        <h4 className="font-semibold mb-1">Schedule</h4>
                        <p className="text-muted-foreground">Pickup: {order.pickup}</p>
                        <p className="text-muted-foreground">Delivery Due: {order.deliveryDue}</p>
                    </div>
                    {order.notes && (
                         <>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-1">Special Instructions</h4>
                            <p className="text-muted-foreground italic">{order.notes}</p>
                        </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}


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
import { ArrowLeft, Package, User, CheckSquare, Image as ImageIcon, MessageSquareWarning, DollarSign, PlusCircle, Printer } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLaundromatOrders, type LaundromatOrder, type LaundromatOrderItem, type LaundromatOrderStatus } from '@/hooks/use-laundromat-orders';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


const qcChecklist = [
    { id: 'check-stains', label: 'Stains addressed' },
    { id: 'check-damage', label: 'No new damage' },
    { id: 'check-folding', label: 'Folding meets standard' },
    { id: 'check-packaging', label: 'Packaging is secure' },
    { id: 'check-completeness', label: 'All items accounted for' },
];

const allTimelineSteps: { status: LaundromatOrderStatus, title: string }[] = [
    { status: 'Intake', title: 'Intake Completed'},
    { status: 'Washing', title: 'Washing'},
    { status: 'Drying', title: 'Drying'},
    { status: 'Folding/QC', title: 'Folding & QC'},
    { status: 'Ready', title: 'Ready for Handoff'},
    { status: 'Completed', title: 'Completed'},
];

export default function OrderProcessingDetailsPage() {
    const params = useParams();
    const orderId = `#${params.id as string}`;
    const { toast } = useToast();
    const { getOrderById, updateOrder } = useLaundromatOrders();

    const order = getOrderById(orderId);
    
    const timeline = useMemo(() => {
        if (!order) return [];
        const currentStatusIndex = allTimelineSteps.findIndex(step => step.status === order.status);
        
        return allTimelineSteps.map((step, index) => {
            let status: 'completed' | 'in-progress' | 'pending' = 'pending';
            if (index < currentStatusIndex) {
                status = 'completed';
            } else if (index === currentStatusIndex) {
                status = 'in-progress';
            }
            return {
                title: step.title,
                status: status,
                timestamp: 'N/A' // Timestamps would be stored on the order object in a real app
            }
        });
    }, [order]);


    const handleValueChange = (id: string, value: number) => {
        if (!order) return;
        const newItems = (order.items || []).map(item => {
            if (item.id === id) {
                return {...item, value: value};
            }
            return item;
        });
        updateOrder({ id: order.id, items: newItems });
    }
    
    const handleFinalizeBill = () => {
        if (!order) return;
        updateOrder({ id: order.id, isBilled: true });
        toast({
            title: 'Bill Finalized',
            description: `The total for order ${order.id} has been confirmed.`,
        });
    }

    const handleMoveStage = (newStatus: LaundromatOrderStatus) => {
        if (!order) return;
        updateOrder({ id: order.id, status: newStatus });
        toast({
            title: 'Order Updated',
            description: `Order ${order.id} has been moved to ${newStatus}.`
        });
    }
    
    const handleLogIssue = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!order) return;

        const formData = new FormData(e.currentTarget);
        const issueType = formData.get('issue-type') as string;
        const issueNotes = formData.get('issue-notes') as string;
        
        const newIssue = { type: issueType, notes: issueNotes };
        // This is a local update for UI purposes. In a real app, this would be part of the `updateOrder` logic.
        // updateOrder({ id: order.id, issues: [...(order.issues || []), newIssue] });

        toast({
            title: 'Issue Logged',
            description: `A ${issueType} issue has been logged for order ${order.id}.`,
        });
        return true;
    }

    const handlePrint = (type: 'Receipt' | 'Bag Tags') => {
      toast({
          title: `Printing ${type}...`,
          description: `Your ${type.toLowerCase()} have been sent to the printer.`,
      });
    }

    if (!order) {
        return <div className="text-center py-16">Loading order details...</div>;
    }

    const subtotal = (order.items || []).reduce((acc, item) => {
        return acc + (item.price * item.value);
    }, 0);


    const renderActionButtons = () => {
        switch (order.status) {
            case 'Intake':
                return <Button onClick={() => handleMoveStage('Washing')}>Start Washing</Button>;
            case 'Washing':
                return <Button onClick={() => handleMoveStage('Drying')}>Move to Drying</Button>;
            case 'Drying':
                return <Button onClick={() => handleMoveStage('Folding/QC')}>Move to Folding/QC</Button>;
            case 'Folding/QC':
                return <Button onClick={() => handleMoveStage('Ready')}>Mark as Ready for Handoff</Button>;
            case 'Ready':
                return <p className="text-sm font-medium text-green-600">Order is ready for handoff.</p>;
            default:
                return null;
        }
    };


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
        <div className="flex gap-2 items-center">
            {renderActionButtons()}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handlePrint('Receipt')}>Print Receipt</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePrint('Bag Tags')}>Print Bag Tags</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        Pricing & Items
                    </CardTitle>
                    <CardDescription>
                        Weigh items or count them to calculate the final price.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {(order.items || []).map(item => (
                        <div key={item.id} className="grid grid-cols-3 items-center gap-4 p-3 border rounded-lg">
                            <div className="col-span-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-muted-foreground">R{item.price.toFixed(2)}/{item.model === 'per_kg' ? 'kg' : 'item'}</p>
                            </div>
                             <div className="col-span-1">
                                <Label htmlFor={`item-${item.id}`} className="text-xs text-muted-foreground">{item.model === 'per_kg' ? 'Weight (kg)' : 'Quantity'}</Label>
                                <Input 
                                    id={`item-${item.id}`} 
                                    type="number" 
                                    placeholder={item.model === 'per_kg' ? '0.00' : '0'}
                                    value={item.value || ''}
                                    onChange={(e) => handleValueChange(item.id, parseFloat(e.target.value) || 0)}
                                    disabled={order.isBilled}
                                />
                            </div>
                            <div className="col-span-1 text-right">
                                <p className="font-bold text-lg">R{(item.price * item.value).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <Separator />
                     <div className="flex justify-end items-center gap-4">
                        <div className="text-right">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-bold text-2xl">R{subtotal.toFixed(2)}</p>
                        </div>
                        <Button onClick={handleFinalizeBill} disabled={order.isBilled}>
                            {order.isBilled ? 'Bill Finalized' : 'Confirm & Finalize Bill'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-primary" />
                      Quality & Issues
                  </CardTitle>
                  <CardDescription>
                      Perform quality checks and log any customer-reported issues.
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                   {/* This is where logged issues would be displayed. */}

                  <Separator />
                  <div className="space-y-3">
                     <h4 className="font-medium">Internal QC Checklist</h4>
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
                       <Dialog>
                          <DialogTrigger asChild>
                           <Button variant="destructive" className="w-full sm:w-auto">
                              <MessageSquareWarning className="mr-2 h-4 w-4" />
                              Log Customer Issue / Dispute
                          </Button>
                          </DialogTrigger>
                          <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Log a New Issue or Dispute</DialogTitle>
                                <DialogDescription>
                                    Document a customer-reported problem for this order.
                                </DialogDescription>
                              </DialogHeader>
                              <form className="space-y-4" onSubmit={(e) => {
                                 const closeButton = e.currentTarget.querySelector<HTMLButtonElement>('[data-close-dialog]');
                                 const success = handleLogIssue(e);
                                 if (success && closeButton) {
                                     closeButton.click();
                                 }
                              }}>
                                  <div className="space-y-2">
                                      <Label htmlFor="issue-type">Issue Type</Label>
                                      <Select name="issue-type" required>
                                          <SelectTrigger id="issue-type">
                                              <SelectValue placeholder="Select an issue type" />
                                          </SelectTrigger>
                                          <SelectContent>
                                              <SelectItem value="Missing Item">Missing Item</SelectItem>
                                              <SelectItem value="Damaged Item">Damaged Item</SelectItem>
                                              <SelectItem value="Poor Quality">Poor Quality (e.g., stains)</SelectItem>
                                              <SelectItem value="Other">Other</SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="issue-notes">Detailed Notes</Label>
                                      <Textarea id="issue-notes" name="issue-notes" placeholder="Describe the issue in detail. e.g., 'Customer reports a blue sweater is missing from bag 2.'" required />
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="issue-photo">Upload Photo (optional)</Label>
                                      <Input id="issue-photo" type="file" />
                                  </div>
                                  <DialogFooter>
                                     <button type="button" data-close-dialog className="hidden"></button>
                                      <Button type="submit">Log Issue</Button>
                                  </DialogFooter>
                              </form>
                          </DialogContent>
                       </Dialog>
                  </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {timeline.map(item => (
                            <li key={item.title} className="flex gap-4">
                                <span className="font-semibold text-sm w-24">{item.timestamp}</span>
                                <span className="text-sm text-muted-foreground">{item.title}</span>
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
                        <div className="text-muted-foreground flex items-center">SLA: <Badge variant={order.sla.includes('Due') ? 'destructive' : 'outline'} className="ml-1">{order.sla}</Badge></div>
                    </div>
                    
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
    

    

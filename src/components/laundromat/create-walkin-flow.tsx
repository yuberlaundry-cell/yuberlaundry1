
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { CheckCircle, Printer, ShoppingBag, VenetianMask, DollarSign, CreditCard, Clock, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useLaundromatOrders } from '@/hooks/use-laundromat-orders';

const servicesConfig = [
  { id: 'wash-fold', name: 'Wash & Fold', icon: ShoppingBag, model: 'per_kg', price: 40.00 },
  { id: 'dry-cleaning', name: 'Dry Cleaning', icon: VenetianMask, model: 'per_item', price: 80.00 },
];

interface CreateWalkinFlowProps {
    onComplete: () => void;
    onBack: () => void;
}

export function CreateWalkinFlow({ onComplete, onBack }: CreateWalkinFlowProps) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', phone: '' });
  const [orderItems, setOrderItems] = useState<{ id: string; name: string; model: string; price: number; value: number }[]>([]);
  const [newOrderId, setNewOrderId] = useState('');
  const { toast } = useToast();
  const { addOrder } = useLaundromatOrders();

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  
  const handleCreateOrder = () => {
    const generatedId = `#W-${Math.floor(10000 + Math.random() * 90000)}`;
    setNewOrderId(generatedId);
    
    const serviceSummary = orderItems.map(item => item.name).join(', ');

    addOrder({
        id: generatedId,
        customer: customer.name,
        service: serviceSummary,
        status: 'Intake',
        pickup: new Date().toLocaleDateString(),
        sla: 'Due in 24h',
        bags: orderItems.length,
        items: orderItems, // Make sure to pass the items with their values
        isBilled: true, // Walk-in orders are billed on the spot
    });

    toast({
        title: `Order ${generatedId} Created`,
        description: 'The order for ' + customer.name + ' is now in the system.',
    });
    handleNext();
  }

  const handlePrint = (type: 'Receipt' | 'Bag Tags') => {
    toast({
        title: `Printing ${type}...`,
        description: `Your ${type.toLowerCase()} have been sent to the printer.`,
    });
  }

  const handleItemValueChange = (id: string, value: number) => {
    setOrderItems(orderItems.map(item => item.id === id ? { ...item, value } : item));
  };
  
  const toggleService = (serviceId: string) => {
    const service = servicesConfig.find(s => s.id === serviceId);
    if (!service) return;

    if (orderItems.some(item => item.id === serviceId)) {
        setOrderItems(orderItems.filter(item => item.id !== serviceId));
    } else {
        setOrderItems([...orderItems, { ...service, value: 0 }]);
    }
  };
  
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.value), 0);
  const tax = subtotal * 0; // Assuming 0 tax for simplicity
  const total = subtotal + tax;


  const renderStep = () => {
    switch (step) {
      case 1: // Customer Details
        return (
          <>
            <DialogHeader>
              <DialogTitle>Create Walk-in Order</DialogTitle>
              <DialogDescription>Step 1: Enter customer details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input
                  id="customer-name"
                  placeholder="John Doe"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-phone">Phone Number</Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  placeholder="+27 71 123 4567"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={onBack}>Back to Intake Type</Button>
              <Button onClick={handleNext} disabled={!customer.name || !customer.phone}>Continue</Button>
            </DialogFooter>
          </>
        );
      case 2: // Services and Pricing
        return (
           <>
            <DialogHeader>
              <DialogTitle>Services & Pricing</DialogTitle>
              <DialogDescription>Step 2: Weigh items and calculate the price for {customer.name}.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                {servicesConfig.map((service) => (
                    <div key={service.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Checkbox 
                                id={`walkin-${service.id}`}
                                checked={orderItems.some(item => item.id === service.id)}
                                onCheckedChange={() => toggleService(service.id)}
                            />
                            <Label htmlFor={`walkin-${service.id}`} className="flex items-center gap-3 cursor-pointer flex-grow">
                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                    <service.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">{service.name}</p>
                                    <p className="text-xs text-muted-foreground">R{service.price}/{service.model === 'per_kg' ? 'kg' : 'item'}</p>
                                </div>
                            </Label>
                        </div>
                        {orderItems.some(item => item.id === service.id) && (
                            <div className="mt-3 pl-12">
                                <Label htmlFor={`item-val-${service.id}`}>{service.model === 'per_kg' ? 'Weight (kg)' : 'Quantity'}</Label>
                                <Input 
                                    id={`item-val-${service.id}`}
                                    type="number"
                                    placeholder="0"
                                    value={orderItems.find(item => item.id === service.id)?.value || ''}
                                    onChange={(e) => handleItemValueChange(service.id, parseFloat(e.target.value) || 0)}
                                    className="mt-1"
                                />
                            </div>
                        )}
                    </div>
                ))}
                <Separator />
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-medium">R{subtotal.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between">
                        <p className="text-muted-foreground">Tax</p>
                        <p className="font-medium">R{tax.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between font-bold text-base">
                        <p>Total</p>
                        <p>R{total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} disabled={total <= 0}>Continue to Payment</Button>
            </DialogFooter>
          </>
        );
      case 3: // Payment
        return (
          <>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
              <DialogDescription>Step 3: Collect payment for order total of <span className="font-bold text-foreground">R{total.toFixed(2)}</span>.</DialogDescription>
            </DialogHeader>
             <div className="space-y-4 py-4">
                <RadioGroup defaultValue="cash" className="space-y-3">
                    <Label htmlFor="pay-cash" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <RadioGroupItem value="cash" id="pay-cash" />
                        <Banknote className="h-6 w-6 text-green-600" />
                        <div>
                            <p className="font-semibold">Pay with Cash</p>
                            <p className="text-sm text-muted-foreground">Customer pays with physical cash.</p>
                        </div>
                    </Label>
                     <Label htmlFor="pay-pos" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <RadioGroupItem value="pos" id="pay-pos" />
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <div>
                            <p className="font-semibold">Pay with Card / POS</p>
                            <p className="text-sm text-muted-foreground">Use your existing POS terminal.</p>
                        </div>
                    </Label>
                    <Label htmlFor="pay-later" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                        <RadioGroupItem value="later" id="pay-later" />
                        <Clock className="h-6 w-6 text-amber-600" />
                        <div>
                            <p className="font-semibold">Pay Later</p>
                            <p className="text-sm text-muted-foreground">Bill the customer's account, pay at pickup.</p>
                        </div>
                    </Label>
                </RadioGroup>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={handleBack}>Back</Button>
              <Button onClick={handleCreateOrder}>Confirm & Create Order</Button>
            </DialogFooter>
          </>
        );
      case 4: // Confirmation
         return (
             <>
                <DialogHeader className="text-center items-center">
                    <div className="p-4 rounded-full bg-green-100 text-green-700 mb-4">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <DialogTitle>Order {newOrderId} Created</DialogTitle>
                    <DialogDescription>The order for {customer.name} has been successfully created and is marked as paid.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-center">
                    <p className="text-muted-foreground">Attach the printed tags to the customer's bags. You can now find this order in the main queue.</p>
                    <div className="grid grid-cols-2 gap-2">
                        <Button className="w-full" variant="outline" onClick={() => handlePrint('Receipt')}>
                            <Printer className="mr-2" /> Print Receipt
                        </Button>
                        <Button className="w-full" onClick={() => handlePrint('Bag Tags')}>
                            <Printer className="mr-2" /> Print Bag Tags
                        </Button>
                    </div>
                </div>
                 <DialogFooter className="sm:justify-center">
                    <Button onClick={onComplete} className="w-full">Finish Intake & Start New</Button>
                </DialogFooter>
             </>
         )
      default:
        return null;
    }
  };

  return <div className="flex flex-col h-full">{renderStep()}</div>;
}

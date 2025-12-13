
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { CheckCircle, Printer, ShoppingBag, VenetianMask, DollarSign, CreditCard, Clock, Banknote, Loader2, User, Truck, Calendar as CalendarIcon, MapPin, Smartphone, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useLaundromatOrders } from '@/hooks/use-laundromat-orders';
import { PhoneNumberInput } from '../ui/phone-number-input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { AddressInput } from '../ui/address-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import QRCode from "react-qr-code";

const servicesConfig = [
  { id: 'wash-fold', name: 'Wash & Fold', icon: ShoppingBag, model: 'per_kg', price: 40.00 },
  { id: 'dry-cleaning', name: 'Dry Cleaning', icon: VenetianMask, model: 'per_item', price: 80.00 },
];

const deliveryFee = 25.00;

interface CreateWalkinFlowProps {
    onComplete: () => void;
    onBack: () => void;
}

export function CreateWalkinFlow({ onComplete, onBack }: CreateWalkinFlowProps) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });
  const [orderItems, setOrderItems] = useState<{ id: string; name: string; model: string; price: number; value: number }[]>([]);
  const [newOrderId, setNewOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessingYoco, setIsProcessingYoco] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('');

  const { toast } = useToast();
  const { addOrder } = useLaundromatOrders();

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.value), 0);
  const tax = subtotal * 0; // Assuming 0 tax for simplicity
  const finalDeliveryFee = deliveryOption === 'deliver' ? deliveryFee : 0;
  const total = subtotal + tax + finalDeliveryFee;

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => step === 1 ? onBack() : setStep((s) => s - 1);
  
  const handleCreateOrder = () => {
    const orderId = `#W-${Math.floor(10000 + Math.random() * 90000)}`;
    setNewOrderId(orderId);

    if (paymentMethod === 'yoco') {
        setIsProcessingYoco(true);
        const yocoPayload = {
            amount: { amount: Math.round(total * 100), currency: "ZAR" },
            client_reference: orderId,
            metadata: { laundromatId: "laundromat-123", customerName: customer.name }
        };
        console.log("Simulating API call to Yoco with payload:", yocoPayload);
        setTimeout(() => {
            toast({
                title: "Waiting for Yoco Payment",
                description: `Complete the R${total.toFixed(2)} payment on the Yoco terminal.`,
            });
        }, 1000);
        return;
    }
    
    finalizeOrder(orderId);
  }

  const finalizeOrder = (orderId: string) => {
    setIsProcessingYoco(false);
    const serviceSummary = orderItems.map(item => item.name).join(', ');
    addOrder({
        id: orderId, customer: customer.name, service: serviceSummary, status: 'Intake',
        pickup: new Date().toLocaleDateString(), sla: 'Due in 24h', bags: orderItems.length,
        items: orderItems, isBilled: true,
    });
    toast({ title: `Order ${orderId} Created`, description: `The order for ${customer.name} is now in the system.` });
    setStep(5); // Move to the final confirmation step
  }

  const handlePrint = (type: 'Receipt' | 'Bag Tags') => {
    toast({ title: `Printing ${type}...`, description: `Your ${type.toLowerCase()} have been sent to the printer.` });
  }

   const handleSendAppLink = () => {
    toast({ title: "App Link Sent!", description: `An SMS with a link to download the app has been sent to ${customer.name}.` });
  }

  const handleItemValueChange = (id: string, value: number) => {
    setOrderItems(orderItems.map(item => item.id === id ? { ...item, value } : item));
  };
  
  const toggleService = (serviceId: string) => {
    const service = servicesConfig.find(s => s.id === serviceId);
    if (!service) return;
    setOrderItems(prev => prev.some(item => item.id === serviceId) ? prev.filter(item => item.id !== serviceId) : [...prev, { ...service, value: 0 }]);
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
                <CardTitle>Create Walk-in Order</CardTitle>
                <CardDescription>Step 1: Enter customer details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label htmlFor="customer-name">Customer Name</Label><Input id="customer-name" placeholder="John Doe" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required /></div>
              <div className="space-y-2"><Label htmlFor="customer-phone">Phone Number</Label><PhoneNumberInput /></div>
              <div className="space-y-2"><Label htmlFor="customer-email">Email Address</Label><Input id="customer-email" type="email" placeholder="john.doe@example.com" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Services & Pricing</CardTitle>
              <CardDescription>Step 2: Weigh items and calculate the price for {customer.name}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {servicesConfig.map((service) => (
                    <div key={service.id} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Checkbox id={`walkin-${service.id}`} checked={orderItems.some(item => item.id === service.id)} onCheckedChange={() => toggleService(service.id)}/>
                            <Label htmlFor={`walkin-${service.id}`} className="flex items-center gap-3 cursor-pointer flex-grow">
                                <div className="bg-primary/10 text-primary p-3 rounded-lg"><service.icon className="h-5 w-5" /></div>
                                <div><p className="font-semibold">{service.name}</p><p className="text-xs text-muted-foreground">R{service.price}/{service.model === 'per_kg' ? 'kg' : 'item'}</p></div>
                            </Label>
                        </div>
                        {orderItems.some(item => item.id === service.id) && (
                            <div className="mt-3 pl-12"><Label htmlFor={`item-val-${service.id}`}>{service.model === 'per_kg' ? 'Weight (kg)' : 'Quantity'}</Label><Input id={`item-val-${service.id}`} type="number" placeholder="0" value={orderItems.find(item => item.id === service.id)?.value || ''} onChange={(e) => handleItemValueChange(service.id, parseFloat(e.target.value) || 0)} className="mt-1"/></div>
                        )}
                    </div>
                ))}
            </CardContent>
          </Card>
        );
      case 3: // Delivery Options
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Pickup or Delivery?</CardTitle>
                    <CardDescription>Step 3: Will the customer pick up the order, or should it be delivered?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-3">
                        <Label htmlFor="delivery-pickup" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"><RadioGroupItem value="pickup" id="delivery-pickup" /><User className="h-6 w-6 text-gray-600" /><div><p className="font-semibold">Customer will pick up from store</p></div></Label>
                        <Label htmlFor="delivery-deliver" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"><RadioGroupItem value="deliver" id="delivery-deliver" /><Truck className="h-6 w-6 text-primary" /><div><p className="font-semibold">Deliver to customer's address</p><p className="text-sm text-muted-foreground">A delivery fee of R{deliveryFee.toFixed(2)} will be added.</p></div></Label>
                    </RadioGroup>
                    {deliveryOption === 'deliver' && (
                        <div className="pt-4 space-y-4">
                            <Separator />
                            <div className="space-y-2">
                                <Label htmlFor="delivery-address">Delivery Address</Label>
                                <AddressInput id="delivery-address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} onAddressSelect={(addr) => setDeliveryAddress(addr.description)} required={deliveryOption === 'deliver'} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="delivery-slot">Delivery Time Slot</Label>
                                <Select onValueChange={setDeliverySlot} required={deliveryOption === 'deliver'}>
                                    <SelectTrigger><SelectValue placeholder="Select a delivery slot..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tomorrow-am">Tomorrow Morning (9am-12pm)</SelectItem>
                                        <SelectItem value="tomorrow-pm">Tomorrow Afternoon (1pm-5pm)</SelectItem>
                                        <SelectItem value="day-after-am">Day After Tomorrow (9am-12pm)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
      case 4: // Payment
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
              <CardDescription>Step 4: Collect payment for order total of <span className="font-bold text-foreground">R{total.toFixed(2)}</span>.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                {isProcessingYoco ? (
                     <div className="p-8 text-center space-y-4">
                        <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                        <h3 className="font-semibold text-lg">Waiting for Yoco...</h3>
                        <p className="text-muted-foreground">Complete the payment on the Yoco card machine.</p>
                        <div className="flex gap-2 justify-center"><Button variant="destructive" size="sm" onClick={() => setIsProcessingYoco(false)}>Cancel</Button><Button variant="secondary" size="sm" onClick={() => finalizeOrder(newOrderId)}>Simulate Success</Button></div>
                    </div>
                ) : (
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                        <Label htmlFor="pay-cash" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"><RadioGroupItem value="cash" id="pay-cash" /><Banknote className="h-6 w-6 text-green-600" /><div><p className="font-semibold">Pay with Cash</p></div></Label>
                        <Label htmlFor="pay-yoco" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"><RadioGroupItem value="yoco" id="pay-yoco" /><CreditCard className="h-6 w-6 text-blue-600" /><div><p className="font-semibold">Pay with Yoco</p></div></Label>
                        {deliveryOption === 'pickup' && <Label htmlFor="pay-later" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary"><RadioGroupItem value="later" id="pay-later" /><Clock className="h-6 w-6 text-amber-600" /><div><p className="font-semibold">Pay on Collection</p></div></Label>}
                    </RadioGroup>
                )}
            </CardContent>
          </Card>
        );
      case 5: // Confirmation
         return (
             <Card className="text-center">
                <CardHeader className="items-center">
                    <div className="p-4 rounded-full bg-green-100 text-green-700 mb-4"><CheckCircle className="h-10 w-10" /></div>
                    <CardTitle>Order {newOrderId} Created</CardTitle>
                    <CardDescription>The order for {customer.name} has been successfully created and is marked as paid.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {deliveryOption === 'deliver' && (
                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base text-blue-800"><Smartphone />Customer Next Steps</CardTitle>
                                <CardDescription className="text-blue-700">Encourage the customer to download the app to track their delivery.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="bg-white p-2 rounded-lg border">
                                    <QRCode value={`https://yuber.app/order/${newOrderId}`} size={128} />
                                </div>
                                <Button onClick={handleSendAppLink} className="w-full">Send App Link via SMS</Button>
                            </CardContent>
                        </Card>
                    )}
                    <div className="grid grid-cols-2 gap-2 pt-4"><Button className="w-full" variant="outline" onClick={() => handlePrint('Receipt')}><Printer className="mr-2" /> Print Receipt</Button><Button className="w-full" onClick={() => handlePrint('Bag Tags')}><Printer className="mr-2" /> Print Bag Tags</Button></div>
                </CardContent>
             </Card>
         )
      default: return null;
    }
  };

  return (
      <div className="max-w-md mx-auto space-y-6">
        {renderStep()}
        {step < 5 && !isProcessingYoco && (
            <div className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2" />Back</Button>
                {step < 4 ? (
                     <Button onClick={handleNext} disabled={(step === 1 && !customer.name) || (step === 2 && total <= 0) || (step === 3 && deliveryOption === 'deliver' && (!deliveryAddress || !deliverySlot))}>Continue</Button>
                ) : (
                    <Button onClick={handleCreateOrder}>Confirm & Create Order</Button>
                )}
            </div>
        )}
        {step === 5 && (
            <Button onClick={onComplete} className="w-full">Finish Intake & Start New</Button>
        )}
      </div>
  )
}

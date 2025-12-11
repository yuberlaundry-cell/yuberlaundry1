
'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { CheckCircle, Printer, ShoppingBag, VenetianMask } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const services = [
  { id: 'wash-fold', name: 'Wash & Fold', icon: ShoppingBag },
  { id: 'dry-cleaning', name: 'Dry Cleaning', icon: VenetianMask },
];

interface CreateWalkinFlowProps {
    onComplete: () => void;
    onBack: () => void;
}

export function CreateWalkinFlow({ onComplete, onBack }: CreateWalkinFlowProps) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', phone: '' });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { toast } = useToast();

  const handleNext = () => setStep((s) => s + 1);
  
  const handleCreateOrder = () => {
    toast({
        title: 'Order #W-54321 Created',
        description: 'The order for ' + customer.name + ' is now in the system.',
    });
    handleNext();
  }

  const renderStep = () => {
    switch (step) {
      case 1:
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
                  placeholder="+44 7123 456789"
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
      case 2:
        return (
          <>
            <DialogHeader>
              <DialogTitle>Select Services</DialogTitle>
              <DialogDescription>Step 2: Choose services for {customer.name}.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                {services.map((service) => (
                    <div key={service.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Checkbox 
                            id={`walkin-${service.id}`}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setSelectedServices([...selectedServices, service.id]);
                                } else {
                                    setSelectedServices(selectedServices.filter(id => id !== service.id));
                                }
                            }}
                        />
                        <Label htmlFor={`walkin-${service.id}`} className="flex items-center gap-3 cursor-pointer flex-grow">
                             <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                <service.icon className="h-5 w-5" />
                            </div>
                            <p className="font-semibold">{service.name}</p>
                        </Label>
                    </div>
                ))}
                <Separator />
                <div className="space-y-2">
                    <Label htmlFor="bags">Number of Bags</Label>
                    <Input id="bags" type="number" defaultValue={1} />
                </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleCreateOrder} disabled={selectedServices.length === 0}>Create Order & Print Tags</Button>
            </DialogFooter>
          </>
        );
      case 3:
         return (
             <>
                <DialogHeader className="text-center items-center">
                    <div className="p-4 rounded-full bg-green-100 text-green-700 mb-4">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <DialogTitle>Order #W-54321 Created</DialogTitle>
                    <DialogDescription>The order for {customer.name} has been successfully created.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-center">
                    <p className="text-muted-foreground">Attach the printed tags to the customer's bags. You can now find this order in the main queue.</p>
                     <Button className="w-full">
                        <Printer className="mr-2" /> Print Bag Tags
                    </Button>
                </div>
                 <DialogFooter className="sm:justify-center">
                    <Button onClick={onComplete} className="w-full">Finish Intake</Button>
                </DialogFooter>
             </>
         )
      default:
        return null;
    }
  };

  return <div className="flex flex-col h-full">{renderStep()}</div>;
}

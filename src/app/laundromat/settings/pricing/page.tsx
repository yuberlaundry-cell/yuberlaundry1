
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const services = [
  { id: 'wash-fold', name: 'Wash & Fold', enabled: true, model: 'per_kg', price: 1.99 },
  { id: 'dry-cleaning', name: 'Dry Cleaning', enabled: true, model: 'per_item', price: 0 },
  { id: 'ironing', name: 'Ironing', enabled: true, model: 'per_item', price: 3.50 },
  { id: 'bedding', name: 'Bedding & Duvets', enabled: false, model: 'per_item', price: 25.00 },
  { id: 'repairs', name: 'Repairs & Alterations', enabled: false, model: 'per_item', price: 0 },
];

export default function PricingSettingsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Services & Pricing</h1>
        <p className="text-muted-foreground">
          Define the services you offer and set your pricing structure.
        </p>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Manage Services</CardTitle>
                <CardDescription>
                  Enable the services your facility provides and configure their pricing.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {services.map((service) => (
                    <div key={service.id}>
                        <div
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4"
                        >
                            <div className='mb-4 sm:mb-0'>
                                <Label htmlFor={service.id} className="font-semibold text-base flex items-center gap-2">
                                     <Switch id={service.id} defaultChecked={service.enabled} />
                                    {service.name}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1 ml-8">
                                    {service.model === 'per_kg' ? 'Priced per kilogram.' : 'Priced per item.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Select defaultValue={service.model}>
                                    <SelectTrigger className="w-full sm:w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="per_kg">Per kg</SelectItem>
                                        <SelectItem value="per_item">Per item</SelectItem>
                                    </SelectContent>
                                </Select>
                                 <div className="relative w-full sm:w-[120px]">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <Input 
                                        type="number" 
                                        defaultValue={service.price.toFixed(2)} 
                                        className="pl-6" 
                                        aria-label="Price"
                                    />
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                 <div className="pt-4 flex flex-col sm:flex-row gap-2">
                    <Button variant="outline">
                        <PlusCircle className="mr-2" /> Add Custom Service
                    </Button>
                    <Button className="sm:ml-auto">Save Pricing</Button>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}


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
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// This data would now be fetched from a central service/database managed by the superadmin.
const allPlatformServices = [
  { id: 'wash-fold', name: 'Wash & Fold', enabled: true, model: 'per_kg', price: 40.00, tags: [] },
  { id: 'dry-cleaning', name: 'Dry Cleaning', enabled: true, model: 'per_item', price: 0, tags: [] },
  { id: 'ironing', name: 'Ironing', enabled: true, model: 'per_item', price: 25.00, tags: [] },
  { id: 'bedding', name: 'Bedding & Duvets', enabled: true, model: 'per_item', price: 150.00, tags: ["Coming Soon"] },
  { id: 'repairs', name: 'Repairs & Alterations', enabled: false, model: 'per_item', price: 0, tags: ["Coming Soon"] },
  { id: 'sneakers', name: 'Sneaker Cleaning', enabled: true, model: 'per_item', price: 250.00, tags: ["New"] },
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
                <CardTitle>Manage Your Services</CardTitle>
                <CardDescription>
                  Enable the services your facility provides from the platform's available options and set your price.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {allPlatformServices.filter(s => s.enabled).map((service) => (
                    <div key={service.id}>
                        <div
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4"
                        >
                            <div className='mb-4 sm:mb-0'>
                                <Label htmlFor={service.id} className="font-semibold text-base flex items-center gap-2">
                                     <Switch id={service.id} defaultChecked={service.id !== 'repairs'} />
                                    {service.name}
                                    {service.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1 ml-8">
                                    {service.model === 'per_kg' ? 'Pricing is per kilogram.' : 'Pricing is per item.'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R</span>
                                    <Input 
                                        type="number" 
                                        defaultValue={service.price > 0 ? service.price.toFixed(2) : ''} 
                                        placeholder={service.price > 0 ? '' : 'Custom'}
                                        className="pl-6" 
                                        aria-label="Price"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                 <div className="pt-4 flex justify-end">
                    <Button>Save Pricing</Button>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}

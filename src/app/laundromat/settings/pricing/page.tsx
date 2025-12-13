
'use client';

import { useState } from 'react';
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
import { PlusCircle, Trash2, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data representing services enabled by the Superadmin
const allPlatformServices = [
  { id: 'wash-fold', name: 'Wash & Fold', model: 'per_kg', defaultPrice: 40.00, tags: [] },
  { id: 'dry-cleaning', name: 'Dry Cleaning', model: 'per_item', defaultPrice: 0, tags: [] },
  { id: 'ironing', name: 'Ironing', model: 'per_item', defaultPrice: 0, tags: [] },
  { id: 'bedding', name: 'Bedding & Duvets', model: 'per_item', defaultPrice: 0, tags: [] },
  { id: 'sneakers', name: 'Sneaker Cleaning', model: 'per_item', defaultPrice: 0, tags: ["New"] },
  { id: 'repairs', name: 'Repairs & Alterations', model: 'per_item', defaultPrice: 0, tags: [] },
];

const initialItemPrices = {
    'dry-cleaning': [
        { id: 'dc-1', name: 'Shirt', price: 90.00 },
        { id: 'dc-2', name: 'Suit (2-piece)', price: 350.00 },
        { id: 'dc-3', name: 'Dress', price: 180.00 },
    ],
    'ironing': [
         { id: 'ir-1', name: 'Shirt', price: 25.00 },
         { id: 'ir-2', name: 'Trousers', price: 30.00 },
    ],
    'bedding': [
        { id: 'bd-1', name: 'Duvet (Single)', price: 150.00 },
        { id: 'bd-2', name: 'Duvet (Double/Queen)', price: 250.00 },
    ],
     'sneakers': [
        { id: 'snk-1', name: 'Standard Clean', price: 250.00 },
    ]
}

export default function PricingSettingsPage() {
    const [enabledServices, setEnabledServices] = useState<Record<string, boolean>>({
        'wash-fold': true,
        'dry-cleaning': true,
        'ironing': true,
        'bedding': false,
        'sneakers': true,
        'repairs': false
    });
    const [itemPrices, setItemPrices] = useState(initialItemPrices);

    const handleAddItem = (serviceId: keyof typeof initialItemPrices) => {
        const newItem = { id: `${serviceId}-${Date.now()}`, name: '', price: 0 };
        setItemPrices(prev => ({
            ...prev,
            [serviceId]: [...prev[serviceId], newItem]
        }));
    };

    const handleRemoveItem = (serviceId: keyof typeof initialItemPrices, itemId: string) => {
         setItemPrices(prev => ({
            ...prev,
            [serviceId]: prev[serviceId].filter(item => item.id !== itemId)
        }));
    }

  return (
    <div className="space-y-8 pb-8">
        <div>
            <Button variant="ghost" asChild className="-ml-4">
                <Link href="/laundromat/settings">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Settings
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline mt-2">Services & Pricing</h1>
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
                {allPlatformServices.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                            <Label htmlFor={service.id} className="font-semibold text-base flex items-center gap-2 cursor-pointer">
                                 <Switch 
                                    id={service.id} 
                                    checked={enabledServices[service.id]} 
                                    onCheckedChange={(checked) => setEnabledServices(prev => ({...prev, [service.id]: checked}))}
                                />
                                {service.name}
                                {service.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                            </Label>
                        </div>

                       {enabledServices[service.id] && (
                            <div className="pl-8 space-y-4">
                                {service.model === 'per_kg' ? (
                                     <div className="flex items-end gap-2 max-w-xs">
                                        <div className="flex-grow space-y-1">
                                            <Label htmlFor={`price-${service.id}`}>Price per kg</Label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R</span>
                                                <Input 
                                                    id={`price-${service.id}`}
                                                    type="number" 
                                                    defaultValue={service.defaultPrice.toFixed(2)} 
                                                    className="pl-6" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Label>Item Price List</Label>
                                        <div className="space-y-2">
                                            {(itemPrices[service.id as keyof typeof itemPrices] || []).map(item => (
                                                 <div key={item.id} className="flex items-center gap-2">
                                                    <Input defaultValue={item.name} placeholder="Item name (e.g., T-Shirt)" className="flex-grow"/>
                                                     <div className="relative w-[120px]">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R</span>
                                                        <Input type="number" defaultValue={item.price.toFixed(2)} className="pl-6"/>
                                                    </div>
                                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(service.id as keyof typeof itemPrices, item.id)}>
                                                        <Trash2 className="h-4 w-4"/>
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                         <Button variant="outline" size="sm" onClick={() => handleAddItem(service.id as keyof typeof itemPrices)}>
                                            <PlusCircle className="mr-2 h-4 w-4"/> Add Item
                                        </Button>
                                    </div>
                                )}
                            </div>
                       )}
                    </div>
                ))}
                 <div className="pt-4 flex justify-end">
                    <Button>Save All Pricing</Button>
                </div>
            </CardContent>
        </Card>

    </div>
  );
}

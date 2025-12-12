
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
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const initialServices = [
  { 
    id: 'wash-fold', 
    name: 'Wash & Fold', 
    description: 'Standard laundry service for everyday items.', 
    enabled: true, 
    tags: [],
    pricing: {
      model: 'per_kg',
      base_price: 40.00,
      separate_wash_multiplier: 2,
    },
    preferences: {
      separate_wash_enabled: true,
      temperatures: ['Cold', 'Warm', 'Hot (+$5)'],
    }
  },
  { id: 'dry-cleaning', name: 'Dry Cleaning', description: 'For delicate items and special care.', enabled: true, tags: [] },
  { id: 'ironing', name: 'Ironing', description: 'Pressing service for shirts, trousers, etc.', enabled: true, tags: [] },
  { id: 'bedding', name: 'Bedding & Duvets', description: 'For large items like duvets, comforters, and pillows.', enabled: false, tags: ["Coming Soon"] },
  { id: 'repairs', name: 'Repairs & Alterations', description: 'Minor repairs and alterations.', enabled: false, tags: ["Coming Soon"] },
];

export default function ServiceManagementPage() {
    const [services, setServices] = useState(initialServices);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Service Management</h1>
          <p className="text-muted-foreground">
            Define and manage the services offered across the platform.
          </p>
        </div>
         <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
                </Button>
            </DialogTrigger>
            <DialogContent>
                 <DialogHeader>
                    <DialogTitle>Create a New Service</DialogTitle>
                    <DialogDescription>Define a new service that can be offered by laundromats.</DialogDescription>
                </DialogHeader>
                <ServiceForm />
            </DialogContent>
        </Dialog>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Platform Services</CardTitle>
                <CardDescription>
                  This is the master list of all services. Laundromats can choose to enable or disable these for their facility.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {services.map((service) => (
                    <div key={service.id}>
                        <div
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4"
                        >
                            <div className='flex items-center gap-4 mb-4 sm:mb-0'>
                                <Switch id={service.id} checked={service.enabled} />
                                <div>
                                    <Label htmlFor={service.id} className="font-semibold text-base flex items-center gap-2">
                                        {service.name}
                                        {service.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </Label>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Dialog>
                                    <DialogTrigger asChild>
                                         <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Service: {service.name}</DialogTitle>
                                        </DialogHeader>
                                        <ServiceForm service={service} />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                 <div className="pt-4 flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}


function ServiceForm({ service }: { service?: typeof initialServices[0]}) {
    return (
        <form className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
            <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input id="service-name" placeholder="e.g., Sneaker Cleaning" defaultValue={service?.name} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Input id="service-description" placeholder="A short description of the service." defaultValue={service?.description} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="service-tags">Tags (comma-separated)</Label>
                <Input id="service-tags" placeholder="e.g., New, Popular, Coming Soon" defaultValue={service?.tags.join(', ')} />
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="service-enabled" defaultChecked={service?.enabled ?? true} />
                <Label htmlFor="service-enabled">Enabled</Label>
            </div>
            
            {service?.id === 'wash-fold' && (
              <>
                <Separator />
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-semibold">Wash & Fold Preferences</h4>
                   <div className="space-y-2">
                        <Label htmlFor="base-price">Base Price per kg</Label>
                        <Input id="base-price" type="number" defaultValue={service.pricing?.base_price} />
                    </div>
                  <div className="flex items-center space-x-2">
                      <Switch id="separate-wash-enabled" defaultChecked={service.preferences?.separate_wash_enabled} />
                      <Label htmlFor="separate-wash-enabled">Enable "Separate Wash" option</Label>
                  </div>
                   <div className="space-y-2">
                        <Label htmlFor="separate-wash-multiplier">"Separate Wash" Price Multiplier</Label>
                        <Input id="separate-wash-multiplier" type="number" defaultValue={service.pricing?.separate_wash_multiplier} />
                        <p className="text-xs text-muted-foreground">e.g., 2 means it will be 2x the base price.</p>
                    </div>
                   <div className="space-y-2">
                        <Label htmlFor="temperature-options">Temperature Options (comma-separated)</Label>
                        <Input id="temperature-options" defaultValue={service.preferences?.temperatures.join(', ')} />
                    </div>
                </div>
              </>
            )}

            <DialogFooter>
                <Button type="submit">{service ? 'Save Changes' : 'Create Service'}</Button>
            </DialogFooter>
        </form>
    )
}

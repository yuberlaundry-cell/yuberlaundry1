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
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function LaundromatSettingsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Facility Settings</h1>
        <p className="text-muted-foreground">
          Manage your laundromat's operational details and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Details</CardTitle>
          <CardDescription>
            Update your facility's name and address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="facility-name">Facility Name</Label>
              <Input id="facility-name" defaultValue="Main St. Laundry" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                defaultValue="100 Laundry Lane, London, UK"
              />
            </div>
            <div className="pt-4">
              <Button>Save Facility Details</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Operational Settings</CardTitle>
          <CardDescription>
            Define working hours, capacity, and processing rules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 max-w-lg">
             <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="open-time">Opening Time</Label>
                    <Input id="open-time" type="time" defaultValue="08:00" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="close-time">Closing Time</Label>
                    <Input id="close-time" type="time" defaultValue="22:00" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="capacity">Max Concurrent Orders</Label>
                <Input id="capacity" type="number" defaultValue="50" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="sla">Standard SLA (in hours)</Label>
                <Input id="sla" type="number" defaultValue="24" />
            </div>
            <Separator />
             <div className="space-y-2">
                 <div className="flex items-center space-x-2">
                    <Checkbox id="auto-assign" defaultChecked />
                    <Label htmlFor="auto-assign">
                       Automatically assign ready orders to available drivers.
                    </Label>
                </div>
            </div>

            <div className="pt-4">
              <Button>Save Operational Settings</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

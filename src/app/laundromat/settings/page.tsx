
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { AddressInput } from '@/components/ui/address-input';

export default function LaundromatSettingsPage() {
  const [address, setAddress] = useState("100 Laundry Lane, London, UK");
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Facility Settings</h1>
        <p className="text-muted-foreground">
          Manage your laundromat's operational details and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="pricing">Services & Pricing</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
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
                  <AddressInput
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onAddressSelect={(addr) => {
                          setAddress(addr.description);
                          console.log("Selected coordinates:", addr.coordinates);
                      }}
                  />
                </div>
                <div className="pt-4">
                  <Button>Save Facility Details</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="pricing">
            <Card>
                <CardHeader>
                    <CardTitle>Services & Pricing</CardTitle>
                    <CardDescription>
                        Configure the services your facility offers. For detailed pricing, visit the full pricing manager.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 text-center border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground mb-2">Detailed service and pricing management is available.</p>
                        <Button asChild>
                            <Link href="/laundromat/settings/pricing">Go to Pricing Manager</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="operations">
          <div className="space-y-8">
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
        </TabsContent>
         <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payout Information</CardTitle>
              <CardDescription>
                Manage the bank account where you receive earnings from Paystack. This should correspond to your business's country and currency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Select name="bank-code">
                    <SelectTrigger id="bank-name">
                        <SelectValue placeholder="Select your bank"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="058">Guaranty Trust Bank</SelectItem>
                        <SelectItem value="011">First Bank of Nigeria</SelectItem>
                        <SelectItem value="057">Zenith Bank</SelectItem>
                        <SelectItem value="044">Access Bank</SelectItem>
                        <SelectItem value="standard-bank">Standard Bank (South Africa)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input id="account-number" placeholder="Enter account number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Holder Name</Label>
                  <Input id="account-name" placeholder="Name is verified via Paystack" readOnly />
                </div>
                <div className="pt-4">
                  <Button>Save Payout Information</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
           <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Choose who gets notified for important events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6 max-w-lg">
                  <div>
                    <h4 className="font-medium mb-2">Escalation Contacts</h4>
                    <div className="space-y-2">
                        <Label htmlFor="manager-email">Manager Email</Label>
                        <Input id="manager-email" type="email" placeholder="manager@yourlaundry.com" />
                    </div>
                  </div>
                   <Separator />
                  <div>
                     <h4 className="font-medium mb-4">Notification Triggers</h4>
                     <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <Label htmlFor="notify-new-order">New Order Received</Label>
                            <Switch id="notify-new-order" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notify-low-inventory">Low Inventory Alert</Label>
                            <Switch id="notify-low-inventory" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notify-qc-issue">QC Issue Reported</Label>
                            <Switch id="notify-qc-issue" defaultChecked />
                        </div>
                     </div>
                  </div>

                  <div className="pt-4">
                    <Button>Save Notification Settings</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

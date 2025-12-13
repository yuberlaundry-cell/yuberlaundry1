
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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, PlusCircle, Trash2, Settings, AlertTriangle, Mail, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


export default function LaundromatSettingsPage() {
  const [address, setAddress] = useState("100 Laundry Lane, London, UK");
  const [isYocoConnected, setIsYocoConnected] = useState(false);
  const [yocoEnv, setYocoEnv] = useState('sandbox');
  const [yocoPubKey, setYocoPubKey] = useState('');
  const [yocoSecKey, setYocoSecKey] = useState('');

  const { toast } = useToast();

  const handleYocoConnect = (e: React.FormEvent) => {
      e.preventDefault();
      toast({ title: "Connecting to Yoco..."});
      setTimeout(() => {
          if (yocoPubKey && yocoSecKey) {
            setIsYocoConnected(true);
            toast({ title: "Yoco Connected Successfully!" });
          } else {
            toast({ title: "Connection Failed", description: "Please provide both public and secret keys.", variant: "destructive"});
          }
      }, 1000);
  }

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Facility Settings</h1>
        <p className="text-muted-foreground">
          Manage your laundromat's operational details and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
            <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="pricing">Services & Pricing</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Facility Details</CardTitle>
              <CardDescription>
                Update your facility's name, address and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="facility-name">Facility Name</Label>
                  <Input id="facility-name" defaultValue="Main St. Laundry" />
                </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facility-email">Facility Email</Label>
                      <Input id="facility-email" type="email" placeholder="contact@mainlaundry.com" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="facility-phone">Facility Phone</Label>
                      <PhoneNumberInput />
                    </div>
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
         <TabsContent value="pricing" className="mt-4">
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
        <TabsContent value="operations" className="mt-4">
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
                   <div>
                        <h4 className="font-semibold text-base mb-4">Intake Methods</h4>
                         <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="intake-driver" defaultChecked />
                                <Label htmlFor="intake-driver">Enable Driver Drop-off Scans</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="intake-customer" defaultChecked />
                                <Label htmlFor="intake-customer">Enable Customer Drop-off Scans</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="intake-walkin" defaultChecked />
                                <Label htmlFor="intake-walkin">Enable Walk-in Orders</Label>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">These options are limited by the platform-wide settings managed by the Superadmin.</p>
                    </div>
                    <Separator/>
                     <div>
                        <h4 className="font-semibold text-base mb-4">Order Acceptance</h4>
                        <RadioGroup defaultValue="auto" className="space-y-3">
                            <Label htmlFor="accept-auto" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="auto" id="accept-auto"/>
                                <div>
                                    <p className="font-medium">Automatic (Recommended)</p>
                                    <p className="text-sm text-muted-foreground">Automatically accept all new orders assigned to your facility.</p>
                                </div>
                            </Label>
                             <Label htmlFor="accept-manual" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                <RadioGroupItem value="manual" id="accept-manual"/>
                                <div>
                                    <p className="font-medium">Manual</p>
                                    <p className="text-sm text-muted-foreground">You will be notified of new orders and must accept them within the time limit set by the platform.</p>
                                </div>
                            </Label>
                        </RadioGroup>
                    </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-assign" defaultChecked />
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
         <TabsContent value="payouts" className="mt-4">
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
                    <Label htmlFor="payout-country">Payout Country</Label>
                    <Select name="payout-country" required>
                        <SelectTrigger id="payout-country">
                            <SelectValue placeholder="Select a country"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ZA">South Africa</SelectItem>
                            <SelectItem value="NG">Nigeria</SelectItem>
                            <SelectItem value="GH">Ghana</SelectItem>
                            <SelectItem value="KE">Kenya</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">The list of banks will be populated based on the selected country.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Select name="bank-code">
                    <SelectTrigger id="bank-name">
                        <SelectValue placeholder="Select your bank"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard-bank-za">Standard Bank (South Africa)</SelectItem>
                        <SelectItem value="fnb-za">First National Bank (South Africa)</SelectItem>
                        <SelectItem value="absa-za">ABSA (South Africa)</SelectItem>
                        <SelectItem value="gtb-ng">Guaranty Trust Bank (Nigeria)</SelectItem>
                        <SelectItem value="zenith-ng">Zenith Bank (Nigeria)</SelectItem>
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
         <TabsContent value="integrations" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>POS & Payment Integrations</CardTitle>
                    <CardDescription>
                        Connect your POS system to accept in-person payments for walk-in orders.
                    </CardDescription>
                </CardHeader>
                <CardContent className="max-w-lg">
                    {isYocoConnected ? (
                        <div className="space-y-4">
                            <Alert variant="default" className="border-green-300 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertTitle className="text-green-800">Yoco is Connected</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    You are operating in <span className="font-semibold">{yocoEnv}</span> mode.
                                </AlertDescription>
                            </Alert>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setIsYocoConnected(false)}>Edit Settings</Button>
                                <Button variant="destructive" onClick={() => setIsYocoConnected(false)}>Disconnect</Button>
                            </div>
                        </div>

                    ) : (
                        <form className="space-y-6" onSubmit={handleYocoConnect}>
                            <div className="p-4 border rounded-lg flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">Yoco</h3>
                                    <p className="text-sm text-muted-foreground">Accept card payments in-person.</p>
                                </div>
                                <img src="https://www.yoco.com/za/assets/images/logo/logo-blue.svg" alt="Yoco logo" className="h-6" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="yoco-env">Environment</Label>
                                <Select value={yocoEnv} onValueChange={setYocoEnv}>
                                    <SelectTrigger id="yoco-env">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sandbox">Sandbox (Test)</SelectItem>
                                        <SelectItem value="live">Live (Production)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="yoco-pub-key">Public Key</Label>
                                <Input 
                                    id="yoco-pub-key" 
                                    placeholder="pub_test_..."
                                    value={yocoPubKey}
                                    onChange={(e) => setYocoPubKey(e.target.value)} 
                                />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="yoco-sec-key">Secret Key</Label>
                                <Input 
                                    id="yoco-sec-key" 
                                    type="password"
                                    placeholder="sk_test_..."
                                    value={yocoSecKey}
                                    onChange={(e) => setYocoSecKey(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">Save & Connect</Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-4">
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

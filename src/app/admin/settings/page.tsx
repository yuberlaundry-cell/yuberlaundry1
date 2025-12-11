
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Platform Settings</h1>
                <p className="text-muted-foreground">
                    Manage global configurations and integrations.
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="feature-flags">Feature Flags</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 max-w-lg">
                                <div className="space-y-2">
                                    <Label htmlFor="platform-name">Platform Name</Label>
                                    <Input id="platform-name" defaultValue="Yuber Laundry" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="support-email">Support Email</Label>
                                    <Input id="support-email" type="email" defaultValue="support@yuberlaundry.com" />
                                </div>
                                <Button>Save General Settings</Button>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Localization & Units</CardTitle>
                                <CardDescription>Set the default country, currency, and units for the platform.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 max-w-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Default Country</Label>
                                        <Select defaultValue="ZA">
                                            <SelectTrigger id="country">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ZA">South Africa</SelectItem>
                                                <SelectItem value="GB">United Kingdom</SelectItem>
                                                <SelectItem value="US">United States</SelectItem>
                                                <SelectItem value="CA">Canada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Default Currency</Label>
                                        <Select defaultValue="ZAR">
                                            <SelectTrigger id="currency">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ZAR">ZAR (R)</SelectItem>
                                                <SelectItem value="GBP">GBP (£)</SelectItem>
                                                <SelectItem value="USD">USD ($)</SelectItem>
                                                <SelectItem value="CAD">CAD ($)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="locale">Locale</Label>
                                    <Select defaultValue="en-ZA">
                                        <SelectTrigger id="locale">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en-ZA">English (South Africa)</SelectItem>
                                            <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                                            <SelectItem value="en-US">English (United States)</SelectItem>
                                            <SelectItem value="fr-CA">French (Canada)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator/>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="weight-unit">Weight Unit</Label>
                                        <Select defaultValue="kg">
                                            <SelectTrigger id="weight-unit">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                                <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="distance-unit">Distance Unit</Label>
                                        <Select defaultValue="km">
                                            <SelectTrigger id="distance-unit">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="km">Kilometers (km)</SelectItem>
                                                <SelectItem value="miles">Miles (mi)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button>Save Localization Settings</Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                 <TabsContent value="integrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Integrations</CardTitle>
                             <CardDescription>Manage keys and status for third-party services.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 max-w-lg">
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="paystack-toggle" className="text-base font-semibold">Paystack</Label>
                                    <Switch id="paystack-toggle" defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="paystack-public">Public Key</Label>
                                    <Input id="paystack-public" type="text" placeholder="pk_test_xxxxxxxxxxxxxxxx" />
                                    <p className="text-xs text-muted-foreground">Used on the frontend to initiate transactions.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="paystack-secret">Secret Key</Label>
                                    <Input id="paystack-secret" type="password" defaultValue="sk_test_xxxxxxxxxxxxxxxx" />
                                    <p className="text-xs text-muted-foreground">Used on the backend for API requests and webhook verification.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="google-maps-toggle" className="text-base font-semibold">Google Maps</Label>
                                    <Switch id="google-maps-toggle" defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="google-maps-key">API Key</Label>
                                    <Input id="google-maps-key" type="password" defaultValue="AIzaSyxxxxxxxxxxxxxxxx" />
                                    <p className="text-xs text-muted-foreground">Used for address autocomplete, maps, and navigation.</p>
                                </div>
                            </div>

                             <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="twilio-toggle" className="text-base font-semibold">Twilio</Label>
                                    <Switch id="twilio-toggle" defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twilio-sid">Account SID</Label>
                                    <Input id="twilio-sid" type="text" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxx" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twilio-token">Auth Token</Label>
                                    <Input id="twilio-token" type="password" defaultValue="xxxxxxxxxxxxxxxx" />
                                </div>
                            </div>

                            <div className="space-y-4 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="sendgrid-toggle" className="text-base font-semibold">SendGrid</Label>
                                    <Switch id="sendgrid-toggle" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sendgrid-key">API Key</Label>
                                    <Input id="sendgrid-key" type="password" defaultValue="SG.xxxxxxxxxxxxxxxx" />
                                    <p className="text-xs text-muted-foreground">Used for sending transactional emails.</p>
                                </div>
                            </div>
                            
                            <Button>Save Integration Settings</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="feature-flags">
                    <Card>
                        <CardHeader>
                            <CardTitle>Feature Flags</CardTitle>
                            <CardDescription>Enable or disable features across the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                <Label htmlFor="ff-referrals" className="text-base">
                                    Consumer Referral Program
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Enable the refer-a-friend program for consumers.
                                </p>
                                </div>
                                <Switch id="ff-referrals" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                <Label htmlFor="ff-ai-chatbot" className="text-base">
                                    AI Support Chatbot
                                </Label>
                                 <p className="text-sm text-muted-foreground">
                                    Allow users to interact with the GenAI assistant.
                                 </p>
                                </div>
                                <Switch id="ff-ai-chatbot" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="advanced">
                    <Card className="border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Advanced / Danger Zone</CardTitle>
                            <CardDescription>Be careful. These actions can have significant consequences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="font-semibold">Put platform in maintenance mode</p>
                                    <p className="text-sm text-muted-foreground">This will make the consumer and business portals temporarily unavailable.</p>
                                </div>
                                 <Button variant="destructive" className="mt-2 sm:mt-0">Enable Maintenance Mode</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

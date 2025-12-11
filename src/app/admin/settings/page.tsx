
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
                </TabsContent>
                 <TabsContent value="integrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>API Integrations</CardTitle>
                             <CardDescription>Manage keys for third-party services.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 max-w-lg">
                            <div className="space-y-2">
                                <Label htmlFor="paystack-secret">Paystack Secret Key</Label>
                                <Input id="paystack-secret" type="password" defaultValue="sk_test_xxxxxxxxxxxxxxxx" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="google-maps-key">Google Maps API Key</Label>
                                <Input id="google-maps-key" type="password" defaultValue="AIzaSyxxxxxxxxxxxxxxxx" />
                            </div>
                            <Button>Save Integration Keys</Button>
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



'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const featureFlagCategories = {
    "Core Order & Service Features": [
        { id: "next_day_turnaround_enabled", label: "Next-day Turnaround", description: "SA consumers expect next-day or clear time slots.", defaultChecked: true },
        { id: "same_day_turnaround_enabled", label: "Same-day Turnaround", description: "Operationally complex; enable only in dense metros (e.g., JHB North, CPT CBD).", defaultChecked: false },
        { id: "wash_fold_enabled", label: "Wash & Fold Service", description: "Core service for any laundry platform.", defaultChecked: true },
        { id: "dry_clean_enabled", label: "Dry Cleaning Service", description: "Dependent on partner capability in major cities.", defaultChecked: true },
        { id: "ironing_only_enabled", label: "Ironing-Only Service", description: "High-demand service for professionals.", defaultChecked: true },
        { id: "bedding_curtains_enabled", label: "Bedding & Curtains", description: "Fits local demand for households and guesthouses.", defaultChecked: true },
        { id: "eco_wash_enabled", label: "Eco-Wash Options", description: "Good differentiator, but not essential for launch.", defaultChecked: false },
        { id: "subscriptions_enabled", label: "Subscription Plans", description: "Best to enable after establishing a repeat user base.", defaultChecked: false },
    ],
    "Pickup & Delivery Experience": [
        { id: "scheduled_pickup_delivery_enabled", label: "Scheduled Pickup & Delivery Slots", description: "SA users prefer knowing the delivery window.", defaultChecked: true },
        { id: "asap_pickup_enabled", label: "ASAP Pickup Option", description: "Good differentiator in metros; can be off for smaller towns.", defaultChecked: true },
        { id: "contactless_dropoff_enabled", label: "Contactless Drop-off/Pickup", description: "Common expectation, useful for estates/complexes.", defaultChecked: true },
        { id: "multi_address_enabled", label: "Multiple Saved Addresses", description: "Users often switch between home and work.", defaultChecked: true },
    ],
    "Payments (South Africa)": [
        { id: "card_payments_enabled", label: "Card Payments (Paystack)", description: "Primary non-cash method for the formal economy.", defaultChecked: true },
        { id: "instant_eft_enabled", label: "Instant EFT (Paystack)", description: "Hugely popular for online payments in SA.", defaultChecked: true },
        { id: "qr_payments_enabled", label: "QR Code Payments (SnapScan/Zapper)", description: "Widely used in cities, integrated via local gateways.", defaultChecked: true },
        { id: "cash_on_collection_enabled", label: "Cash on Collection", description: "Important backup, but can be configured per city.", defaultChecked: true },
        { id: "in_app_wallet_enabled", label: "In-App Wallet & Top-ups", description: "Adds complexity; best to enable after scaling.", defaultChecked: false },
    ],
    "Tracking & Communication": [
        { id: "driver_live_tracking_enabled", label: "Driver Live Tracking", description: "Great UX, but can be optional if implementation is costly.", defaultChecked: true },
        { id: "basic_status_tracking_enabled", label: "Basic Order Status Tracking", description: "Essential milestones: Picked up, At laundromat, etc.", defaultChecked: true },
        { id: "in_app_chat_enabled", label: "In-App Chat with Driver/Support", description: "Reduces WhatsApp chaos and support load.", defaultChecked: true },
        { id: "call_driver_enabled", label: "Call Driver Feature", description: "Very useful in gated estates and complexes.", defaultChecked: true },
        { id: "sms_notifications_enabled", label: "SMS Notifications for Key Steps", description: "Crucial for users with limited data.", defaultChecked: true },
        { id: "push_notifications_enabled", label: "Push Notifications", description: "For app users with reliable data/Wi-Fi.", defaultChecked: true },
    ],
    "Quality, Photos & Dispute Handling": [
        { id: "pickup_photo_required", label: "Require Photo on Pickup", description: "Reduces 'you never collected' disputes.", defaultChecked: true },
        { id: "dropoff_photo_required", label: "Require Photo on Contactless Drop-off", description: "Useful for 'leave at door' in secure estates.", defaultChecked: true },
        { id: "item_level_entry_enabled", label: "Item-level Entry at Intake", description: "Start with bag-level; add for premium/B2B later.", defaultChecked: false },
        { id: "rating_prompt_enabled", label: "Post-Order Rating Prompt", description: "Provides free, simple insight into partner/driver quality.", defaultChecked: true },
    ],
    "B2B & Commercial Add-ons": [
        { id: "business_accounts_enabled", label: "Business Accounts", description: "Enable the B2B portal; pilot once B2C is stable.", defaultChecked: false },
        { id: "invoice_billing_enabled", label: "Invoice Billing for B2B", description: "Tied to business accounts for corporate clients.", defaultChecked: false },
        { id: "priority_sla_enabled", label: "Priority SLAs for B2B", description: "Only enable when operations can reliably prioritize B2B.", defaultChecked: false },
    ]
};


export default function SettingsPage() {
     const { toast } = useToast();

    const handleSave = (section: string) => {
        toast({
            title: `${section} Settings Saved`,
            description: "Your changes have been successfully saved.",
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Platform Settings</h1>
                <p className="text-muted-foreground">
                    Manage global configurations and integrations.
                </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="integrations">Integrations</TabsTrigger>
                        <TabsTrigger value="feature-flags">Feature Flags</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <TabsContent value="general" className="mt-4">
                    <div className="space-y-6">
                        <Card>
                             <form onSubmit={(e) => {e.preventDefault(); handleSave('General')}}>
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
                                    <Button type="submit">Save General Settings</Button>
                                </CardContent>
                            </form>
                        </Card>
                         <Card>
                             <form onSubmit={(e) => {e.preventDefault(); handleSave('Localization')}}>
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
                                    <div className="space-y-2">
                                        <Label htmlFor="phone-country">Default Country for Phone</Label>
                                        <Select defaultValue="ZA">
                                            <SelectTrigger id="phone-country">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ZA">South Africa (+27)</SelectItem>
                                                <SelectItem value="GB">United Kingdom (+44)</SelectItem>
                                                <SelectItem value="US">United States (+1)</SelectItem>
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
                                    <Button type="submit">Save Localization Settings</Button>
                                </CardContent>
                            </form>
                        </Card>
                    </div>
                </TabsContent>
                 <TabsContent value="integrations" className="mt-4">
                     <form onSubmit={(e) => {e.preventDefault(); handleSave('Integrations')}}>
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
                                        <Label htmlFor="onesignal-toggle" className="text-base font-semibold">OneSignal</Label>
                                        <Switch id="onesignal-toggle" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="onesignal-app-id">App ID</Label>
                                        <Input id="onesignal-app-id" type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="onesignal-api-key">REST API Key</Label>
                                        <Input id="onesignal-api-key" type="password" defaultValue="xxxxxxxxxxxxxxxxxxxxxxxx" />
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
                                
                                <Button type="submit">Save Integration Settings</Button>
                            </CardContent>
                        </Card>
                     </form>
                </TabsContent>
                <TabsContent value="feature-flags" className="mt-4">
                     <form onSubmit={(e) => {e.preventDefault(); handleSave('Feature Flag')}}>
                        <div className="space-y-6">
                            {Object.entries(featureFlagCategories).map(([category, flags]) => (
                                <Card key={category}>
                                    <CardHeader>
                                        <CardTitle>{category}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {flags.map(flag => (
                                            <div key={flag.id} className="flex items-start justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <Label htmlFor={flag.id} className="text-base">
                                                        {flag.label}
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        {flag.description}
                                                    </p>
                                                </div>
                                                <Switch id={flag.id} defaultChecked={flag.defaultChecked} />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            ))}
                             <div className="flex justify-end">
                                <Button type="submit">Save All Feature Flags</Button>
                            </div>
                        </div>
                     </form>
                </TabsContent>
                <TabsContent value="advanced" className="mt-4">
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

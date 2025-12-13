
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import { AddressInput } from "@/components/ui/address-input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function BillingSettingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [address, setAddress] = useState('456 Corporate Ave, London, EC2R 8DE');
    
    const handleSave = (section: string) => (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Settings Saved',
            description: `Your ${section.toLowerCase()} have been updated.`
        });
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Billing Settings</h1>
                <p className="text-muted-foreground">Manage your company's billing address and notification preferences.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Billing Details</CardTitle>
                    <CardDescription>
                        This address appears on your invoices.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6 max-w-lg" onSubmit={handleSave('Billing Details')}>
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" defaultValue={user?.companyName} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tax-id">Tax ID / VAT Number (Optional)</Label>
                            <Input id="tax-id" placeholder="e.g., GB123456789" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Billing Address</Label>
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
                        <div className="pt-2">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Invoice Notifications</CardTitle>
                    <CardDescription>
                        Choose who should receive billing-related emails.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6 max-w-lg" onSubmit={handleSave('Notification Settings')}>
                        <div className="space-y-2">
                            <Label>Primary Recipients</Label>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="admin-email" defaultChecked />
                                <label
                                    htmlFor="admin-email"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {user?.email} (Primary Admin)
                                </label>
                            </div>
                        </div>
                        <Separator />
                         <div className="space-y-2">
                            <Label htmlFor="additional-recipients">Additional Recipients</Label>
                            <p className="text-sm text-muted-foreground">Add other email addresses to receive invoices, separated by commas.</p>
                            <Input id="additional-recipients" placeholder="e.g., accounting@acmecorp.com" />
                        </div>

                        <div className="pt-2">
                            <Button type="submit">Save Notification Settings</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

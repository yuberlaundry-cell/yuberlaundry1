
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";

export default function BusinessSettingsPage() {
    const { user } = useAuth();
    
    return (
        <div className="space-y-8 pb-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Company Settings</h1>
                <p className="text-muted-foreground">Manage your company's profile, preferences, and billing.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Company Profile</CardTitle>
                    <CardDescription>Update your company's information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" defaultValue={user?.companyName} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="company-address">Company Address</Label>
                            <Input id="company-address" placeholder="e.g., 456 Corporate Ave, London" />
                        </div>
                        <div className="pt-4">
                            <Button>Save Profile</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Laundry Preferences</CardTitle>
                    <CardDescription>Set default preferences for all company orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6 max-w-lg">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="detergent">Default Detergent</Label>
                                <Select defaultValue="standard">
                                    <SelectTrigger id="detergent" className="w-[200px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard</SelectItem>
                                        <SelectItem value="hypoallergenic">Hypoallergenic</SelectItem>
                                        <SelectItem value="eco-friendly">Eco-friendly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="water-temp">Default Water Temperature</Label>
                                <Select defaultValue="warm">
                                    <SelectTrigger id="water-temp" className="w-[200px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cold">Cold</SelectItem>
                                        <SelectItem value="warm">Warm</SelectItem>
                                        <SelectItem value="hot">Hot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <Separator />
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Switch id="employee-notes" />
                                <Label htmlFor="employee-notes">
                                Allow employees to add notes to their own orders.
                                </Label>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button>Save Preferences</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

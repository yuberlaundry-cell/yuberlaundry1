
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Palette, Text, Link as LinkIcon } from 'lucide-react';
import { platformName, appStoreLinks } from '@/lib/branding';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BrandingSettingsPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Branding settings saved!",
            description: "Your platform's branding has been updated.",
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Branding</h1>
                <p className="text-muted-foreground">
                    Manage your platform's name, logos, colors, fonts, and app store links.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Platform Name</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue={platformName} />
                        <p className="text-xs text-muted-foreground">This name will be displayed throughout the application, including the copyright notice.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Palette/> Theme Colors</CardTitle>
                    <CardDescription>Customize the look and feel of your application. Click a color to change it.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        <ColorInput label="Background" defaultValue="#f0f2f7" />
                        <ColorInput label="Foreground" defaultValue="#09090b" />
                        <ColorInput label="Card" defaultValue="#ffffff" />
                        <ColorInput label="Primary" defaultValue="#4975f5" />
                        <ColorInput label="Primary Foreground" defaultValue="#f0f2f7" />
                        <ColorInput label="Secondary" defaultValue="#f1f5f9" />
                        <ColorInput label="Accent" defaultValue="#7149f5" />
                        <ColorInput label="Destructive" defaultValue="#ef4444" />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Text/> Fonts</CardTitle>
                    <CardDescription>Select the typography for headlines and body text.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="headline-font">Headline Font</Label>
                         <Select defaultValue="space-grotesk">
                            <SelectTrigger id="headline-font"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="space-grotesk">Space Grotesk</SelectItem>
                                <SelectItem value="plus-jakarta-sans">Plus Jakarta Sans</SelectItem>
                                <SelectItem value="onest">Onest</SelectItem>
                                <SelectItem value="geist-sans">Geist Sans</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="body-font">Body Font</Label>
                         <Select defaultValue="inter">
                            <SelectTrigger id="body-font"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inter">Inter</SelectItem>
                                <SelectItem value="geist-sans">Geist Sans</SelectItem>
                                <SelectItem value="onest">Onest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Logo & Favicon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="logo-upload">Logo</Label>
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-muted">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <Input id="logo-upload" type="file" className="max-w-xs" />
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended: SVG or PNG, transparent background, at least 256x256px.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="favicon-upload">Favicon</Label>
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-muted">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <Input id="favicon-upload" type="file" className="max-w-xs" />
                        </div>
                        <p className="text-xs text-muted-foreground">Recommended: ICO or PNG file, 32x32px.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LinkIcon/> App Store Links</CardTitle>
                    <CardDescription>Enter the URLs for your mobile apps.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-semibold">Consumer App</h4>
                        <div className="space-y-2">
                            <Label htmlFor="consumer-apple-url">Apple App Store URL</Label>
                            <Input id="consumer-apple-url" placeholder="https://apps.apple.com/..." defaultValue={appStoreLinks.consumer.apple} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="consumer-google-url">Google Play Store URL</Label>
                            <Input id="consumer-google-url" placeholder="https://play.google.com/store/apps/..." defaultValue={appStoreLinks.consumer.google}/>
                        </div>
                    </div>
                     <div className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-semibold">Driver App</h4>
                        <div className="space-y-2">
                            <Label htmlFor="driver-apple-url">Apple App Store URL</Label>
                            <Input id="driver-apple-url" placeholder="https://apps.apple.com/..." defaultValue={appStoreLinks.driver.apple} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="driver-google-url">Google Play Store URL</Label>
                            <Input id="driver-google-url" placeholder="https://play.google.com/store/apps/..." defaultValue={appStoreLinks.driver.google}/>
                        </div>
                    </div>
                     <div className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-semibold">Laundromat App</h4>
                        <div className="space-y-2">
                            <Label htmlFor="laundromat-apple-url">Apple App Store URL</Label>
                            <Input id="laundromat-apple-url" placeholder="https://apps.apple.com/..." defaultValue={appStoreLinks.laundromat.apple} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="laundromat-google-url">Google Play Store URL</Label>
                            <Input id="laundromat-google-url" placeholder="https://play.google.com/store/apps/..." defaultValue={appStoreLinks.laundromat.google}/>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit">Save Branding Settings</Button>
            </div>
        </form>
    );
}

function ColorInput({ label, defaultValue }: { label: string; defaultValue: string }) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex items-center gap-2">
                <Input type="color" defaultValue={defaultValue} className="w-10 h-10 p-1" />
                <Input defaultValue={defaultValue} className="font-mono text-xs" />
            </div>
        </div>
    );
}

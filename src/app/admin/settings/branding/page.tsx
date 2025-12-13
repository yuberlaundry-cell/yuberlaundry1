
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { platformName, appStoreLinks } from '@/lib/branding';

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
                    Manage your platform's logo, colors, and name.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Platform Name</CardTitle>
                    <CardDescription>This name will be displayed throughout the application, including the copyright notice in the footer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue={platformName} />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the look and feel of your application by changing the theme colors. HSL format is recommended.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="primary-color">Primary</Label>
                            <Input id="primary-color" defaultValue="256 89% 63%" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="background-color">Background</Label>
                            <Input id="background-color" defaultValue="220 33% 97%" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accent-color">Accent</Label>
                            <Input id="accent-color" defaultValue="256 89% 63%" />
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Logo & Favicon</CardTitle>
                    <CardDescription>Upload your company logo and browser favicon.</CardDescription>
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
                        <p className="text-xs text-muted-foreground">Recommended: ICO or PNG file, 32x32px or 64x64px.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>App Store Links</CardTitle>
                    <CardDescription>Enter the URLs for your mobile apps in the Apple App Store and Google Play Store.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="app-store-url">Apple App Store URL</Label>
                        <Input id="app-store-url" placeholder="https://apps.apple.com/..." defaultValue={appStoreLinks.apple} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="play-store-url">Google Play Store URL</Label>
                        <Input id="play-store-url" placeholder="https://play.google.com/store/apps/..." defaultValue={appStoreLinks.google}/>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit">Save Branding Settings</Button>
            </div>
        </form>
    );
}

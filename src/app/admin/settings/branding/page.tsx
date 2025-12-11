
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

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
                    Manage your platform's logo, favicon, and name.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Platform Name</CardTitle>
                    <CardDescription>This name will be displayed throughout the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="Yuber Laundry" />
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

            <div className="flex justify-end">
                <Button type="submit">Save Branding Settings</Button>
            </div>
        </form>
    );
}

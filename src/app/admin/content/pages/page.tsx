
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function PagesContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent, page: string) => {
        e.preventDefault();
        toast({
            title: `${page} page saved!`,
            description: "Your changes have been successfully saved.",
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Static Pages</h1>
                <p className="text-muted-foreground">
                    Manage the content of your site's static pages like Privacy Policy and Terms.
                </p>
            </div>

            <form onSubmit={(e) => handleSubmit(e, 'Privacy Policy')}>
                 <Card>
                    <CardHeader>
                        <CardTitle>Privacy Policy</CardTitle>
                        <CardDescription>Edit the content for your privacy policy page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea 
                            defaultValue="Your privacy is important to us. This privacy statement explains the personal data Yuber Laundry processes, how Yuber Laundry processes it, and for what purposes."
                            rows={10}
                        />
                        <Button type="submit">Save Privacy Policy</Button>
                    </CardContent>
                </Card>
            </form>
            
            <form onSubmit={(e) => handleSubmit(e, 'Terms of Service')}>
                <Card>
                    <CardHeader>
                        <CardTitle>Terms of Service</CardTitle>
                        <CardDescription>Edit the content for your terms of service page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            defaultValue="Please read these terms and conditions carefully before using Our Service."
                            rows={10}
                        />
                         <Button type="submit">Save Terms of Service</Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}

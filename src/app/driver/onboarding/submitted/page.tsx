
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationSubmittedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                     <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-green-100 text-green-700">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold font-headline">Application Submitted!</CardTitle>
                    <CardDescription>
                        Thank you for applying. We're reviewing your information and will notify you via email as soon as your account is approved.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">This usually takes 1-2 business days.</p>
                    <Button asChild className="mt-6 w-full">
                        <Link href="/">Return to Homepage</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

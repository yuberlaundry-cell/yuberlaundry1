
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BookingHeader } from "./booking-header";

interface BookingLayoutProps {
    stepTitle: string;
    stepDescription: string;
    children: React.ReactNode;
    nextHref: string;
    backHref: string;
    nextButtonText?: string;
    isNextDisabled?: boolean;
}

export function BookingLayout({ stepTitle, stepDescription, children, nextHref, backHref, nextButtonText = 'Continue', isNextDisabled }: BookingLayoutProps) {
    return (
        <>
            <BookingHeader />
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-headline">{stepTitle}</h1>
                        <p className="text-muted-foreground mt-2">{stepDescription}</p>
                    </div>
                    <Card>
                        <CardContent className="p-6 md:p-8">
                            {children}
                        </CardContent>
                    </Card>
                    <div className="mt-8 flex justify-between items-center">
                        <Button variant="ghost" asChild>
                            <Link href={backHref}>Go Back</Link>
                        </Button>
                        <Button asChild disabled={isNextDisabled}>
                            <Link href={nextHref}>{nextButtonText}</Link>
                        </Button>
                    </div>
                </div>
            </main>
        </>
    )
}

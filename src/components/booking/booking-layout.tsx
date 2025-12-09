import React from "react";
import { BookingHeader } from "./booking-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface BookingLayoutProps {
    children: React.ReactNode;
    stepTitle: string;
    stepDescription: string;
    nextHref: string;
    backHref: string;
    isNextDisabled?: boolean;
    nextButtonText?: string;
    hideFooter?: boolean;
}

export function BookingLayout({ children, stepTitle, stepDescription, nextHref, backHref, isNextDisabled = false, nextButtonText = "Next", hideFooter = false }: BookingLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <BookingHeader />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl md:text-3xl">{stepTitle}</CardTitle>
                            <CardDescription>{stepDescription}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {children}
                        </CardContent>
                        {!hideFooter && (
                             <CardFooter className="flex justify-between border-t px-6 py-4">
                                <Button variant="outline" asChild>
                                    <Link href={backHref}>Back</Link>
                                </Button>
                                <Button asChild disabled={isNextDisabled}>
                                    <Link href={nextHref}>{nextButtonText}</Link>
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    )
}

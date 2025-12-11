
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function InvoiceCard() {
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Downloading Invoice...",
            description: "Your invoice PDF is being generated.",
        });
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <div>
                        <h3 className="font-semibold">Order Complete</h3>
                        <p className="text-sm text-muted-foreground">Total Paid: $25.50 on May 12</p>
                    </div>
                </div>
                <Button className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download Invoice
                </Button>
            </CardContent>
        </Card>
    );
}

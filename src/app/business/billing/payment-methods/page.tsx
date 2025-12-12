
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, MoreVertical, PlusCircle, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { usePaystackPayment } from 'react-paystack';
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
    { id: 'pm_1', brand: 'Visa', last4: '4242', expiry: '12/26', isPrimary: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '5555', expiry: '08/25', isPrimary: false },
]

function AddCardForm() {
    const { user } = useAuth();
    const { toast } = useToast();

    const config = {
        reference: (new Date()).getTime().toString(),
        email: user?.email || '',
        amount: 0, // Amount is 0 for card authorization
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = (reference: any) => {
        console.log('Paystack Authorization Success:', reference);
        toast({
            title: "Card Added Successfully",
            description: "The new payment method has been saved for your company.",
        });
    };

    const onClose = () => {
        console.log('Paystack modal closed.');
    };
    
    return (
        <Button 
            onClick={() => {
                initializePayment({onSuccess, onClose});
            }}
            className="w-full"
        >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Card Securely
        </Button>
    )
}

export default function PaymentMethodsPage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Payment Methods</h1>
                    <p className="text-muted-foreground">Manage your company's saved payment options via Paystack.</p>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Card
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a New Payment Method</DialogTitle>
                            <DialogDescription>
                                This card will be used for monthly invoices. Your details are securely stored with Paystack.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="pt-4">
                           <AddCardForm />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Saved Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <CreditCard className="h-8 w-8 text-muted-foreground" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{method.brand} ending in {method.last4}</p>
                                        {method.isPrimary && <Badge>Primary</Badge>}
                                    </div>
                                    <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {!method.isPrimary && <DropdownMenuItem>Set as Primary</DropdownMenuItem>}
                                    <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

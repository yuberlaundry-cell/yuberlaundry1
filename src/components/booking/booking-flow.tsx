

'use client';

import { useState } from "react";
import { OrderSummary } from "./order-summary";
import { Button } from "../ui/button";
import AddressStep from "./steps/address-step";
import ScheduleStep from "./steps/schedule-step";
import ServicesStep from "./steps/services-step";
import InstructionsStep from "./steps/instructions-step";
import ReviewStep from "./steps/review-step";
import ConfirmationStep from "./steps/confirmation-step";
import { Loader2, ShieldQuestion } from "lucide-react";
import { Progress } from "../ui/progress";
import PaystackPop from "@paystack/inline-js";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const steps = [
    { id: 1, title: "Address" },
    { id: 2, title: "Schedule" },
    { id: 3, title: "Services" },
    { id: 4, title: "Instructions" },
    { id: 5, title: "Review & Pay" }
];

export function BookingFlow() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const goToNextStep = () => setCurrentStep(prev => (prev < steps.length ? prev + 1 : prev));
    const goToPrevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
    
    const handlePlaceOrder = () => {
        setIsProcessing(true);

        setTimeout(() => {
            const paystack = new PaystackPop();
            paystack.newTransaction({
                key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '', 
                email: user?.email || 'guest@example.com',
                amount: 4600, 
                currency: 'ZAR',
                reference: `yuber_${Math.random().toString(36).substring(7)}`,
                onSuccess: (transaction) => {
                    setIsProcessing(false);
                    // Instead of just setting complete, we redirect
                    // This gives a cleaner UX and a permanent URL for the order
                    const newOrderId = transaction.reference.replace('yuber_', '');
                    router.push(`/app/orders/${newOrderId}`);
                    // You might want to also close the dialog here if it's a modal
                    // This part depends on how the dialog is controlled from the parent component
                },
                onClose: () => {
                    setIsProcessing(false);
                    toast({
                        title: "Order Not Placed",
                        description: "The payment process was not completed.",
                        variant: "destructive",
                    });
                },
            });
        }, 1000);
    }

    if (isComplete) {
        // This component may no longer be needed if we redirect on success
        return <ConfirmationStep />;
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <AddressStep />;
            case 2:
                return <ScheduleStep />;
            case 3:
                return <ServicesStep />;
            case 4:
                return <InstructionsStep />;
            case 5:
                return <ReviewStep isProcessing={isProcessing} />;
            default:
                return <AddressStep />;
        }
    };
    
    const progress = (currentStep / steps.length) * 100;

    return (
        <>
            <div className="md:col-span-2 p-4 md:p-8 flex-1 overflow-y-auto pb-24 md:pb-6">
                <div className="max-w-xl mx-auto pb-24 md:pb-0">
                   {renderStepContent()}
                </div>
            </div>
            <div className="hidden md:flex md:col-span-1 bg-muted/50 p-8 border-l flex-col">
                <div className="flex-grow overflow-y-auto">
                    <div className="space-y-2 mb-8">
                        <p className="text-sm font-medium">Step {currentStep} of {steps.length}</p>
                        <Progress value={progress} />
                    </div>
                    <OrderSummary />
                </div>
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                    {currentStep > 1 ? (
                         <Button variant="ghost" onClick={goToPrevStep}>Go Back</Button>
                    ) : <div></div>}
                    
                    {currentStep < steps.length ? (
                         <Button onClick={goToNextStep}>Continue</Button>
                    ) : (
                        <Button onClick={handlePlaceOrder} size="lg" className="font-semibold" disabled={isProcessing}>
                           {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <ShieldQuestion className="mr-2 h-4 w-4" />
                                    Place Order with Paystack
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
            {/* Mobile Footer */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4">
                 <div className="flex justify-between items-center">
                    {currentStep > 1 ? (
                         <Button variant="ghost" onClick={goToPrevStep}>Go Back</Button>
                    ) : <div></div>}
                    
                    {currentStep < steps.length ? (
                         <Button onClick={goToNextStep}>Continue</Button>
                    ) : (
                        <Button onClick={handlePlaceOrder} className="font-semibold w-full" disabled={isProcessing}>
                             {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

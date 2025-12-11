
'use client';

import { useState } from "react";
import { OrderSummary } from "./order-summary";
import { Button } from "../ui/button";
import AddressStep from "./steps/address-step";
import ScheduleStep from "./steps/schedule-step";
import ServicesStep from "./steps/services-step";
import InstructionsStep from "./steps/instructions-step";
import ReviewStep from "./steps/review-step";
import ConfirmationStep from "@/app/app/book/confirmation/page";
import { ShieldQuestion } from "lucide-react";
import { Progress } from "../ui/progress";

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

    const goToNextStep = () => setCurrentStep(prev => (prev < steps.length ? prev + 1 : prev));
    const goToPrevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
    
    const handlePlaceOrder = () => {
        setIsComplete(true);
    }

    if (isComplete) {
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
                return <ReviewStep />;
            default:
                return <AddressStep />;
        }
    };
    
    const progress = (currentStep / steps.length) * 100;

    return (
        <>
            <div className="col-span-3 md:col-span-2 p-4 md:p-8 overflow-y-auto">
                <div className="max-w-xl mx-auto">
                   {renderStepContent()}
                </div>
            </div>
            <div className="hidden md:block md:col-span-1 bg-muted/50 p-8 overflow-y-auto border-l flex flex-col">
                <div className="flex-grow">
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
                        <Button onClick={handlePlaceOrder} size="lg" className="font-semibold">
                            <ShieldQuestion className="mr-2 h-4 w-4" /> Place Order with Paystack
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
                        <Button onClick={handlePlaceOrder} className="font-semibold">
                            Place Order
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

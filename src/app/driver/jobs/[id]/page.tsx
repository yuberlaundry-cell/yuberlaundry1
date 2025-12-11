
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, MapPin, Phone, QrCode, ScanLine, Truck, Package, Navigation, Camera, MessageSquare, Signature } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const jobData = {
    'PU-123': {
        id: 'PU-123',
        type: 'Pickup',
        customer: 'Jane Doe',
        phone: '+44 7123 456789',
        address: '123 Main St, London, SW1A 0AA',
        time: '12:00 - 14:00',
        status: 'Assigned',
        notes: 'Gate code is #1234. Beware of the small dog.'
    },
    'DO-456': {
        id: 'DO-456',
        type: 'Delivery',
        customer: 'John Smith',
        phone: '+44 7987 654321',
        address: '456 Business Rd, London, EC1A 1BB',
        time: '16:00 - 18:00',
        status: 'Out for Delivery',
        notes: 'Leave with the concierge if not home.'
    }
};

const pickupSteps = [
    { id: 'navigate', label: 'Start Navigation', actionLabel: 'Start Navigation' },
    { id: 'arrive', label: 'Arrive at Pickup', actionLabel: 'Confirm Arrival' },
    { id: 'scan', label: 'Scan Bag QR Code', actionLabel: 'Scan Code', icon: QrCode },
    { id: 'photo', label: 'Take Photo of Items', actionLabel: 'Take Photo', icon: Camera },
    { id: 'confirm', label: 'Confirm Items Collected', actionLabel: 'Confirm Pickup' },
];

const deliverySteps = [
    { id: 'navigate', label: 'Start Navigation', actionLabel: 'Start Navigation' },
    { id: 'arrive', label: 'Arrive at Delivery', actionLabel: 'Confirm Arrival' },
    { id: 'photo', label: 'Photo Confirmation', actionLabel: 'Take Photo', icon: Camera },
    { id: 'signature', label: 'Signature', actionLabel: 'Capture Signature', icon: Signature },
    { id: 'confirm', label: 'Confirm Handover', actionLabel: 'Confirm Delivery' },
];


export default function JobDetailsPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const params = useParams();
    const jobId = params.id as keyof typeof jobData;
    const job = jobData[jobId] || jobData['PU-123'];
    const workflowSteps = job.type === 'Pickup' ? pickupSteps : deliverySteps;

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'scan' | 'photo' | 'signature' | null>(null);

    const openModal = (type: 'scan' | 'photo' | 'signature') => {
        setModalContent(type);
        setModalOpen(true);
    }
    
    useEffect(() => {
        if (isModalOpen && (modalContent === 'scan' || modalContent === 'photo') && hasCameraPermission !== false) {
            const getCameraPermission = async () => {
                if (hasCameraPermission) return;
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({video: true});
                    setHasCameraPermission(true);
            
                    if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error('Error accessing camera:', error);
                    setHasCameraPermission(false);
                }
            };
            getCameraPermission();
        }
      }, [isModalOpen, modalContent, hasCameraPermission]);


    const handleNextStep = () => {
        if (currentStep < workflowSteps.length -1) {
            setCurrentStep(currentStep + 1);
        } else {
            setCurrentStep(workflowSteps.length);
        }
    }
    
    const renderActionButton = (step: typeof workflowSteps[0]) => {
        const ActionIcon = step.icon;

        if (step.id === 'scan' || step.id === 'photo' || step.id === 'signature') {
             return (
                <Button className="mt-2 w-full" onClick={() => openModal(step.id as 'scan' | 'photo' | 'signature')}>
                    {ActionIcon && <ActionIcon className="mr-2" />} {step.actionLabel}
                </Button>
            );
        }

        return <Button className="mt-2 w-full" onClick={handleNextStep}>{step.actionLabel}</Button>
    }

    const renderModalContent = () => {
        switch (modalContent) {
            case 'scan':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Scan QR Code</DialogTitle>
                            <DialogDescription>
                                Center the QR code on the customer's bag in the frame.
                            </DialogDescription>
                        </DialogHeader>
                         <div className="relative w-full aspect-square bg-black rounded-lg flex items-center justify-center overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            <div className="absolute top-8 bottom-8 left-8 right-8 border-4 border-dashed border-gray-400 rounded-lg"/>
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-background/95">
                                    <Alert variant="destructive">
                                        <Camera className="h-4 w-4" />
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>
                                            Please enable camera permissions to use the scanner.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => { handleNextStep(); setModalOpen(false); }}>Confirm Scan</Button>
                    </>
                );
            case 'photo':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Capture Photo</DialogTitle>
                            <DialogDescription>
                                Take a photo of the items at the location.
                            </DialogDescription>
                        </DialogHeader>
                          <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                             {hasCameraPermission === false && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-background/95">
                                    <Alert variant="destructive">
                                        <Camera className="h-4 w-4" />
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>
                                            Please enable camera permissions to take a photo.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => { handleNextStep(); setModalOpen(false); }}>Capture</Button>
                    </>
                );
            case 'signature':
                 return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Capture Signature</DialogTitle>
                            <DialogDescription>
                                Ask the customer to sign on the screen to confirm delivery.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground italic">Signature pad placeholder</p>
                        </div>
                        <Button onClick={() => { handleNextStep(); setModalOpen(false); }}>Confirm Signature</Button>
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <div className="space-y-6 pb-16">
             <Button variant="ghost" asChild className="-ml-4">
                <Link href="/driver/jobs">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to jobs list
                </Link>
            </Button>
            <div>
                <h1 className="text-2xl font-bold font-headline">Job Details</h1>
                <p className="text-muted-foreground">Order ID: {job.id}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {job.type === 'Pickup' ? <Package /> : <Truck />}
                                {job.type} Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="font-semibold">{job.customer}</p>
                                <p className="text-muted-foreground text-sm">{job.time}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground"/>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    {job.address}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground"/>
                                <a href={`tel:${job.phone}`} className="text-primary hover:underline">{job.phone}</a>
                            </div>
                            {job.notes && (
                                <div className="flex items-start gap-3">
                                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-1"/>
                                    <p className="text-sm italic text-muted-foreground bg-muted p-2 rounded-md border">{job.notes}</p>
                                </div>
                            )}
                            <Button variant="outline" className="w-full" asChild>
                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(job.address)}`} target="_blank" rel="noopener noreferrer">
                                    <Navigation className="mr-2"/> Open in Maps
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Card className="md:sticky top-24">
                     <CardHeader>
                        <CardTitle>Job Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ol className="space-y-4">
                            {workflowSteps.map((step, index) => (
                                <li key={step.id} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center self-stretch">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                            {index < currentStep ? <Check /> : (index === currentStep ? <ScanLine /> : index + 1)}
                                        </div>
                                        {index < workflowSteps.length -1 && <div className={`w-px flex-1 my-1 ${index < currentStep ? 'bg-primary' : 'bg-border'}`} />}
                                    </div>
                                    <div className="flex-1 pt-1.5">
                                        <p className={`font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                                        
                                        {index === currentStep && renderActionButton(step)}
                                        
                                    </div>
                                </li>
                            ))}
                        </ol>
                        {currentStep === workflowSteps.length && (
                             <div className="mt-6 flex items-center gap-3 rounded-lg border border-green-500 bg-green-50 p-4 text-green-800">
                                <Check className="h-6 w-6" />
                                <div>
                                    <h4 className="font-semibold">{job.type} Complete!</h4>
                                    <p className="text-sm">This job has been marked as completed.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
             <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                   {renderModalContent()}
                </DialogContent>
            </Dialog>
        </div>
    )
}

    
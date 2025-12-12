
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, MapPin, Phone, QrCode, Truck, Package, Navigation, Camera, MessageSquare, Signature, Building, Ban, UserX } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
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
        notes: 'Gate code is #1234. Beware of the small dog.',
        laundromatAddress: 'Speedy Suds, 45 Crisp St, London'
    },
    'DO-456': {
        id: 'DO-456',
        type: 'Delivery',
        customer: 'John Smith',
        phone: '+44 7987 654321',
        address: '456 Business Rd, London, EC1A 1BB',
        time: '16:00 - 18:00',
        status: 'Out for Delivery',
        notes: 'Leave with the concierge if not home.',
        laundromatAddress: 'Speedy Suds, 45 Crisp St, London'
    },
    'PU-124': {
        id: 'PU-124',
        type: 'Pickup',
        customer: 'Michael Scott',
        phone: '+44 7777 555555',
        address: '888 Park Ave, London',
        time: 'ASAP',
        status: 'Assigned',
        notes: 'Call upon arrival.',
        laundromatAddress: 'Fresh Folds, 12 Laundry Lane, London'
    }
};

const pickupSteps = [
    { id: 'navigate', label: 'Start Navigation to Customer', actionLabel: 'Start Navigation' },
    { id: 'arrive', label: 'Arrive at Pickup', actionLabel: 'Confirm Arrival' },
    { id: 'scan_photo', label: 'Scan Bags or Take Photo', actionLabel: 'Scan/Photograph Items', icon: Camera },
    { id: 'confirm_collection', label: 'Confirm Items Collected', actionLabel: 'Confirm Collection' },
    { id: 'navigate_laundromat', label: 'Deliver to Laundromat', actionLabel: 'Navigate to Laundromat' },
    { id: 'confirm_handoff', label: 'Confirm Laundromat Handoff', actionLabel: 'Confirm Handoff' },
];

const deliverySteps = [
    { id: 'navigate', label: 'Navigate to Customer', actionLabel: 'Start Navigation' },
    { id: 'arrive', label: 'Arrive at Delivery', actionLabel: 'Confirm Arrival' },
    { id: 'confirm_or_fail', label: 'Confirm Handover / Mark Incomplete', actionLabel: 'Confirm Handover', icon: Signature },
    { id: 'complete', label: 'Job Complete', actionLabel: '' },
    { id: 'return_to_laundromat', label: 'Return Items to Laundromat', actionLabel: 'Navigate to Laundromat' },
    { id: 'confirm_return_handoff', label: 'Confirm Laundromat Return', actionLabel: 'Confirm Handoff' },
];


export default function JobDetailsPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const params = useParams();
    const router = useRouter();
    const jobId = params.id as keyof typeof jobData;
    const job = jobData[jobId] || jobData['PU-123'];
    const workflowSteps = job.type === 'Pickup' ? pickupSteps : deliverySteps;
    const [deliveryFailed, setDeliveryFailed] = useState(false);

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<'scan_photo' | 'photo' | 'signature' | null>(null);

    const openModal = (type: 'scan_photo' | 'photo' | 'signature') => {
        setModalContent(type);
        setModalOpen(true);
    }
    
    useEffect(() => {
        if (isModalOpen && (modalContent === 'scan_photo' || modalContent === 'photo')) {
          const getCameraPermission = async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
      }, [isModalOpen, modalContent]);


    const handleNextStep = () => {
        const nextStepIndex = currentStep + 1;
        
        // Logic for Delivery workflow
        if (job.type === 'Delivery') {
            const currentStepId = workflowSteps[currentStep].id;

            if (deliveryFailed) {
                if (currentStepId === 'confirm_or_fail') {
                    setCurrentStep(workflowSteps.findIndex(s => s.id === 'return_to_laundromat'));
                    return;
                }
            } else {
                 if (currentStepId === 'confirm_or_fail') {
                    setCurrentStep(workflowSteps.findIndex(s => s.id === 'complete'));
                    return;
                }
            }
        }


        if (currentStep < workflowSteps.length -1) {
            setCurrentStep(nextStepIndex);
        } else {
            setCurrentStep(workflowSteps.length);
             toast({
                title: 'Job Complete!',
                description: `${job.id} has been marked as complete.`,
            });
            setTimeout(() => router.push('/driver'), 1500);
        }
    }

    const handleCustomerNotAvailable = () => {
        toast({
            title: 'Verifying Location...',
            description: 'Please wait while we confirm you are at the delivery address.',
        });
        setTimeout(() => {
            toast({
                title: 'Location Verified',
                description: 'You can now mark the customer as unavailable.',
            });
            setDeliveryFailed(true);
            setCurrentStep(workflowSteps.findIndex(s => s.id === 'return_to_laundromat'));
        }, 1500);
    }
    
    const renderActionButton = (step: typeof workflowSteps[0]) => {
        const ActionIcon = step.icon;

        if (step.id === 'confirm_or_fail') {
             return (
                <div className="mt-2 space-y-2">
                    <Button className="w-full" onClick={() => openModal('signature')}>
                        <Signature className="mr-2" /> {step.actionLabel}
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={handleCustomerNotAvailable}>
                        <UserX className="mr-2" /> Customer Not Available
                    </Button>
                </div>
            );
        }

        if (step.id === 'scan_photo' || step.id === 'photo' || (step.icon && step.id !== 'confirm_or_fail')) {
             return (
                <Button className="mt-2 w-full" onClick={() => openModal(step.id as 'scan_photo' | 'photo' | 'signature')}>
                    {ActionIcon && <ActionIcon className="mr-2" />} {step.actionLabel}
                </Button>
            );
        }
        
        if (step.id === 'navigate_laundromat' || (step.id === 'return_to_laundromat' && job.type === 'Delivery')) {
             return (
                 <Button variant="outline" className="w-full mt-2" asChild>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(job.laundromatAddress || '')}`} target="_blank" rel="noopener noreferrer">
                        <Navigation className="mr-2"/> {step.actionLabel}
                    </a>
                </Button>
            )
        }

        return <Button className="mt-2 w-full" onClick={handleNextStep}>{step.actionLabel}</Button>
    }

    const renderModalContent = () => {
        switch (modalContent) {
            case 'scan_photo':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Scan QR Code or Take Photo</DialogTitle>
                            <DialogDescription>
                                Scan the QR code on the bag. If it's a new customer without a QR code, take a photo of the bags instead.
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
                                            Please enable camera permissions to use the scanner or camera.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <Button variant="secondary" onClick={() => { handleNextStep(); setModalOpen(false); }}>Use Photo</Button>
                             <Button onClick={() => { handleNextStep(); setModalOpen(false); }}>Confirm Scan</Button>
                        </div>
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

    const isJobComplete = currentStep === workflowSteps.length;
    let finalStatus = null;
    if (isJobComplete) {
        finalStatus = deliveryFailed ? 'returned' : 'completed';
    }

    const visibleSteps = workflowSteps.filter(step => {
        if (job.type !== 'Delivery') return true;
        if (deliveryFailed) {
            return step.id !== 'complete';
        }
        return step.id !== 'return_to_laundromat' && step.id !== 'confirm_return_handoff';
    });


    return (
        <div className="space-y-6 pb-16">
             <Button variant="ghost" asChild className="-ml-4">
                <Link href="/driver">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Today's Tasks
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
                    {(job.type === 'Pickup' && currentStep >= 4 || (deliveryFailed && currentStep >= workflowSteps.findIndex(s => s.id === 'return_to_laundromat'))) && (
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building />
                                    Laundromat Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground"/>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.laundromatAddress || '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {job.laundromatAddress}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <Card className="md:sticky top-24">
                     <CardHeader>
                        <CardTitle>Job Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ol className="space-y-4">
                            {visibleSteps.map((step, index) => {
                                const stepIndex = workflowSteps.findIndex(s => s.id === step.id);
                                const isCurrent = stepIndex === currentStep;
                                const isCompleted = stepIndex < currentStep;

                                return (
                                <li key={step.id} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center self-stretch">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                            {isCompleted ? <Check /> : (step.icon ? <step.icon className="h-4 w-4" /> : index + 1)}
                                        </div>
                                        {index < visibleSteps.length -1 && <div className={`w-px flex-1 my-1 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />}
                                    </div>
                                    <div className="flex-1 pt-1.5">
                                        <p className={`font-medium ${!isCompleted && !isCurrent ? 'text-muted-foreground' : 'text-foreground'}`}>{step.label}</p>
                                        
                                        {isCurrent && renderActionButton(step)}
                                        
                                    </div>
                                </li>
                            )})}
                        </ol>
                        {isJobComplete && (
                             <div className={`mt-6 flex items-center gap-3 rounded-lg border p-4 ${finalStatus === 'returned' ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-green-500 bg-green-50 text-green-800'}`}>
                                {finalStatus === 'returned' ? <Ban className="h-6 w-6"/> : <Check className="h-6 w-6" />}
                                <div>
                                    <h4 className="font-semibold">{finalStatus === 'returned' ? 'Delivery Failed' : `${job.type} Job Complete!`}</h4>
                                    <p className="text-sm">{finalStatus === 'returned' ? 'Items returned to laundromat.' : 'This job has been marked as completed.'}</p>
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

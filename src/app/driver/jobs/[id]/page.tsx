
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, MapPin, Phone, QrCode, ScanLine, Truck, Package, Navigation, Camera, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


const jobData = {
    id: 'PU-123',
    type: 'Pickup',
    customer: 'Jane Doe',
    phone: '+44 7123 456789',
    address: '123 Main St, London, SW1A 0AA',
    time: '12:00 - 14:00',
    status: 'Assigned',
    notes: 'Gate code is #1234. Beware of the small dog.'
};

const pickupSteps = [
    { id: 'navigate', label: 'Start Navigation', actionLabel: 'Start Navigation' },
    { id: 'arrive', label: 'Arrive at Pickup', actionLabel: 'Confirm Arrival' },
    { id: 'scan', label: 'Scan Bag QR Code', actionLabel: 'Scan Code', icon: QrCode },
    { id: 'photo', label: 'Take Photo', actionLabel: 'Take Photo', icon: Camera },
    { id: 'confirm', label: 'Confirm Items Collected', actionLabel: 'Confirm Pickup' },
]

export default function JobDetailsPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const params = useParams();
    const jobId = params.id as string;
    const job = jobData;

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();
    
    const [isScanOpen, setScanOpen] = useState(false);
    const [isPhotoOpen, setPhotoOpen] = useState(false);

    const getCameraPermission = async () => {
        if (hasCameraPermission) return true;
        if (typeof navigator.mediaDevices?.getUserMedia !== 'function') {
            console.error('getUserMedia is not supported in this browser.');
            setHasCameraPermission(false);
            return false;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            return true;
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings to use this feature.',
            });
            return false;
        }
    };

    useEffect(() => {
        if(isScanOpen || isPhotoOpen) {
            getCameraPermission();
        }
    }, [isScanOpen, isPhotoOpen]);


    const handleNextStep = () => {
        if (currentStep < pickupSteps.length -1) {
            setCurrentStep(currentStep + 1);
        }
    }
    
    const renderActionButton = (step: typeof pickupSteps[0], index: number) => {
        const ActionIcon = step.icon;

        if (step.id === 'scan') {
             return (
                <Dialog open={isScanOpen} onOpenChange={setScanOpen}>
                    <DialogTrigger asChild>
                        <Button className="mt-2 w-full">
                            {ActionIcon && <ActionIcon className="mr-2" />} {step.actionLabel}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Scan QR Code</DialogTitle>
                            <DialogDescription>
                                Center the QR code on the customer's bag in the frame.
                            </DialogDescription>
                        </DialogHeader>
                         <div className="relative w-full aspect-square bg-black rounded-lg flex items-center justify-center overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                                    <Camera className="h-12 w-12 text-gray-500 mb-4" />
                                    <p className="text-center">Camera access is required to scan QR codes.</p>
                                </div>
                            )}
                            <div className="absolute top-8 bottom-8 left-8 right-8 border-4 border-dashed border-gray-400 rounded-lg"/>
                        </div>
                        <Button onClick={() => { handleNextStep(); setScanOpen(false); }}>Confirm Scan</Button>
                    </DialogContent>
                </Dialog>
            );
        }
        
        if (step.id === 'photo') {
             return (
                <Dialog open={isPhotoOpen} onOpenChange={setPhotoOpen}>
                    <DialogTrigger asChild>
                        <Button className="mt-2 w-full">
                             {ActionIcon && <ActionIcon className="mr-2" />} {step.actionLabel}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Capture Photo</DialogTitle>
                            <DialogDescription>
                                Take a photo of the items at the pickup location.
                            </DialogDescription>
                        </DialogHeader>
                          <div className="relative w-full aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                                    <Camera className="h-12 w-12 text-gray-500 mb-4" />
                                    <p className="text-center">Camera access is required to take photos.</p>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => { handleNextStep(); setPhotoOpen(false); }}>Capture</Button>
                    </DialogContent>
                </Dialog>
            );
        }

        return <Button className="mt-2 w-full" onClick={handleNextStep}>{step.actionLabel}</Button>
    }

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
                <p className="text-muted-foreground">Order ID: {jobId}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {job.type === 'Pickup' ? <Package /> : <Truck />}
                                Customer & Order Summary
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
                                <p>{job.address}</p>
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
                            <Button variant="outline" className="w-full"><Navigation className="mr-2"/> Open in Maps</Button>
                        </CardContent>
                    </Card>
                </div>
                <Card className="md:sticky top-24">
                     <CardHeader>
                        <CardTitle>Job Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ol className="space-y-4">
                            {pickupSteps.map((step, index) => (
                                <li key={step.id} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center self-stretch">
                                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                            {index < currentStep ? <Check /> : (index === currentStep ? <ScanLine /> : index + 1)}
                                        </div>
                                        {index < pickupSteps.length -1 && <div className={`w-px flex-1 my-1 ${index < currentStep ? 'bg-primary' : 'bg-border'}`} />}
                                    </div>
                                    <div className="flex-1 pt-1.5">
                                        <p className={`font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                                        
                                        {index === currentStep && renderActionButton(step, index)}
                                        
                                    </div>
                                </li>
                            ))}
                        </ol>
                        {currentStep === pickupSteps.length && (
                             <div className="mt-6 flex items-center gap-3 rounded-lg border border-green-500 bg-green-50 p-4 text-green-800">
                                <Check className="h-6 w-6" />
                                <div>
                                    <h4 className="font-semibold">Job Complete!</h4>
                                    <p className="text-sm">This job has been marked as completed.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

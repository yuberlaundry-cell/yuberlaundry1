
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';

export default function NewDriverPage() {
    const router = useRouter();
    const { toast } = useToast();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Driver Added!",
            description: "The new driver has been created and can now log in.",
        });
        router.push(`/admin/drivers`);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="-ml-4">
                <Link href={`/admin/drivers`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Driver Fleet
                </Link>
            </Button>
             <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Add New Driver</h1>

            <form onSubmit={handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" placeholder="Doe" required/>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" required/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <PhoneNumberInput />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="password">Set Initial Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle & Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                                <Select required>
                                    <SelectTrigger><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="scooter">Scooter</SelectItem>
                                        <SelectItem value="car">Car</SelectItem>
                                        <SelectItem value="van">Van</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle-model">Vehicle Model</Label>
                                    <Input id="vehicle-model" placeholder="e.g. Toyota Vitz" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="license-plate">License Plate</Label>
                                    <Input id="license-plate" placeholder="AB12CD GP" required/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Initial Status</Label>
                                <Select defaultValue="New" required>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="New">New (Pending Docs)</SelectItem>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Offline">Offline</SelectItem>
                                        <SelectItem value="Suspended">Suspended</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button type="submit">Add Driver</Button>
                </div>
            </form>
        </div>
    );
}


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
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const driverData = {
    'D-001': {
        name: 'Alex Ray',
        email: 'alex.ray@yuber.com',
        vehicleType: 'car',
        vehicleModel: 'Blue Toyota Prius',
        licensePlate: 'LAUNDRY1',
        status: 'Online',
    }
};

export default function EditDriverPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const driverId = params.id as keyof typeof driverData;
    const driver = driverData[driverId] || driverData['D-001'];
    const [firstName, lastName] = driver.name.split(' ');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Driver details saved!",
            description: "The information for Alex Ray has been updated.",
        });
        router.push(`/admin/drivers/${driverId}`);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="-ml-4">
                <Link href={`/admin/drivers/${driverId}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Driver Profile
                </Link>
            </Button>
             <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Edit Driver</h1>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" defaultValue={firstName} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" defaultValue={lastName} />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={driver.email} />
                        </div>
                    </CardContent>
                </Card>

                 <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Vehicle & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-w-lg">
                         <div className="space-y-2">
                            <Label htmlFor="vehicle-type">Vehicle Type</Label>
                            <Select defaultValue={driver.vehicleType}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
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
                                <Input id="vehicle-model" defaultValue={driver.vehicleModel} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="license-plate">License Plate</Label>
                                <Input id="license-plate" defaultValue={driver.licensePlate} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Driver Status</Label>
                            <Select defaultValue={driver.status}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Online">Online</SelectItem>
                                    <SelectItem value="Offline">Offline</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-6 flex justify-end">
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </div>
    );
}

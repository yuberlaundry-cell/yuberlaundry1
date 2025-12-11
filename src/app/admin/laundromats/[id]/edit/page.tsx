
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
import { AddressInput } from '@/components/ui/address-input';
import { useState } from 'react';

const laundromatData = {
    'L-001': {
        name: 'Speedy Suds',
        location: 'London, UK',
        status: 'Active',
    }
};

export default function EditLaundromatPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const laundromatId = params.id as keyof typeof laundromatData;
    const laundromat = laundromatData[laundromatId] || laundromatData['L-001'];
    const [address, setAddress] = useState(laundromat.location);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Laundromat details saved!",
            description: `The information for ${laundromat.name} has been updated.`,
        });
        router.push(`/admin/laundromats/${laundromatId}`);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="-ml-4">
                <Link href={`/admin/laundromats/${laundromatId}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Laundromat Profile
                </Link>
            </Button>
             <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Edit Laundromat</h1>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Facility Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="facility-name">Facility Name</Label>
                            <Input id="facility-name" defaultValue={laundromat.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facility-address">Address</Label>
                             <AddressInput
                                id="facility-address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onAddressSelect={(addr) => {
                                    setAddress(addr.description);
                                    console.log("Selected coordinates:", addr.coordinates);
                                }}
                                required
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="status">Facility Status</Label>
                            <Select defaultValue={laundromat.status}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Onboarding">Onboarding</SelectItem>
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

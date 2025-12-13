
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const companyData = {
    'acme-corp': {
        name: 'Acme Corp',
        admin: 'John Smith',
        email: 'john@acme.com',
        plan: 'Business Pro',
    }
};

export default function EditB2BPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const companyId = params.id as keyof typeof companyData;
    const company = companyData[companyId] || companyData['acme-corp'];
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Company details saved!",
            description: `The information for ${company.name} has been updated.`,
        });
        router.push(`/admin/b2b/${companyId}`);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="-ml-4">
                <Link href={`/admin/b2b/${companyId}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Company Profile
                </Link>
            </Button>
             <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Edit B2B Account</h1>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardContent className="space-y-4 pt-6 max-w-lg">
                        <div className="space-y-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" defaultValue={company.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="admin-name">Primary Admin Name</Label>
                            <Input id="admin-name" defaultValue={company.admin} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin-email">Primary Admin Email</Label>
                            <Input id="admin-email" type="email" defaultValue={company.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company-plan">Subscription Plan</Label>
                            <Select defaultValue={company.plan}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Business Pro">Business Pro</SelectItem>
                                    <SelectItem value="Enterprise">Enterprise</SelectItem>
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

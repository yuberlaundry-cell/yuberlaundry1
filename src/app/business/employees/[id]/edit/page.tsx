
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockBusinessEmployees } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditEmployeePage() {
    const params = useParams();
    const employeeId = params.id as string;
    const employee = mockBusinessEmployees.find(e => e.id === employeeId);
    
    if (!employee) {
         return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold">Employee not found</h2>
                <Button variant="link" asChild><Link href="/business/employees">Return to list</Link></Button>
            </div>
        );
    }

    const [firstName, lastName] = employee.name.split(' ');

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href={`/business/employees/${employee.id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to employee details
                    </Link>
                </Button>
            </div>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Edit Employee: {employee.name}</CardTitle>
                    <CardDescription>
                       Update the details for this team member.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
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
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={employee.email} />
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select defaultValue={employee.role.toLowerCase()}>
                                    <SelectTrigger id="role">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="employee">Employee</SelectItem>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department (optional)</Label>
                                <Input id="department" defaultValue={employee.department} />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="monthly-allowance">Monthly Allowance (R)</Label>
                                <Input id="monthly-allowance" type="number" defaultValue={employee.allowance.monthly} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="per-order-limit">Per-Order Limit (R) (optional)</Label>
                                <Input id="per-order-limit" type="number" defaultValue={employee.allowance.perOrder} />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="notes">Notes (optional)</Label>
                            <Textarea id="notes" placeholder="Any internal notes about this employee." defaultValue="Joined the marketing team in Q2."/>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" asChild><Link href={`/business/employees/${employee.id}`}>Cancel</Link></Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

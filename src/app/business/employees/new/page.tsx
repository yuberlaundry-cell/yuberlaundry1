
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewEmployeePage() {

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/business/employees">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all employees
                    </Link>
                </Button>
            </div>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Add a new employee</CardTitle>
                    <CardDescription>
                        Invite a new team member to use the company's Yuber Laundry benefit.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john.doe@company.com" />
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select>
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select a role" />
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
                                <Input id="department" placeholder="e.g., Engineering" />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="monthly-allowance">Monthly Allowance (£)</Label>
                                <Input id="monthly-allowance" type="number" placeholder="e.g., 200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="per-order-limit">Per-Order Limit (£) (optional)</Label>
                                <Input id="per-order-limit" type="number" placeholder="e.g., 50" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="notes">Notes (optional)</Label>
                            <Textarea id="notes" placeholder="Any internal notes about this employee." />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" asChild><Link href="/business/employees">Cancel</Link></Button>
                            <Button type="submit">Add Employee</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

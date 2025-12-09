'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockBusinessEmployees } from "@/lib/mock-data";
import { ArrowLeft, CalendarIcon, Shirt, ShoppingBag, VenetianMask } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const services = [
    { id: 'wash-fold', name: 'Wash & Fold', icon: ShoppingBag, description: "Per lb, standard service" },
    { id: 'dry-cleaning', name: 'Dry Cleaning', icon: VenetianMask, description: "Per item, for delicates" },
    { id: 'ironing', name: 'Ironing', icon: Shirt, description: "Per item, crisp finish" },
];

export default function NewBusinessOrderPage() {

    return (
        <div className="space-y-8 pb-8">
            <div>
                 <Button variant="ghost" asChild className="-ml-4">
                    <Link href="/business/orders">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all orders
                    </Link>
                </Button>
            </div>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Create a new order</CardTitle>
                    <CardDescription>
                        Place a laundry order on behalf of an employee.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="employee">Select Employee</Label>
                            <Select>
                                <SelectTrigger id="employee">
                                    <SelectValue placeholder="Select an employee..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockBusinessEmployees.filter(e => e.status === 'Active').map(employee => (
                                        <SelectItem key={employee.id} value={employee.id}>
                                            {employee.name} ({employee.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="font-medium text-lg">Services</h3>
                            {services.map(service => (
                                <div key={service.id} className="flex items-center gap-4">
                                     <Checkbox id={service.id} />
                                      <Label htmlFor={service.id} className="flex items-center gap-3 cursor-pointer flex-grow">
                                        <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                            <service.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{service.name}</p>
                                            <p className="text-sm text-muted-foreground">{service.description}</p>
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </div>

                         <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="pickup-date">Pickup Date & Time</Label>
                                <Input id="pickup-date" type="datetime-local" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="delivery-date">Delivery Date & Time</Label>
                                <Input id="delivery-date" type="datetime-local" />
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="pickup-address">Pickup Address</Label>
                            <Input id="pickup-address" placeholder="123 Main St, Anytown, USA" />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="notes">Special Instructions (optional)</Label>
                            <Textarea id="notes" placeholder="e.g., Use hypoallergenic detergent." />
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">Estimated Cost:</p>
                                <p className="font-medium">$45.00</p>
                            </div>
                            <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">Company Contribution:</p>
                                <p className="font-medium">$45.00</p>
                            </div>
                             <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">Employee Cost:</p>
                                <p className="font-medium">$0.00</p>
                            </div>
                        </div>


                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" asChild><Link href="/business/orders">Cancel</Link></Button>
                            <Button type="submit">Create Order</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

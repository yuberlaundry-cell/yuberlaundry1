
'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockTimeSlots, TimeSlot } from "@/lib/mock-data";
import { useState } from "react";

export default function ScheduleStep() {
    const [collectionDay, setCollectionDay] = useState('today');
    const [deliveryDay, setDeliveryDay] = useState('tomorrow');

    const collectionSlots = collectionDay === 'today' ? mockTimeSlots.today : mockTimeSlots.tomorrow;
    const deliverySlots = deliveryDay === 'today' ? mockTimeSlots.today : mockTimeSlots.tomorrow;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline">Book Your Service</h2>
                <p className="text-muted-foreground mt-1">Choose your preferred collection and delivery times.</p>
            </div>
            <div className="space-y-6">
                 {/* Collection Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Collection time</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="collection-date">Select day</Label>
                            <Select value={collectionDay} onValueChange={setCollectionDay}>
                                <SelectTrigger id="collection-date">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="collection-time">Select time</Label>
                             <Select defaultValue={collectionSlots.length > 0 ? collectionSlots[0].value : undefined}>
                                <SelectTrigger id="collection-time">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   {collectionSlots.map(slot => (
                                       <SelectItem key={slot.value} value={slot.value}>{slot.label.split(',')[1]}</SelectItem>
                                   ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="collection-type">Driver instructions</Label>
                         <Select defaultValue="personal">
                            <SelectTrigger id="collection-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal">Collect from me in person</SelectItem>
                                <SelectItem value="concierge">Leave with concierge</SelectItem>
                                <SelectItem value="outside">Leave outside</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Delivery time</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="delivery-date">Select day</Label>
                            <Select value={deliveryDay} onValueChange={setDeliveryDay}>
                                <SelectTrigger id="delivery-date">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="delivery-time">Select time</Label>
                             <Select defaultValue={deliverySlots.length > 0 ? deliverySlots[0].value : undefined}>
                                <SelectTrigger id="delivery-time">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                      {deliverySlots.map(slot => (
                                       <SelectItem key={slot.value} value={slot.value}>{slot.label.split(',')[1]}</SelectItem>
                                   ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="delivery-type">Driver instructions</Label>
                         <Select defaultValue="personal">
                            <SelectTrigger id="delivery-type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal">Deliver to me in person</SelectItem>
                                <SelectItem value="concierge">Leave with concierge</SelectItem>
                                <SelectItem value="outside">Leave outside</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                 {/* Instructions */}
                 <div className="space-y-2">
                    <Label htmlFor="driver-instructions">Add instructions for driver. Don't add cleaning notes here.</Label>
                    <Textarea id="driver-instructions" />
                 </div>

                {/* Frequency */}
                <div className="space-y-4">
                    <Label className="font-semibold text-lg">Frequency</Label>
                    <RadioGroup defaultValue="once" className="grid grid-cols-2 gap-4">
                        <Label htmlFor="freq-once" className="block p-4 border rounded-lg cursor-pointer text-center hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <RadioGroupItem value="once" id="freq-once" className="sr-only"/>
                            <span className="font-medium text-base">Just once</span>
                        </Label>
                        <Label htmlFor="freq-weekly" className="block p-4 border rounded-lg cursor-pointer text-center hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <RadioGroupItem value="weekly" id="freq-weekly" className="sr-only"/>
                            <span className="font-medium text-base">Every two weeks</span>
                        </Label>
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}

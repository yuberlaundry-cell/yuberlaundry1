
'use client';

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ScheduleStep() {
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
                    <div className="space-y-2">
                        <Label htmlFor="collection-type">Collection Time</Label>
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
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="collection-date">Date</Label>
                            <Select defaultValue="today">
                                <SelectTrigger id="collection-date">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Today, 10 December</SelectItem>
                                    <SelectItem value="tomorrow">Tomorrow, 11 December</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="collection-time">Time</Label>
                             <Select defaultValue="16:00-17:00">
                                <SelectTrigger id="collection-time">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="16:00-17:00">16:00 - 17:00</SelectItem>
                                    <SelectItem value="17:00-18:00">17:00 - 18:00</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Delivery Time</h3>
                    <div className="space-y-2">
                        <Label htmlFor="delivery-type">Delivery Time</Label>
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
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="delivery-date">Date</Label>
                            <Select defaultValue="tomorrow">
                                <SelectTrigger id="delivery-date">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tomorrow">Tomorrow, 11 December</SelectItem>
                                    <SelectItem value="day-after">Friday, 12 December</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="delivery-time">Time</Label>
                             <Select defaultValue="17:00-18:00">
                                <SelectTrigger id="delivery-time">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="17:00-18:00">17:00 - 18:00</SelectItem>
                                    <SelectItem value="18:00-19:00">18:00 - 19:00</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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
                    <RadioGroup defaultValue="once" className="grid grid-cols-2 gap-2">
                        <Label htmlFor="freq-once" className="block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <RadioGroupItem value="once" id="freq-once" className="sr-only"/>
                            <span className="font-medium text-sm">Just once</span>
                        </Label>
                        <Label htmlFor="freq-weekly" className="block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <RadioGroupItem value="weekly" id="freq-weekly" className="sr-only"/>
                            <span className="font-medium text-sm">Weekly</span>
                        </Label>
                        <Label htmlFor="freq-2-weeks" className="block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <RadioGroupItem value="2-weeks" id="freq-2-weeks" className="sr-only"/>
                            <span className="font-medium text-sm">Every 2 weeks</span>
                        </Label>
                        <Label htmlFor="freq-4-weeks" className="block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                            <RadioGroupItem value="4-weeks" id="freq-4-weeks" className="sr-only"/>
                            <span className="font-medium text-sm">Every 4 weeks</span>
                        </Label>
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}

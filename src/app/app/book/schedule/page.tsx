
'use client';

import { BookingLayout } from "@/components/booking/booking-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format, addDays } from 'date-fns';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        dates.push(addDays(today, i));
    }
    return dates;
}

const allPickupTimes = ['08:00 - 10:00', '09:00 - 11:00', '10:00 - 12:00', '11:00 - 13:00', '12:00 - 14:00', '13:00 - 15:00', '14:00 - 16:00', '15:00 - 17:00', '16:00 - 18:00', '17:00 - 19:00', '18:00 - 20:00', '19:00 - 21:00'];
const allDeliveryTimes = ['12:00 - 14:00', '13:00 - 15:00', '14:00 - 16:00', '15:00 - 17:00', '16:00 - 18:00', '17:00 - 19:00', '18:00 - 20:00', '19:00 - 21:00', '20:00 - 22:00'];

const featuredPickupTimes = ['09:00 - 11:00', '12:00 - 14:00', '15:00 - 17:00', '18:00 - 20:00'];
const featuredDeliveryTimes = ['12:00 - 14:00', '15:00 - 17:00', '18:00 - 20:00', '20:00 - 22:00'];

export default function SchedulePage() {
    const dates = generateDates();
    const [selectedPickupDate, setSelectedPickupDate] = useState(dates[0]);
    const [selectedPickupTime, setSelectedPickupTime] = useState(featuredPickupTimes[1]);
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(addDays(dates[0], 2));
    const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(featuredDeliveryTimes[0]);

    const [isPickupModalOpen, setPickupModalOpen] = useState(false);
    const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);

    const handlePickupTimeSelect = (time: string) => {
        setSelectedPickupTime(time);
        setPickupModalOpen(false);
    }
    
    const handleDeliveryTimeSelect = (time: string) => {
        setSelectedDeliveryTime(time);
        setDeliveryModalOpen(false);
    }

    return (
        <BookingLayout
            stepTitle="Schedule Pickup & Delivery"
            stepDescription="Choose a convenient time for us to collect and return your laundry."
            nextHref="/app/book/services"
            backHref="/app/book/address"
        >
            <div className="grid md:grid-cols-2 gap-8">
                {/* Pickup Section */}
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Pickup</h3>
                    <div>
                        <Label className="mb-2 block">Date</Label>
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-2 pb-2">
                                {dates.map(date => (
                                    <Button
                                        key={date.toISOString()}
                                        variant={format(selectedPickupDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? "default" : "outline"}
                                        onClick={() => setSelectedPickupDate(date)}
                                        className="w-24 flex-shrink-0"
                                    >
                                        <div className="text-center">
                                            <p className="text-sm font-bold">{format(date, 'EEE')}</p>
                                            <p className="text-xs">{format(date, 'MMM d')}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div>
                        <Label className="mb-2 block">Time</Label>
                        <RadioGroup value={selectedPickupTime} onValueChange={setSelectedPickupTime} className="grid grid-cols-2 gap-2">
                            {featuredPickupTimes.map(time => (
                                <Label key={time} htmlFor={`pickup-${time}`} className={cn("block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50", { "border-primary bg-primary/5": selectedPickupTime === time })}>
                                     <RadioGroupItem value={time} id={`pickup-${time}`} className="sr-only"/>
                                    <span className="font-medium text-sm">{time}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                         <Dialog open={isPickupModalOpen} onOpenChange={setPickupModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="link" className="mt-2 w-full text-primary">See all available times</Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>All Pickup Times</DialogTitle>
                                    <DialogDescription>For {format(selectedPickupDate, 'EEEE, MMMM d')}</DialogDescription>
                                </DialogHeader>
                                <Separator/>
                                <ScrollArea className="flex-grow pr-4 -mr-6">
                                    <div className="grid grid-cols-2 gap-2">
                                        {allPickupTimes.map(time => (
                                            <Button key={time} variant={selectedPickupTime === time ? 'default' : 'outline'} onClick={() => handlePickupTimeSelect(time)}>
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                         </Dialog>
                    </div>
                </div>

                {/* Delivery Section */}
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Delivery</h3>
                    <div>
                        <Label className="mb-2 block">Date</Label>
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-2 pb-2">
                                {dates.slice(1).map(date => ( // Delivery can't be same day
                                    <Button
                                        key={date.toISOString()}
                                        variant={format(selectedDeliveryDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') ? "default" : "outline"}
                                        onClick={() => setSelectedDeliveryDate(date)}
                                        className="w-24 flex-shrink-0"
                                    >
                                        <div className="text-center">
                                            <p className="text-sm font-bold">{format(date, 'EEE')}</p>
                                            <p className="text-xs">{format(date, 'MMM d')}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div>
                        <Label className="mb-2 block">Time</Label>
                        <RadioGroup value={selectedDeliveryTime} onValueChange={setSelectedDeliveryTime} className="grid grid-cols-2 gap-2">
                            {featuredDeliveryTimes.map(time => (
                                <Label key={time} htmlFor={`delivery-${time}`} className={cn("block p-3 border rounded-lg cursor-pointer text-center hover:bg-muted/50", { "border-primary bg-primary/5": selectedDeliveryTime === time })}>
                                     <RadioGroupItem value={time} id={`delivery-${time}`} className="sr-only"/>
                                    <span className="font-medium text-sm">{time}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                         <Dialog open={isDeliveryModalOpen} onOpenChange={setDeliveryModalOpen}>
                            <DialogTrigger asChild>
                                <Button variant="link" className="mt-2 w-full text-primary">See all available times</Button>
                            </DialogTrigger>
                            <DialogContent className="max-h-[90vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>All Delivery Times</DialogTitle>
                                    <DialogDescription>For {format(selectedDeliveryDate, 'EEEE, MMMM d')}</DialogDescription>
                                </DialogHeader>
                                <Separator/>
                                <ScrollArea className="flex-grow pr-4 -mr-6">
                                    <div className="grid grid-cols-2 gap-2">
                                        {allDeliveryTimes.map(time => (
                                            <Button key={time} variant={selectedDeliveryTime === time ? 'default' : 'outline'} onClick={() => handleDeliveryTimeSelect(time)}>
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                         </Dialog>
                    </div>
                </div>
            </div>
        </BookingLayout>
    );
}

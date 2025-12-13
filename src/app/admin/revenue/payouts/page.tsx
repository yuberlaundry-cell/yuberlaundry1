
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Building, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type PayoutFrequency = 'daily' | 'weekly' | 'bi-weekly' | 'monthly';

export default function PayoutsSettingsPage() {
    const [driverFrequency, setDriverFrequency] = useState<PayoutFrequency>('weekly');
    const [laundromatFrequency, setLaundromatFrequency] = useState<PayoutFrequency>('bi-weekly');
    const { toast } = useToast();

    const handleSaveSettings = (target: 'Drivers' | 'Laundromats') => {
        toast({
            title: 'Settings Saved',
            description: `Payout settings for ${target} have been updated.`,
        });
    }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Payout Settings</h1>
          <p className="text-muted-foreground">
            Configure the automated payout schedules for drivers and laundromats.
          </p>
        </div>
      </div>
      
       <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Truck/> Driver Payouts</CardTitle>
                    <CardDescription>Set the payout schedule for your driver fleet.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveSettings('Drivers');}}>
                        <div className="space-y-2">
                            <Label htmlFor="driver-frequency">Payout Frequency</Label>
                            <Select value={driverFrequency} onValueChange={(value: PayoutFrequency) => setDriverFrequency(value)}>
                                <SelectTrigger id="driver-frequency">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="bi-weekly">Bi-weekly (Every 2 weeks)</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {driverFrequency === 'weekly' && (
                            <div className="space-y-2">
                                <Label htmlFor="driver-weekly-day">Day of Week</Label>
                                <Select defaultValue="monday">
                                    <SelectTrigger id="driver-weekly-day"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monday">Monday</SelectItem>
                                        <SelectItem value="tuesday">Tuesday</SelectItem>
                                        <SelectItem value="wednesday">Wednesday</SelectItem>
                                        <SelectItem value="thursday">Thursday</SelectItem>
                                        <SelectItem value="friday">Friday</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        
                        {driverFrequency === 'bi-weekly' && (
                            <div className="space-y-2">
                                <Label htmlFor="driver-biweekly-day">Day of Week</Label>
                                 <Select defaultValue="friday">
                                    <SelectTrigger id="driver-biweekly-day"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monday">Every second Monday</SelectItem>
                                        <SelectItem value="friday">Every second Friday</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {driverFrequency === 'monthly' && (
                             <div className="space-y-2">
                                <Label htmlFor="driver-monthly-day">Day of Month</Label>
                                <Input id="driver-monthly-day" type="number" min="1" max="28" defaultValue="1" />
                                <p className="text-xs text-muted-foreground">Enter a day from 1 to 28.</p>
                            </div>
                        )}

                        <Button type="submit">Save Driver Settings</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Building/> Laundromat Payouts</CardTitle>
                    <CardDescription>Set the payout schedule for your partner facilities.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSaveSettings('Laundromats');}}>
                        <div className="space-y-2">
                            <Label htmlFor="laundromat-frequency">Payout Frequency</Label>
                             <Select value={laundromatFrequency} onValueChange={(value: PayoutFrequency) => setLaundromatFrequency(value)}>
                                <SelectTrigger id="laundromat-frequency">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="bi-weekly">Bi-weekly (Every 2 weeks)</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                         {laundromatFrequency === 'bi-weekly' && (
                            <div className="space-y-2">
                                <Label htmlFor="laundromat-biweekly-day">Payout Days</Label>
                                 <Select defaultValue="1st-15th">
                                    <SelectTrigger id="laundromat-biweekly-day"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1st-15th">1st and 15th of the month</SelectItem>
                                        <SelectItem value="16th-end">16th and end of month</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {laundromatFrequency === 'monthly' && (
                             <div className="space-y-2">
                                <Label htmlFor="laundromat-monthly-day">Day of Month</Label>
                                <Select defaultValue="1">
                                    <SelectTrigger id="laundromat-monthly-day"><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1st of the month</SelectItem>
                                        <SelectItem value="15">15th of the month</SelectItem>
                                        <SelectItem value="end">End of the month</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <Button type="submit">Save Laundromat Settings</Button>
                    </form>
                </CardContent>
            </Card>
      </div>

    </div>
  );
}


'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  MapPin,
  Building,
  Truck,
  MoreHorizontal,
  Map,
  Trash2,
  FilePen,
  Eye,
  Clock,
  ChevronDown,
  Warehouse
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { AddressInput } from '@/components/ui/address-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertTitle } from '@/components/ui/alert';

const zones = [
    { id: 'ZONE-LON-N', name: 'North London', country: 'United Kingdom', city: 'London', facilities: 3, drivers: 15, template: 'London - Standard Weekday', definition: 'Defined by map boundary' },
    { id: 'ZONE-LON-S', name: 'South London', country: 'United Kingdom', city: 'London', facilities: 4, drivers: 18, template: 'London - Standard Weekday', definition: 'Defined by 5 postal codes' },
    { id: 'ZONE-MAN-C', name: 'Manchester Central', country: 'United Kingdom', city: 'Manchester', facilities: 2, drivers: 10, template: 'Manchester - All Day', definition: 'Defined by map boundary' },
    { id: 'ZONE-JHB-N', name: 'Joburg North', country: 'South Africa', city: 'Johannesburg', facilities: 5, drivers: 25, template: '', definition: 'Not defined' },
];

const slotTemplates = [
  { id: 'T-LON-01', name: 'London - Standard Weekday', city: 'London' },
  { id: 'T-LON-02', name: 'London - Express', city: 'London' },
  { id: 'T-MAN-01', name: 'Manchester - All Day', city: 'Manchester' },
  { id: 'T-JHB-01', name: 'Joburg - Weekday', city: 'Johannesburg' },
];

const allLaundromats = [
    { id: 'L-001', name: 'Speedy Suds', city: 'London', assigned: true },
    { id: 'L-003', name: 'Fresh Folds', city: 'London', assigned: true },
    { id: 'L-007', name: 'London Laundry Co', city: 'London', assigned: false },
]

const allDrivers = [
    { id: 'D-001', name: 'Alex Ray', city: 'London', assigned: true },
    { id: 'D-002', name: 'Sarah Johnson', city: 'Manchester', assigned: false },
    { id: 'D-003', name: 'David Lee', city: 'London', assigned: true },
]


export default function ZonesPage() {
  const [postalCodes, setPostalCodes] = useState<string[]>(['SW1A', 'SW1E', 'SW1P', 'SW1V', 'SW1Y']);
  const [inputValue, setInputValue] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      setPostalCodes([...postalCodes, inputValue.trim().toUpperCase()]);
      setInputValue('');
    }
  };

  const removePostalCode = (codeToRemove: string) => {
    setPostalCodes(postalCodes.filter(code => code !== codeToRemove));
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Service Zones</h1>
          <p className="text-muted-foreground">
            Define and manage geographic service areas and their assigned time slot templates.
          </p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Zone
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create New Service Zone</DialogTitle>
                    <DialogDescription>Define a new geographic area for your operations.</DialogDescription>
                </DialogHeader>
                 <ScrollArea className="max-h-[70vh]">
                    <form className="space-y-6 py-4 pr-6">
                        <div className="space-y-2">
                            <Label htmlFor="zone-name">Zone Name</Label>
                            <Input id="zone-name" placeholder="e.g., Central London or Sandton" />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="zone-country">Country</Label>
                                <Select name="zone-country">
                                <SelectTrigger id="zone-country">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="South Africa">South Africa</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="zone-city">City</Label>
                                <Select name="zone-city" onValueChange={setSelectedCity}>
                                <SelectTrigger id="zone-city">
                                    <SelectValue placeholder="Select a city" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="London">London</SelectItem>
                                    <SelectItem value="Manchester">Manchester</SelectItem>
                                    <SelectItem value="Johannesburg">Johannesburg</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="zone-template">Time Slot Template</Label>
                            <Select name="zone-template" disabled={!selectedCity}>
                                <SelectTrigger id="zone-template">
                                    <SelectValue placeholder={selectedCity ? "Select a template" : "Select a city first"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {slotTemplates.filter(t => t.city === selectedCity).map(t => (
                                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                         <div className="space-y-4 rounded-lg border p-4">
                            <Label className="font-semibold text-base">Logistics Model</Label>
                             <RadioGroup defaultValue="direct" className="space-y-3">
                                <Label htmlFor="logistics-direct" className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                    <RadioGroupItem value="direct" id="logistics-direct"/>
                                    <div>
                                        <p className="font-medium flex items-center gap-2"><Truck/> Direct to Partner</p>
                                        <p className="text-sm text-muted-foreground">Drivers take orders directly from customers to the assigned laundromat.</p>
                                    </div>
                                </Label>
                                 <Label htmlFor="logistics-hub" className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                    <RadioGroupItem value="hub" id="logistics-hub"/>
                                    <div>
                                        <p className="font-medium flex items-center gap-2"><Warehouse/> Warehouse Hub</p>
                                        <p className="text-sm text-muted-foreground">Drivers bring all orders to a central warehouse for sorting and dispatch.</p>
                                    </div>
                                </Label>
                            </RadioGroup>
                             <Alert variant="default" className="mt-2 text-xs">
                                <AlertTitle className="text-xs font-semibold flex items-center gap-2"><MapPin/> Note on Warehouses</AlertTitle>
                                <p>Warehouse locations are managed in a separate section. This setting only determines the logistical model for this zone.</p>
                            </Alert>
                        </div>
                        
                        <div className="space-y-2">
                            <Label>Draw Zone on Map</Label>
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
                                <div className="text-center text-muted-foreground">
                                    <Map className="h-12 w-12 mx-auto mb-2" />
                                    <p>Interactive map for drawing zones would be here.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postal-codes">Refine by Area/Postcode</Label>
                            <p className="text-xs text-muted-foreground">Draw a zone on the map to get started, or add postcodes/areas manually below.</p>
                            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-24">
                                {postalCodes.map((code) => (
                                    <Badge key={code} variant="secondary" className="flex items-center gap-1 text-base">
                                    {code}
                                    <button onClick={() => removePostalCode(code)} className="rounded-full hover:bg-background/50">
                                        <X className="h-3 w-3" />
                                    </button>
                                    </Badge>
                                ))}
                                <Input
                                    id="postal-codes"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Add a code and press Enter..."
                                    className="flex-1 border-none focus-visible:ring-0 shadow-none min-w-[150px]"
                                />
                            </div>
                        </div>
                    </form>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                    <Button type="submit">Create Zone</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Defined Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Time Slot Template</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {zone.name}
                  </TableCell>
                  <TableCell>{zone.city}</TableCell>
                  <TableCell>{zone.country}</TableCell>
                  <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-muted-foreground -ml-4">
                                {zone.template || 'Not Set'} <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => {}}>Not Set</DropdownMenuItem>
                            {slotTemplates.filter(t => t.city === zone.city).map(t => (
                                <DropdownMenuItem key={t.id}>{t.name}</DropdownMenuItem>
                            ))}
                             {slotTemplates.filter(t => t.city === zone.city).length === 0 && (
                                <DropdownMenuItem disabled>No templates for {zone.city}</DropdownMenuItem>
                             )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><FilePen className="mr-2 h-4 w-4" /> Edit Zone Definition</DropdownMenuItem>
                             <DialogTrigger asChild>
                                <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Manage Resources</DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger><Clock className="mr-2 h-4 w-4" /> Manage Templates</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem asChild><Link href="/admin/logistics/templates">View All Templates</Link></DropdownMenuItem>
                                    <DropdownMenuItem asChild><Link href="/admin/logistics/templates">Create New Template</Link></DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Zone
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Manage Resources for {zone.name}</DialogTitle>
                                <DialogDescription>Assign facilities and drivers to this service zone.</DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="facilities">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="facilities"><Building className="mr-2"/> Facilities</TabsTrigger>
                                    <TabsTrigger value="drivers"><Truck className="mr-2"/> Drivers</TabsTrigger>
                                </TabsList>
                                <TabsContent value="facilities">
                                    <Card>
                                        <CardHeader>
                                            <Input placeholder="Search facilities..." />
                                        </CardHeader>
                                        <CardContent>
                                            <ScrollArea className="h-72">
                                                <div className="space-y-4">
                                                    {allLaundromats.filter(l => l.city === zone.city).map(l => (
                                                        <div key={l.id} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <Checkbox defaultChecked={l.assigned}/>
                                                                <Label>{l.name}</Label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                 <TabsContent value="drivers">
                                    <Card>
                                        <CardHeader>
                                            <Input placeholder="Search drivers..." />
                                        </CardHeader>
                                        <CardContent>
                                            <ScrollArea className="h-72">
                                                <div className="space-y-4">
                                                    {allDrivers.filter(d => d.city === zone.city).map(d => (
                                                        <div key={d.id} className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <Checkbox defaultChecked={d.assigned}/>
                                                                <Label>{d.name}</Label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                             <DialogFooter>
                                <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                <Button>Save Resources</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
    </div>
  );
}

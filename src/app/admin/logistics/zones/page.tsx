
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
  ChevronDown
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const zones = [
    { id: 'ZONE-LON-N', name: 'North London', facilities: 3, drivers: 15, template: 'London - Standard Weekday' },
    { id: 'ZONE-LON-S', name: 'South London', facilities: 4, drivers: 18, template: 'London - Standard Weekday' },
    { id: 'ZONE-MAN-C', name: 'Manchester Central', facilities: 2, drivers: 10, template: 'Manchester - All Day' },
];

const slotTemplates = [
  { id: 'T-LON-01', name: 'London - Standard Weekday'},
  { id: 'T-LON-02', name: 'London - Express'},
  { id: 'T-MAN-01', name: 'Manchester - All Day'},
];


export default function ZonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Service Zones</h1>
          <p className="text-muted-foreground">
            Define and manage geographic service areas and their assigned resources.
          </p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Zone
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Service Zone</DialogTitle>
                    <DialogDescription>Define a new geographic area. You can draw the zone on the map later.</DialogDescription>
                </DialogHeader>
                 <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="zone-name">Zone Name</Label>
                        <Input id="zone-name" placeholder="e.g., Central London" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zone-city">City</Label>
                        <Input id="zone-city" placeholder="e.g., London" />
                    </div>
                     <DialogFooter>
                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                        <Button type="submit">Create Zone</Button>
                    </DialogFooter>
                </form>
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
                <TableHead>Time Slot Template</TableHead>
                <TableHead>Facilities</TableHead>
                <TableHead>Drivers</TableHead>
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
                  <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-muted-foreground -ml-4">
                                {zone.template} <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {slotTemplates.map(t => (
                                <DropdownMenuItem key={t.id}>{t.name}</DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {zone.facilities} Assigned
                  </TableCell>
                  <TableCell>
                    {zone.drivers} Drivers
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><FilePen className="mr-2 h-4 w-4" /> Edit Zone on Map</DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger><Eye className="mr-2 h-4 w-4" /> Manage Resources</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                               <DropdownMenuItem><Building className="mr-2 h-4 w-4"/> Assign Facilities</DropdownMenuItem>
                               <DropdownMenuItem><Truck className="mr-2 h-4 w-4"/> Assign Drivers</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Zone
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Zone Map</CardTitle>
            <CardDescription>Visual representation of your service zones. (Simulation)</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <Map className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive map of service zones would be displayed here.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

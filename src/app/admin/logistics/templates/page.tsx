
'use client';

import {
  Card,
  CardContent,
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
  MoreHorizontal,
  PlusCircle,
  Trash2,
  FilePen,
  Clock,
  Wrench,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialTemplates = [
  { id: 'T-LON-01', name: 'London - Standard Weekday', country: 'United Kingdom', city: 'London', slotLength: 120, time: '08:00 - 22:00', type: 'Standard', surcharge: 0 },
  { id: 'T-LON-02', name: 'London - Express', country: 'United Kingdom', city: 'London', slotLength: 60, time: '10:00 - 20:00', type: 'Premium', surcharge: 100 },
  { id: 'T-MAN-01', name: 'Manchester - All Day', country: 'United Kingdom', city: 'Manchester', slotLength: 180, time: '09:00 - 21:00', type: 'Standard', surcharge: 0 },
  { id: 'T-JHB-01', name: 'Joburg - Weekday', country: 'South Africa', city: 'Johannesburg', slotLength: 120, time: '08:00 - 20:00', type: 'Standard', surcharge: 0 },
];

export default function TemplatesPage() {
    const [templates, setTemplates] = useState(initialTemplates);
    const [isEditing, setIsEditing] = useState<(typeof initialTemplates)[0] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = (template: (typeof initialTemplates)[0] | null) => {
        setIsEditing(template);
        setIsDialogOpen(true);
    }
    
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        // Delay resetting the editing state to avoid dialog content flicker
        setTimeout(() => {
            setIsEditing(null);
        }, 150);
    }


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Time Slot Templates</h1>
          <p className="text-muted-foreground">
            Manage reusable templates for pickup and delivery time slots, including turnaround rules.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto" onClick={() => handleOpenDialog(null)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Time Slot Template' : 'Create Time Slot Template'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update the details for this template.' : 'Define a new reusable set of time slots and rules for a city.'}
              </DialogDescription>
            </DialogHeader>
            <SlotTemplateForm template={isEditing} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Active Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Slot Length</TableHead>
                <TableHead>Operating Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>{t.city}</TableCell>
                  <TableCell>{t.slotLength} min</TableCell>
                  <TableCell>{t.time}</TableCell>
                  <TableCell>
                    <Badge variant={t.type === 'Premium' ? 'default' : 'secondary'}>{t.type}</Badge>
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
                        <DropdownMenuItem onSelect={() => handleOpenDialog(t)}><FilePen className="mr-2 h-4 w-4" />Edit Template</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
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
    </div>
  );
}

function SlotTemplateForm({template, onClose}: {template: (typeof initialTemplates)[0] | null, onClose: () => void}) {
    const { toast } = useToast();
    const [templateType, setTemplateType] = useState(template?.type || 'Standard');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: template ? "Template Updated!" : "Template Created!",
            description: `The time slot template has been ${template ? 'updated' : 'created'}.`,
        });
        onClose();
    }

    return (
        <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-6" onSubmit={handleSubmit}>
           <div className="space-y-4 p-4 border rounded-lg">
             <h4 className="font-semibold text-base flex items-center gap-2"><Clock/> General Settings</h4>
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input id="template-name" defaultValue={template?.name} placeholder="e.g., London - Weekend Express" required />
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select name="country" defaultValue={template?.country} required>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="South Africa">South Africa</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select name="city" defaultValue={template?.city} required>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="London">London</SelectItem>
                        <SelectItem value="Manchester">Manchester</SelectItem>
                        <SelectItem value="Birmingham">Birmingham</SelectItem>
                        <SelectItem value="Johannesburg">Johannesburg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" defaultValue={template?.time.split(' - ')[0]} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" defaultValue={template?.time.split(' - ')[1]} required />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="slot-length">Slot Length (minutes)</Label>
                <Input id="slot-length" type="number" defaultValue={template?.slotLength} placeholder="e.g., 120" required />
                <p className="text-xs text-muted-foreground">The duration of each bookable window offered to customers (e.g., 120 for a 2-hour slot).</p>
              </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-semibold text-base flex items-center gap-2"><Sparkles/> Service Level</h4>
            <div className="space-y-2">
                <Label htmlFor="template-type">Template Type</Label>
                <Select name="template-type" value={templateType} onValueChange={(value) => setTemplateType(value)}>
                    <SelectTrigger id="template-type">
                        <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Standard">Standard (e.g., Next-day)</SelectItem>
                        <SelectItem value="Premium">Premium (e.g., Same-day Express)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {templateType === 'Premium' && (
                <div className="space-y-2">
                    <Label htmlFor="surcharge">Premium Surcharge (R)</Label>
                    <Input id="surcharge" type="number" placeholder="e.g., 100" defaultValue={template?.surcharge || ''} />
                    <p className="text-xs text-muted-foreground">This flat fee will be added to orders using this template.</p>
                </div>
            )}
             <div className="space-y-2">
                <Label htmlFor="cutoff-time">Order Cut-off Time</Label>
                <Input id="cutoff-time" type="time" defaultValue="14:00" />
                <p className="text-xs text-muted-foreground">Orders placed after this time will be scheduled for the next operational day.</p>
            </div>
          </div>
          
           <div className="space-y-4 p-4 border rounded-lg">
             <h4 className="font-semibold text-base flex items-center gap-2"><Wrench/> Turnaround Rules</h4>
             <div className="space-y-2">
                <Label htmlFor="default-turnaround">Default Turnaround (hours)</Label>
                <Input id="default-turnaround" type="number" defaultValue={48} />
                <p className="text-xs text-muted-foreground">The standard time from collection to delivery if no specific rules apply.</p>
            </div>
            <Separator />
            <p className="text-sm font-medium">Service-Specific Overrides</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="wash-turnaround">Wash &amp; Fold (hours)</Label>
                    <Input id="wash-turnaround" type="number" defaultValue={24} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="dry-clean-turnaround">Dry Cleaning (hours)</Label>
                    <Input id="dry-clean-turnaround" type="number" defaultValue={48} />
                </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 bg-background pt-4 -mb-6 -mx-6 px-6 border-t">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">{template ? 'Save Changes' : 'Create Template'}</Button>
          </DialogFooter>
        </form>
    )
}

    
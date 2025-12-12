
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
  MoreHorizontal,
  PlusCircle,
  Clock,
  Trash2,
  FilePen
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
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialTemplates = [
  { id: 'T-LON-01', name: 'London - Standard Weekday', city: 'London', slotLength: 120, time: '08:00 - 22:00', type: 'Standard' },
  { id: 'T-LON-02', name: 'London - Express', city: 'London', slotLength: 60, time: '10:00 - 20:00', type: 'Premium' },
  { id: 'T-MAN-01', name: 'Manchester - All Day', city: 'Manchester', slotLength: 180, time: '09:00 - 21:00', type: 'Standard' },
];

export default function SlotTemplatesPage() {
    const [templates, setTemplates] = useState(initialTemplates);
    const [isEditing, setIsEditing] = useState<typeof initialTemplates[0] | null>(null);

    const handleOpenDialog = (template: typeof initialTemplates[0] | null) => {
        setIsEditing(template);
    }
    
    const handleCloseDialog = () => {
        setIsEditing(null);
    }


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Time Slot Templates</h1>
          <p className="text-muted-foreground">
            Manage reusable templates for pickup and delivery time slots.
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => handleOpenDialog(null)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Template
        </Button>
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
      
       <Dialog open={isEditing !== null} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Time Slot Template' : 'Create Time Slot Template'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Update the details for this template.' : 'Define a new reusable set of time slots for a city.'}
              </DialogDescription>
            </DialogHeader>
            <SlotTemplateForm template={isEditing} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
    </div>
  );
}

function SlotTemplateForm({template, onClose}: {template: typeof initialTemplates[0] | null, onClose: () => void}) {
    const { toast } = useToast();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: template ? "Template Updated!" : "Template Created!",
            description: `The time slot template has been ${template ? 'updated' : 'created'}.`,
        });
        onClose();
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input id="template-name" defaultValue={template?.name} placeholder="e.g., London - Weekend Express" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select name="city" defaultValue={template?.city.toLowerCase()} required>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="manchester">Manchester</SelectItem>
                <SelectItem value="birmingham">Birmingham</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="same-day" defaultChecked={template?.type === 'Premium'} />
            <label
              htmlFor="same-day"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              This is a premium template (e.g., for same-day service)
            </label>
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">{template ? 'Save Changes' : 'Create Template'}</Button>
          </DialogFooter>
        </form>
    )
}


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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const staff = [
  { name: 'Maria Garcia', role: 'Operator' },
  { name: 'Tom Jones', role: 'Supervisor' },
];

const machines = [
  { id: 'W-01', type: 'Washer', status: 'Available' },
  { id: 'W-02', type: 'Washer', status: 'In Use' },
  { id: 'D-01', type: 'Dryer', status: 'Maintenance' },
];

const supplies = [
    { item: 'Hypoallergenic Detergent', stock: 'Low'},
    { item: 'Standard Detergent', stock: 'Full'},
    { item: 'Fabric Softener', stock: 'Medium'},
];

const statusColors: { [key: string]: string } = {
  Available: 'bg-green-100 text-green-800',
  'In Use': 'bg-blue-100 text-blue-800',
  Maintenance: 'bg-amber-100 text-amber-800',
};

const stockColors: { [key: string]: string } = {
  Low: 'bg-red-100 text-red-800',
  Medium: 'bg-amber-100 text-amber-800',
  Full: 'bg-green-100 text-green-800',
};


export default function ResourcesPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Resources</h1>
        <p className="text-muted-foreground">
          Manage your facility's staff, machines, and supplies.
        </p>
      </div>

      <Tabs defaultValue="staff">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
        </TabsList>
        <TabsContent value="staff">
          <Card>
            <CardHeader className='flex-row items-center justify-between'>
              <CardTitle>Staff Management</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><PlusCircle className="mr-2"/> Add Staff</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="staff-name">Name</Label>
                      <Input id="staff-name" placeholder="e.g. John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff-role">Role</Label>
                      <Select>
                        <SelectTrigger id="staff-role">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operator">Operator</SelectItem>
                          <SelectItem value="supervisor">Supervisor</SelectItem>
                          <SelectItem value="cleaner">Cleaner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add Staff Member</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((s) => (
                    <TableRow key={s.name}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="machines">
          <Card>
            <CardHeader  className='flex-row items-center justify-between'>
              <CardTitle>Machine Status</CardTitle>
               <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><PlusCircle className="mr-2"/> Add Machine</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Machine</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="machine-id">Machine ID</Label>
                      <Input id="machine-id" placeholder="e.g. W-03" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="machine-type">Type</Label>
                      <Select>
                        <SelectTrigger id="machine-type">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="washer">Washer</SelectItem>
                          <SelectItem value="dryer">Dryer</SelectItem>
                          <SelectItem value="press">Press</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add Machine</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machines.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.id}</TableCell>
                      <TableCell>{m.type}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[m.status]}>
                          {m.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="supplies">
           <Card>
            <CardHeader  className='flex-row items-center justify-between'>
              <CardTitle>Supply Inventory</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><PlusCircle className="mr-2"/> Add Supply</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Supply Item</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="supply-item">Item Name</Label>
                      <Input id="supply-item" placeholder="e.g. Stain Remover" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supply-stock">Stock Level</Label>
                      <Select>
                        <SelectTrigger id="supply-stock">
                          <SelectValue placeholder="Select a stock level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="empty">Empty</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Add Supply</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Stock Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplies.map((s) => (
                    <TableRow key={s.item}>
                      <TableCell className="font-medium">{s.item}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={stockColors[s.stock]}>
                          {s.stock}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

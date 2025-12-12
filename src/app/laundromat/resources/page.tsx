
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
import { MoreHorizontal, PlusCircle, Trash2, Edit, Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PhoneNumberInput } from '@/components/ui/phone-number-input';
import QRCode from "react-qr-code";

const initialStaff = [
  { id: 'st-1', name: 'Maria Garcia', role: 'Operator', email: 'maria.g@mainstreetlaundry.com', phone: '+44 20 7946 0958' },
  { id: 'st-2', name: 'Tom Jones', role: 'Supervisor', email: 'tom.j@mainstreetlaundry.com', phone: '+44 20 7946 0959' },
];

const initialMachines = [
  { id: 'W-01', type: 'Washer', status: 'Available' },
  { id: 'W-02', type: 'Washer', status: 'In Use' },
  { id: 'D-01', type: 'Dryer', status: 'Maintenance' },
];

const initialSupplies = [
    { id: 'sup-1', item: 'Hypoallergenic Detergent', stock: 'Low'},
    { id: 'sup-2', item: 'Standard Detergent', stock: 'Full'},
    { id: 'sup-3', item: 'Fabric Softener', stock: 'Medium'},
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
  Empty: 'bg-gray-100 text-gray-800',
};


export default function ResourcesPage() {
    const [staff, setStaff] = useState(initialStaff);
    const [machines, setMachines] = useState(initialMachines);
    const [supplies, setSupplies] = useState(initialSupplies);
  
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
                  <StaffForm />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.role}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Staff Member</DialogTitle>
                                </DialogHeader>
                                <StaffForm staff={s} />
                            </DialogContent>
                        </Dialog>
                      </TableCell>
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
                     <DialogFooter>
                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                        <Button type="submit">Add Machine</Button>
                    </DialogFooter>
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
                    <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {machines.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.id}</TableCell>
                      <TableCell>{m.type}</TableCell>
                      <TableCell>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Badge variant="secondary" className={`${statusColors[m.status]} cursor-pointer`}>
                                {m.status}
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Available</DropdownMenuItem>
                                <DropdownMenuItem>In Use</DropdownMenuItem>
                                <DropdownMenuItem>Maintenance</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                       <TableCell className="text-right">
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DialogTrigger asChild><DropdownMenuItem><Printer className="mr-2 h-4 w-4"/>Print QR Code</DropdownMenuItem></DialogTrigger>
                                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>QR Code for {m.id}</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                    <div className="p-4 bg-white rounded-lg">
                                        <QRCode value={m.id} size={256} />
                                    </div>
                                    <p className="font-mono text-xl">{m.id}</p>
                                    <Button onClick={() => window.print()}><Printer className="mr-2"/> Print</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
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
                     <DialogFooter>
                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                        <Button type="submit">Add Supply</Button>
                    </DialogFooter>
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
                    <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplies.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.item}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Badge variant="secondary" className={`${stockColors[s.stock]} cursor-pointer`}>
                                {s.stock}
                                </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Full</DropdownMenuItem>
                                <DropdownMenuItem>Medium</DropdownMenuItem>
                                <DropdownMenuItem>Low</DropdownMenuItem>
                                <DropdownMenuItem>Empty</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                       <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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

function StaffForm({ staff }: { staff?: typeof initialStaff[0] }) {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: staff ? 'Staff Updated' : 'Staff Added',
            description: `The details for ${staff?.name || 'the new staff member'} have been saved.`,
        });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="staff-name">Name</Label>
                <Input id="staff-name" placeholder="e.g. John Doe" defaultValue={staff?.name} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="staff-email">Email</Label>
                <Input id="staff-email" type="email" placeholder="e.g. john@example.com" defaultValue={staff?.email} required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="staff-phone">Phone Number</Label>
                <PhoneNumberInput />
            </div>
            <div className="space-y-2">
                <Label htmlFor="staff-role">Role</Label>
                <Select defaultValue={staff?.role}>
                    <SelectTrigger id="staff-role">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Operator">Operator</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                        <SelectItem value="Cleaner">Cleaner</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="staff-password">Password</Label>
                <Input id="staff-password" type="password" placeholder={staff ? 'Enter new password to reset' : 'Set initial password'} required={!staff} />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
        </form>
    );
}

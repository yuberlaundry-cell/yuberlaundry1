
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
              <Button size="sm"><PlusCircle className="mr-2"/> Add Staff</Button>
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
              <Button size="sm"><PlusCircle className="mr-2"/> Add Machine</Button>
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
              <Button size="sm"><PlusCircle className="mr-2"/> Add Supply</Button>
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

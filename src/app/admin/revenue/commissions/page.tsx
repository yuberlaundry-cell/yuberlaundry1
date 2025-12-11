
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
  Search,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const defaultRules = [
    { id: 'rule-1', name: 'Platform Fee', appliesTo: 'Laundromat', model: 'Percentage', value: '15%' },
    { id: 'rule-2', name: 'Driver Fee', appliesTo: 'Customer', model: 'Flat Fee', value: 'R15.00' },
    { id: 'rule-3', name: 'Service Fee', appliesTo: 'Customer', model: 'Percentage', value: '5%' },
];

const laundromats = [
    { id: 'L-001', name: 'Speedy Suds'},
    { id: 'L-004', name: 'City Cleaners'},
];

const overrides = [
  { id: 'override-1', laundromatId: 'L-001', laundromatName: 'Speedy Suds', overriddenRule: 'Platform Fee', type: 'Percentage', value: '12%', default: '15%' },
  { id: 'override-2', laundromatId: 'L-004', laundromatName: 'City Cleaners', overriddenRule: 'Platform Fee', type: 'Hybrid', value: 'R10.00 + 10%', default: '15%' },
];

export default function CommissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Commission Rules</h1>
          <p className="text-muted-foreground">
            Manage commission structures for the entire platform.
          </p>
        </div>
      </div>

      <Tabs defaultValue="defaults" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="defaults">Platform Defaults</TabsTrigger>
          <TabsTrigger value="overrides">Laundromat Overrides</TabsTrigger>
        </TabsList>
        <TabsContent value="defaults">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Default Commission Rules</CardTitle>
                <CardDescription>
                  These are the fallback rules applied to all orders unless an
                  override is in place.
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" /> Add Rule
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Default Rule</DialogTitle>
                    </DialogHeader>
                    <DefaultRuleForm />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rule Name</TableHead>
                            <TableHead>Applies To</TableHead>
                            <TableHead>Model</TableHead>
                            <TableHead>Rate</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {defaultRules.map((rule) => (
                            <TableRow key={rule.id}>
                                <TableCell className="font-medium">{rule.name}</TableCell>
                                <TableCell><Badge variant="outline">{rule.appliesTo}</Badge></TableCell>
                                <TableCell>{rule.model}</TableCell>
                                <TableCell className="font-semibold">{rule.value}</TableCell>
                                <TableCell className="text-right">
                                     <Dialog>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DialogTrigger asChild>
                                                    <DropdownMenuItem>Edit Rule</DropdownMenuItem>
                                                </DialogTrigger>
                                                <DropdownMenuItem className="text-destructive">Delete Rule</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                         <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Default Rule</DialogTitle>
                                            </DialogHeader>
                                            <DefaultRuleForm rule={rule} />
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
        <TabsContent value="overrides">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div>
                    <CardTitle>Laundromat-Specific Overrides</CardTitle>
                    <CardDescription>Custom commission rules for specific partners.</CardDescription>
               </div>
               <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search laundromats..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                             <Button>
                                <PlusCircle /> Add Override
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Laundromat Override</DialogTitle>
                            </DialogHeader>
                            <OverrideRuleForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Laundromat</TableHead>
                    <TableHead>Overridden Rule</TableHead>
                    <TableHead>New Rate</TableHead>
                    <TableHead>Platform Default</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overrides.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.laundromatName}</TableCell>
                      <TableCell><Badge variant="secondary">{o.overriddenRule}</Badge></TableCell>
                      <TableCell className="font-semibold">{o.value}</TableCell>
                      <TableCell className="text-muted-foreground">{o.default}</TableCell>
                      <TableCell>
                         <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>Edit Override</DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuItem className="text-destructive">Remove Override</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Laundromat Override</DialogTitle>
                                </DialogHeader>
                                <OverrideRuleForm override={o} />
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
      </Tabs>
    </div>
  );
}

function DefaultRuleForm({ rule }: { rule?: typeof defaultRules[0] }) {
    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input id="rule-name" placeholder="e.g. Platform Fee" defaultValue={rule?.name} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="applies-to">Applies To</Label>
                <Select name="applies-to" defaultValue={rule?.appliesTo}>
                    <SelectTrigger id="applies-to">
                        <SelectValue placeholder="Select who this fee applies to" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Customer">Customer</SelectItem>
                        <SelectItem value="Laundromat">Laundromat</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="commission-model">Model</Label>
                <Select name="commission-model" defaultValue={rule?.model}>
                    <SelectTrigger id="commission-model">
                        <SelectValue placeholder="Select commission model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Percentage">Percentage (%)</SelectItem>
                        <SelectItem value="Flat Fee">Flat Fee (R)</SelectItem>
                        <SelectItem value="Hybrid">Hybrid (R + %)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="rate">Rate</Label>
                <Input id="rate" placeholder="e.g. 15 or 10 + 5" defaultValue={rule?.value.replace('%','').replace('R','')} />
            </div>
            <DialogFooter>
                <Button type="submit">{rule ? 'Save Changes' : 'Create Rule'}</Button>
            </DialogFooter>
        </form>
    )
}

function OverrideRuleForm({ override }: { override?: typeof overrides[0] }) {
     return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="laundromat">Laundromat</Label>
                <Select name="laundromat" defaultValue={override?.laundromatId}>
                    <SelectTrigger id="laundromat">
                        <SelectValue placeholder="Select a laundromat" />
                    </SelectTrigger>
                    <SelectContent>
                        {laundromats.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="rule-to-override">Rule to Override</Label>
                <Select name="rule-to-override" defaultValue={override?.overriddenRule}>
                    <SelectTrigger id="rule-to-override">
                        <SelectValue placeholder="Select a rule" />
                    </SelectTrigger>
                    <SelectContent>
                        {defaultRules.map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="override-commission-model">New Model</Label>
                <Select name="override-commission-model" defaultValue={override?.type}>
                    <SelectTrigger id="override-commission-model">
                        <SelectValue placeholder="Select commission model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Percentage">Percentage (%)</SelectItem>
                        <SelectItem value="Flat Fee">Flat Fee (R)</SelectItem>
                        <SelectItem value="Hybrid">Hybrid (R + %)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="override-rate">New Rate</Label>
                <Input id="override-rate" placeholder="e.g. 12 or 5 + 8" defaultValue={override?.value.replace('%','').replace('R','')} />
            </div>
            <DialogFooter>
                <Button type="submit">{override ? 'Save Changes' : 'Create Override'}</Button>
            </DialogFooter>
        </form>
    )
}

    

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
  Percent,
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

const overrides = [
  { id: 'L-001', name: 'Speedy Suds', type: 'Percentage', value: '18%', default: '20%' },
  { id: 'L-004', name: 'City Cleaners', type: 'Hybrid', value: 'R10.00 + 12%', default: '20%' },
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
            <CardHeader>
              <CardTitle>Default Commission Structure</CardTitle>
              <CardDescription>
                This is the fallback commission applied to all orders unless an
                override is in place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="max-w-md space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-commission-type">
                    Commission Model
                  </Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger id="default-commission-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat-fee">Flat Fee</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="default-commission-value">
                    Commission Rate
                  </Label>
                  <div className="relative">
                     <Input
                        id="default-commission-value"
                        type="number"
                        defaultValue="20"
                        className="pr-8"
                    />
                    <Percent className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <Button>Save Default Commission</Button>
              </form>
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
                    <Button>
                        <PlusCircle /> Add Override
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Laundromat</TableHead>
                    <TableHead>Commission Type</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Platform Default</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overrides.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{o.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{o.value}</TableCell>
                      <TableCell className="text-muted-foreground">{o.default}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Override</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove Override
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

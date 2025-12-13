
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockBusinessEmployees } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, MoreHorizontal, ChevronDown, Upload, Download } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PhoneNumberInput } from "@/components/ui/phone-number-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const statusStyles: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-800',
};

const roleStyles: { [key: string]: string } = {
    Admin: 'bg-blue-100 text-blue-800',
    Employee: 'bg-indigo-100 text-indigo-800',
    Manager: 'bg-purple-100 text-purple-800',
}

export default function EmployeesPage() {
    const router = useRouter();
    const { toast } = useToast();

     const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Employee Invited!",
            description: "An invitation has been sent to the employee to join the company account.",
        });
        // In a real app, you would close the dialog here.
    }

    return (
        <div className="space-y-8 pb-8">
            <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Employees</h1>
                        <p className="text-muted-foreground">Manage your company’s laundry participants.</p>
                    </div>
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Upload className="mr-2 h-4 w-4" /> Import/Export <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Upload className="mr-2 h-4 w-4" /> Import from CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" /> Export to CSV
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog>
                            <DialogTrigger asChild>
                                 <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Employee
                                </Button>
                            </DialogTrigger>
                             <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Add a new employee</DialogTitle>
                                    <DialogDescription>
                                        Invite a new team member to use the company's Yuber Laundry benefit.
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="space-y-6 max-h-[70vh] overflow-y-auto pr-6" onSubmit={handleAddEmployee}>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="first-name">First Name</Label>
                                            <Input id="first-name" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="last-name">Last Name</Label>
                                            <Input id="last-name" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="john.doe@company.com" required/>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <PhoneNumberInput />
                                        </div>
                                    </div>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="role">Role</Label>
                                            <Select required>
                                                <SelectTrigger id="role">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="employee">Employee</SelectItem>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department (optional)</Label>
                                            <Input id="department" placeholder="e.g., Engineering" />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                         <div className="space-y-2">
                                            <Label htmlFor="monthly-allowance">Monthly Allowance (R)</Label>
                                            <Input id="monthly-allowance" type="number" placeholder="e.g., 2000" required/>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="per-order-limit">Per-Order Limit (R) (optional)</Label>
                                            <Input id="per-order-limit" type="number" placeholder="e.g., 500" />
                                        </div>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="notes">Notes (optional)</Label>
                                        <Textarea id="notes" placeholder="Any internal notes about this employee." />
                                    </div>

                                    <DialogFooter>
                                        <Button type="submit">Send Invite & Add Employee</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                         <div className="relative flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                            type="search"
                            placeholder="Search by name or email..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                    Status: All <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>All</DropdownMenuItem>
                                    <DropdownMenuItem>Active</DropdownMenuItem>
                                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                    Role: All <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>All</DropdownMenuItem>
                                    <DropdownMenuItem>Employee</DropdownMenuItem>
                                    <DropdownMenuItem>Manager</DropdownMenuItem>
                                    <DropdownMenuItem>Admin</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Allowance</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total Orders</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockBusinessEmployees.map((employee) => (
                                <TableRow key={employee.id} className="cursor-pointer" onClick={() => router.push(`/business/employees/${employee.id}`)}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="font-medium">{employee.name}</span>
                                                <div className="text-sm text-muted-foreground">{employee.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={roleStyles[employee.role]}>{employee.role}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">R{employee.allowance.monthly.toFixed(2)}</div>
                                        <div className="text-sm text-muted-foreground">monthly</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={statusStyles[employee.status]}>{employee.status}</Badge>
                                    </TableCell>
                                    <TableCell>{employee.totalOrders}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => router.push(`/business/employees/${employee.id}`)}>View Details</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => router.push(`/business/employees/${employee.id}/edit`)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
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
    )
}

    
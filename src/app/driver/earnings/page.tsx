
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DollarSign, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const earningsSummary = [
    { title: "Today's Earnings", amount: "$85.50" },
    { title: "This Week", amount: "$450.75" },
    { title: "This Month", amount: "$1,820.00" },
];

const jobs = [
    { id: 'PU-123', date: 'Today', base: '$10.00', tip: '$5.00', total: '$15.00'},
    { id: 'DO-455', date: 'Yesterday', base: '$12.00', tip: '$2.50', total: '$14.50'},
    { id: 'PU-122', date: 'Yesterday', base: '$10.00', tip: '$0.00', total: '$10.00'},
];

const payouts = [
    { date: 'May 10, 2024', amount: '$430.25', status: 'Paid'},
    { date: 'May 3, 2024', amount: '$510.50', status: 'Paid'},
];

export default function EarningsPage() {
    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Earnings</h1>
                <p className="text-muted-foreground">Track your payments and job history.</p>
            </div>
            
             <div className="grid gap-4 md:grid-cols-3">
                {earningsSummary.map(summary => (
                    <Card key={summary.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{summary.title}</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{summary.amount}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="jobs">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="jobs">Jobs Breakdown</TabsTrigger>
                    <TabsTrigger value="payouts">Payouts</TabsTrigger>
                </TabsList>
                <TabsContent value="jobs">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Jobs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Job ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Base Pay</TableHead>
                                        <TableHead>Tips</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobs.map(job => (
                                        <TableRow key={job.id}>
                                            <TableCell className="font-medium">{job.id}</TableCell>
                                            <TableCell>{job.date}</TableCell>
                                            <TableCell>{job.base}</TableCell>
                                            <TableCell>{job.tip}</TableCell>
                                            <TableCell className="font-semibold">{job.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payouts">
                     <Card>
                        <CardHeader>
                            <CardTitle>Recent Payouts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {payouts.map(payout => (
                                <div key={payout.date} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-semibold">{payout.amount}</p>
                                        <p className="text-sm text-muted-foreground">Paid on {payout.date}</p>
                                    </div>
                                    <Button variant="outline" size="icon">
                                        <Download className="h-4 w-4"/>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    )
}

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GitBranch, Server, Terminal, Rocket, Webhook } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DevToolsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Developer Tools</h1>
        <p className="text-muted-foreground">
          Internal tools for environment configuration, testing, and debugging.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
            <CardDescription>Select the active environment for testing and configuration.</CardDescription>
        </CardHeader>
        <CardContent>
             <Select defaultValue="staging">
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select an environment" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="production">
                        <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-green-500"/> Production
                        </div>
                    </SelectItem>
                    <SelectItem value="staging">
                        <div className="flex items-center gap-2">
                             <Server className="h-4 w-4 text-amber-500"/> Staging
                        </div>
                    </SelectItem>
                     <SelectItem value="development">
                        <div className="flex items-center gap-2">
                             <Server className="h-4 w-4 text-blue-500"/> Development
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </CardContent>
      </Card>
      
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card>
             <CardHeader>
                <CardTitle>Build & Release</CardTitle>
                <CardDescription>Manage platform deployments and releases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                        <Rocket className="h-5 w-5" />
                        <div>
                            <p className="font-semibold">Current Production Release</p>
                            <p className="text-sm text-muted-foreground">v2.1.3 - Deployed 4 hours ago</p>
                        </div>
                    </div>
                     <Button variant="outline" size="sm">View History</Button>
                </div>
                 <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                        <GitBranch className="h-5 w-5" />
                        <div>
                            <p className="font-semibold">Staging Branch</p>
                            <p className="text-sm text-muted-foreground">feat/new-billing-module</p>
                        </div>
                    </div>
                     <Button variant="outline" size="sm">Deploy</Button>
                </div>
                <Button variant="destructive" className="w-full">Initiate Rollback</Button>
            </CardContent>
        </Card>
         <Card>
             <CardHeader>
                <CardTitle>Webhook Tester</CardTitle>
                <CardDescription>Send test payloads to webhook endpoints.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a webhook event..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="order.created">order.created</SelectItem>
                        <SelectItem value="payment.succeeded">payment.succeeded</SelectItem>
                        <SelectItem value="driver.assigned">driver.assigned</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full">
                    <Webhook className="mr-2" /> Send Test Webhook
                </Button>
                 <Separator />
                <Button variant="secondary" className="w-full">
                    <Terminal className="mr-2" /> View Webhook Logs
                </Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}

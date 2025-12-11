
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function RoutingSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Routing Rules</h1>
        <p className="text-muted-foreground">
          Configure global parameters for route optimization and dispatch.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Optimization</CardTitle>
          <CardDescription>
            Settings that control how driver routes are generated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 max-w-lg">
          <div className="space-y-2">
            <Label htmlFor="max-orders">Max Orders Per Route</Label>
            <Input id="max-orders" type="number" defaultValue="8" />
            <p className="text-xs text-muted-foreground">
              The maximum number of jobs (pickups or deliveries) in a single driver route.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-distance">Max Route Distance (km)</Label>
            <Input id="max-distance" type="number" defaultValue="25" />
             <p className="text-xs text-muted-foreground">
              The maximum travel distance for a single optimized route.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="buffer-time">Buffer Time Between Jobs (minutes)</Label>
            <Input id="buffer-time" type="number" defaultValue="10" />
            <p className="text-xs text-muted-foreground">
                Time added between jobs to account for delays and parking.
            </p>
          </div>
          <Button>Save Optimization Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dispatch Automation</CardTitle>
          <CardDescription>
            Rules for automatic dispatching of orders to drivers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-lg">
           <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
              <Label htmlFor="auto-dispatch" className="text-base">
                  Enable Auto-Dispatch
              </Label>
              <p className="text-sm text-muted-foreground">
                  Automatically assign routes to available drivers.
              </p>
              </div>
              <Switch id="auto-dispatch" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cutoff-time">Dispatch Cutoff Time</Label>
            <Input id="cutoff-time" type="time" defaultValue="21:00" />
            <p className="text-xs text-muted-foreground">
                The latest time a same-day order can be dispatched.
            </p>
          </div>
           <Button>Save Dispatch Settings</Button>
        </CardContent>
      </Card>
       <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Manual Overrides</CardTitle>
          <CardDescription>
            Force actions on the routing system. Use with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4">
              <div>
                  <p className="font-semibold">Re-optimize All Routes</p>
                  <p className="text-sm text-muted-foreground">Force a recalculation of all active and pending routes.</p>
              </div>
                <Button variant="destructive" className="mt-2 sm:mt-0">Run Re-optimization</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

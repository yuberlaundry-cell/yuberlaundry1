
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
import { Badge } from '@/components/ui/badge';

const highRiskEntities = [
    { id: 'D-45', name: 'Alex Ray', type: 'Driver', riskScore: 92, reason: 'Low acceptance rate, 2 recent complaints' },
    { id: 'L-03', name: 'Fresh Folds', type: 'Laundromat', riskScore: 88, reason: 'High damage report rate (3.5%)' },
    { id: 'D-18', name: 'Ken Watanabe', type: 'Driver', riskScore: 85, reason: 'Multiple late pickups' },
];

export default function HighRiskEntitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
          High-Risk Entities
        </h1>
        <p className="text-muted-foreground">
          A prioritized list of partners and drivers requiring compliance review.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Entities Flagged for Review</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Entity</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Reason</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {highRiskEntities.map(entity => (
                        <TableRow key={entity.id}>
                            <TableCell className="font-medium">{entity.name} ({entity.id})</TableCell>
                            <TableCell>{entity.type}</TableCell>
                            <TableCell>
                                <Badge variant="destructive">{entity.riskScore}</Badge>
                            </TableCell>
                            <TableCell>{entity.reason}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

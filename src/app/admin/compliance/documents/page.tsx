
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

const expiringDocuments = [
    { entity: 'Driver D-45', type: 'Driver License', expiry: 'in 5 days', status: 'Expiring Soon' },
    { entity: 'Laundromat L-12', type: 'Health Permit', expiry: 'in 12 days', status: 'Expiring Soon' },
    { entity: 'Driver D-12', type: 'Vehicle Insurance', expiry: 'in 25 days', status: 'Expiring Soon' },
];

export default function ExpiringDocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">
          Expiring Documents
        </h1>
        <p className="text-muted-foreground">
          Track and manage compliance documents that are nearing their expiration date.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Documents Expiring in Next 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Entity</TableHead>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {expiringDocuments.map((doc, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{doc.entity}</TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.expiry}</TableCell>
                            <TableCell>
                                <Badge variant="destructive">{doc.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}

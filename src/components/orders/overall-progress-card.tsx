
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function OverallProgressCard({ progress }: { progress: number }) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Overall Progress</h3>
                    <span className="font-bold text-lg">{progress}%</span>
                </div>
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground mt-2">Estimated completion: Tomorrow, 10:00 AM</p>
            </CardContent>
        </Card>
    );
}

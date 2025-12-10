
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Droplet } from "lucide-react";

export function WaterSavedCard() {
    return (
         <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <Droplet className="h-6 w-6 text-green-600" />
            <div>
                <p className="font-bold text-green-800 text-lg">25L</p>
                <p className="text-sm text-green-700">Water saved this wash</p>
            </div>
        </div>
    );
}

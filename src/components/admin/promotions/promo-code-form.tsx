
'use client';

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import React from 'react';

export interface Promotion {
    id: string;
    code: string;
    value: string;
    type: 'percentage' | 'fixed';
    uses: number;
    limit: number | null;
    status: 'Active' | 'Expired';
    expiryDate?: Date | null;
}

interface PromoCodeFormProps {
    promo: Promotion | null;
    onSave: (data: any) => void;
}

export function PromoCodeForm({ promo, onSave }: PromoCodeFormProps) {
    const [expiryDate, setExpiryDate] = React.useState<Date | undefined>(promo?.expiryDate || undefined);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            code: formData.get('promo-code'),
            value: formData.get('promo-value'),
            type: formData.get('promo-type'),
            limit: formData.get('promo-limit') ? Number(formData.get('promo-limit')) : null,
            expiryDate: expiryDate
        };
        onSave(data);
    }
    
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="promo-code">Promo Code</Label>
                    <div className="flex items-center gap-2">
                        <Input id="promo-code" name="promo-code" defaultValue={promo?.code} placeholder="e.g., LAUNCH25" required />
                        <Button variant="ghost" size="icon" type="button"><RefreshCw className="h-4 w-4"/></Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="promo-type">Type</Label>
                    <Select name="promo-type" defaultValue={promo?.type}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                            <SelectItem value="fixed">Fixed Amount (R)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="promo-value">Value</Label>
                <Input id="promo-value" name="promo-value" defaultValue={promo?.value} type="number" placeholder="e.g., 25 or 100" required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="promo-limit">Usage Limit</Label>
                <Input id="promo-limit" name="promo-limit" defaultValue={promo?.limit || ''} type="number" placeholder="Leave blank for unlimited" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="promo-expiry">Expiry Date (optional)</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                             {expiryDate ? format(expiryDate, "PPP") : "Select a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} />
                    </PopoverContent>
                </Popover>
            </div>
            <DialogFooter>
                <Button type="submit">{promo ? 'Save Changes' : 'Create & Activate'}</Button>
            </DialogFooter>
        </form>
    );
}


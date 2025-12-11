
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function RateExperienceCard() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { toast } = useToast();

    const handleSubmit = () => {
        toast({
            title: "Feedback Submitted",
            description: "Thank you for sharing your experience with us!",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rate Your Experience</CardTitle>
                <CardDescription>Help us improve by sharing your feedback on this order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={cn(
                                "h-10 w-10 cursor-pointer transition-colors",
                                (hoverRating >= star || rating >= star)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            )}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                <Textarea placeholder="Tell us more about your experience... (optional)" />
                <Button className="w-full" onClick={handleSubmit} disabled={rating === 0}>Submit Review</Button>
            </CardContent>
        </Card>
    );
}

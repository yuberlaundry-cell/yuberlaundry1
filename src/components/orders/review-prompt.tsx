'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export function ReviewPrompt() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>How was your experience?</CardTitle>
                <CardDescription>Rate your recent order to help us improve.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <Star
                                className={cn(
                                    "h-8 w-8 cursor-pointer transition-colors",
                                    star <= (hoverRating || rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                )}
                            />
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <div className="space-y-2">
                        <Textarea placeholder="Tell us more about your experience (optional)..." />
                        <Button className="w-full">Submit Review</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

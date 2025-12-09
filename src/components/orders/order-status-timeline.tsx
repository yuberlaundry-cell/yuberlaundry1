import { CheckCircle, Circle, Dot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { type TimelineEvent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function OrderStatusTimeline({ timeline }: { timeline: TimelineEvent[] }) {

    const activeIndex = timeline.slice().reverse().findIndex(event => event.status === 'completed');
    const currentStepIndex = activeIndex === -1 ? 0 : timeline.length - 1 - activeIndex;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="relative border-l border-border ml-3.5">
                    {timeline.map((event, index) => {
                        const isCompleted = event.status === 'completed';
                        const isCurrent = index === currentStepIndex;

                        return (
                            <li key={event.title} className="mb-8 ml-8">
                                <span className={cn(
                                    "absolute -left-[1.1rem] flex items-center justify-center w-8 h-8 rounded-full ring-8 ring-background",
                                    isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                                    isCurrent && "bg-primary text-primary-foreground animate-pulse"
                                )}>
                                    {isCompleted || isCurrent ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                                </span>
                                <div className={cn(isCurrent ? "font-semibold" : "text-muted-foreground")}>
                                    <h3 className={cn("font-semibold", isCompleted || isCurrent ? "text-foreground" : "")}>{event.title}</h3>
                                    <time className="block text-sm font-normal leading-none">{event.timestamp}</time>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </CardContent>
        </Card>
    );
}

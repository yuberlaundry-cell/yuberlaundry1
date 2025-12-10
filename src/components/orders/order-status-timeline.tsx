
import { CheckCircle, Circle, Loader } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { type TimelineEvent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap = {
    completed: <CheckCircle className="h-6 w-6 text-green-500" />,
    'in-progress': <Loader className="h-6 w-6 text-blue-500 animate-spin" />,
    pending: <Circle className="h-6 w-6 text-gray-300" />,
}

export function OrderStatusTimeline({ timeline }: { timeline: TimelineEvent[] }) {

    return (
        <Card>
            <CardContent className="p-6">
                <ol className="space-y-4">
                    {timeline.slice(4).map((event, index) => { // Slicing to match the design
                        const isLast = index === timeline.slice(4).length - 1;
                        return (
                            <li key={event.title} className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="flex-shrink-0">
                                         {iconMap[event.status]}
                                    </div>
                                    {!isLast && <div className="w-px h-8 bg-border mt-1" />}
                                </div>
                                <div className="pt-0.5">
                                    <p className={cn(
                                        "font-semibold",
                                        event.status === 'pending' && "text-muted-foreground"
                                    )}>{event.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {event.status === 'completed' ? 'Completed' : event.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </CardContent>
        </Card>
    );
}

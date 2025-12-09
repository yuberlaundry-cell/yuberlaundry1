import { LifeBuoy } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function SupportCard() {
    return (
        <Card className="bg-muted/50 border-dashed">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                    <div className="bg-background rounded-full p-3 border">
                        <LifeBuoy className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                    If you have any issues with your order, please let us know.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full">Report an Issue</Button>
            </CardContent>
        </Card>
    );
}

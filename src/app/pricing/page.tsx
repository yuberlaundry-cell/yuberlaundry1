
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pricingTiers = [
    {
        name: "Pay as you go",
        price: "R40.00",
        unit: "per kg",
        description: "Perfect for occasional use. No commitment.",
        features: ["Wash & Fold", "Standard detergent", "2-day turnaround", "Online tracking"],
        cta: "Schedule Pickup"
    },
    {
        name: "Plus Subscription",
        price: "R450",
        unit: "per month",
        description: "Best value for regulars. Save on every order.",
        features: ["Up to 20kg included", "Free pickup & delivery", "Premium detergents", "Next-day turnaround"],
        cta: "Subscribe Now",
        popular: true
    },
    {
        name: "Dry Cleaning",
        price: "From R80",
        unit: "per item",
        description: "For your delicate and special care items.",
        features: ["Shirts, suits, dresses", "Specialty item care", "Eco-friendly cleaning", "Itemized receipts"],
        cta: "View Item Prices"
    }
]

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Simple, transparent pricing</h1>
                    <p className="mt-4 text-lg text-muted-foreground">Choose a plan that works for you. No hidden fees, ever.</p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3 items-start">
                    {pricingTiers.map(tier => (
                        <Card key={tier.name} className={tier.popular ? "border-2 border-primary shadow-lg" : ""}>
                            {tier.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
                            <CardHeader>
                                <CardTitle>{tier.name}</CardTitle>
                                <CardDescription>{tier.description}</CardDescription>
                                <div className="flex items-baseline pt-4">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="ml-1 text-muted-foreground">{tier.unit}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    {tier.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-primary" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full" variant={tier.popular ? "default" : "outline"}>{tier.cta}</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

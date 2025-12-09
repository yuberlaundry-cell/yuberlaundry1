import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cta() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Reclaim Your Time?</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Sign up today and experience the easiest laundry day you've ever had.
          Your first pickup is just a few clicks away.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/register">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ValueProp() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-headline">Your laundry, reimagined</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Schedule quickly, clean professionally, deliver reliably — all with Yuber Laundry.
        </p>
        <div className="mt-8">
          <Button size="lg" variant="default" className="font-semibold" asChild>
            <Link href="/auth/register">Schedule your pickup</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

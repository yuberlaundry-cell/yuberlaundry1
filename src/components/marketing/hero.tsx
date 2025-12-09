import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
          Laundry day, done.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90">
          Say goodbye to laundry stress. We pick up your clothes and deliver them back fresh, clean, and perfectly folded.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Schedule a Pickup</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

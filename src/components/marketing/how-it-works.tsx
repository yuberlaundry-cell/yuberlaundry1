import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Truck, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: '1. Schedule a Pickup',
    description: 'Choose a time that works for you. Our drivers are ready when you are.',
    imageId: 'how-it-works-1',
  },
  {
    icon: Truck,
    title: '2. We Collect & Clean',
    description: 'A friendly driver collects your laundry. Our experts handle the washing with care.',
    imageId: 'how-it-works-2',
  },
  {
    icon: Sparkles,
    title: '3. We Deliver Freshness',
    description: 'Get your clean, folded laundry delivered back to your door. It’s that simple!',
    imageId: 'how-it-works-3',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fresh laundry in just three simple steps.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const image = PlaceHolderImages.find((p) => p.id === step.imageId);
            return (
              <Card key={step.title} className="text-center">
                <CardHeader>
                  {image && (
                     <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            data-ai-hint={image.imageHint}
                            width={600}
                            height={400}
                            className="object-cover"
                        />
                    </div>
                  )}
                  <CardTitle className="flex items-center justify-center gap-3 font-headline">
                    <step.icon className="h-6 w-6 text-primary" />
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

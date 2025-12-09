import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Busy Professional',
    quote: "Yuber Laundry is a lifesaver! I get my weekends back, and my clothes have never looked better. The convenience is unbeatable.",
    imageId: 'testimonial-1',
  },
  {
    name: 'Mike P.',
    role: 'Parent of Three',
    quote: "With three kids, laundry was a mountain I could never conquer. Now, it's one less thing to worry about. The service is reliable and top-notch.",
    imageId: 'testimonial-2',
  },
  {
    name: 'Chloe T.',
    role: 'Startup Founder',
    quote: "As a business, offering laundry service as a perk has been a huge win for our team. Yuber's business portal makes it incredibly easy to manage.",
    imageId: 'testimonial-3',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Loved by our Customers</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what people are saying about us.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => {
            const image = PlaceHolderImages.find((p) => p.id === testimonial.imageId);
            return (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="italic text-foreground/80">"{testimonial.quote}"</blockquote>
                  <div className="mt-4 flex items-center gap-4">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

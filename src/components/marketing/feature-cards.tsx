import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ShoppingBasket, SparklesIcon, Truck } from 'lucide-react';

const features = [
  {
    title: 'Schedule',
    superText: '60 sec',
    subText: 'Book now',
    badgeText: 'Pickup scheduled',
    badgeSubText: 'Just now',
    badgeValue: '15 items',
    badgeIcon: ShoppingBasket,
    bgColor: 'bg-amber-100',
    imageUrl: 'https://picsum.photos/seed/feature1/600/800',
    imageHint: 'scheduling booking',
  },
  {
    title: 'Professional',
    superText: 'Expert care',
    subText: 'Our services',
    badgeText: 'Dry cleaning',
    badgeSubText: '10:45 AM',
    badgeValue: '-£25.50',
    badgeIcon: SparklesIcon,
    bgColor: 'bg-gray-200',
    imageUrl: 'https://picsum.photos/seed/feature2/600/800',
    imageHint: 'folded clothes'
  },
  {
    title: 'Delivery',
    superText: '24 hours',
    subText: 'Track order',
    badgeText: 'Delivered',
    badgeSubText: 'Yesterday',
    badgeValue: '+ £5.00 tip',
    badgeIcon: Truck,
    bgColor: 'bg-slate-800',
    imageUrl: 'https://picsum.photos/seed/feature3/600/800',
    imageHint: 'delivery courier'
  },
];

export function FeatureCards() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className={`relative overflow-hidden group ${feature.bgColor} text-foreground rounded-2xl shadow-lg`}>
                <div className="relative aspect-[3/4] flex flex-col justify-center items-center text-center p-8">
                     <p className='text-sm font-semibold'>{feature.title}</p>
                     <h3 className="font-headline font-bold text-6xl my-2 leading-none">{feature.superText}</h3>
                     <Button variant="secondary" className="rounded-full mt-2 bg-black/20 text-white backdrop-blur-sm border-white/20 border hover:bg-black/40">{feature.subText}</Button>
                     <Image
                        src={feature.imageUrl}
                        alt={feature.title}
                        data-ai-hint={feature.imageHint}
                        fill
                        className="object-cover -z-10 opacity-30 group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-3 bg-card/80 backdrop-blur-sm absolute bottom-4 left-4 right-4 rounded-xl shadow-md">
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center gap-2">
                            <feature.badgeIcon className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-semibold">{feature.badgeText}</p>
                                <p className="text-xs text-muted-foreground">{feature.badgeSubText}</p>
                            </div>
                        </div>
                        <p className="text-sm font-semibold">{feature.badgeValue}</p>
                    </div>
                </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

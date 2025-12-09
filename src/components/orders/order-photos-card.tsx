'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Camera } from 'lucide-react';

const photos = [
  {
    type: 'Pickup',
    url: 'https://picsum.photos/seed/pickup1/400/300',
    hint: 'laundry bags'
  },
  {
    type: 'Delivery',
    url: 'https://picsum.photos/seed/delivery1/400/300',
    hint: 'clean laundry'
  },
];

export function OrderPhotosCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Photos</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div key={photo.type}>
            <h3 className="text-sm font-medium mb-2">{photo.type}</h3>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <Image
                src={photo.url}
                alt={`${photo.type} photo`}
                fill
                className="object-cover"
                data-ai-hint={photo.hint}
              />
            </div>
          </div>
        ))}
         {photos.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
                <Camera className="h-8 w-8 mx-auto mb-2" />
                <p>No photos have been uploaded for this order yet.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}

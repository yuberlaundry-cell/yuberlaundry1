'use client';

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const steps = [
  { id: 'address', name: 'Address' },
  { id: 'schedule', name: 'Schedule' },
  { id: 'services', name: 'Services' },
  { id: 'instructions', name: 'Instructions' },
  { id: 'review', name: 'Review & Pay' },
];

export function BookingHeader() {
  const pathname = usePathname();
  const currentPathSegment = pathname.split('/').pop() || 'address';
  
  const currentStepIndex = steps.findIndex(step => step.id === currentPathSegment);

  return (
    <div className="w-full bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
                 <Button variant="ghost" asChild>
                    <Link href="/app">&larr; Back to Dashboard</Link>
                </Button>
                <nav className="hidden md:flex" aria-label="Progress">
                    <ol role="list" className="flex items-center space-x-8">
                    {steps.map((step, stepIdx) => (
                        <li key={step.name} className={cn("flex-1", stepIdx !== steps.length - 1 ? "md:flex" : "hidden md:flex")}>
                        {stepIdx < currentStepIndex ? (
                            <Link href={`/app/book/${step.id}`} className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors hover:border-primary">
                                <span className="text-sm font-medium text-primary transition-colors ">{step.name}</span>
                            </Link>
                        ) : stepIdx === currentStepIndex ? (
                            <Link href={`/app/book/${step.id}`} className="flex w-full flex-col border-l-4 border-primary py-2 pl-4" aria-current="step">
                                <span className="text-sm font-medium text-primary">{step.name}</span>
                            </Link>
                        ) : (
                            <Link href={`/app/book/${step.id}`} className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors hover:border-gray-300">
                                <span className="text-sm font-medium text-gray-500 transition-colors">{step.name}</span>
                            </Link>
                        )}
                        </li>
                    ))}
                    </ol>
                </nav>
                 <div className="w-[150px] hidden md:block" />
            </div>
            {/* Mobile progress bar */}
            <div className="md:hidden pb-4">
                <p className="text-sm font-medium text-center">{`Step ${currentStepIndex + 1} of ${steps.length}: ${steps[currentStepIndex].name}`}</p>
                <div className="mt-2 flex items-center space-x-2">
                    {steps.map((step, index) => (
                        <div key={step.id} className={cn("h-1 flex-1 rounded-full", index <= currentStepIndex ? 'bg-primary' : 'bg-gray-200')}></div>
                    ))}
                </div>
            </div>
        </div>

    </div>
  );
}

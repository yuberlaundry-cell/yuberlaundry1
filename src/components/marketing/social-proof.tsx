import { Globe } from 'lucide-react';

const logos = [
  { name: 'TechCorp', icon: Globe },
  { name: 'Innovate Inc.', icon: Globe },
  { name: 'Future Systems', icon: Globe },
  { name: 'NextGen Solutions', icon: Globe },
  { name: 'Global Ventures', icon: Globe },
];

export function SocialProof() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Trusted by leading companies
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
          {logos.map((logo) => (
            <div key={logo.name} className="flex justify-center items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <logo.icon className="h-6 w-6" />
              <span className="font-semibold text-lg">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

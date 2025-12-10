import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import Hero from "@/components/marketing/hero";
import { ValueProp } from "@/components/marketing/value-prop";
import { FeatureCards } from "@/components/marketing/feature-cards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <Hero />
        <ValueProp />
        <FeatureCards />
      </main>
      <PublicFooter />
    </div>
  );
}

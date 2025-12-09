import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { NewHero } from "@/components/marketing/new-hero";
import { ValueProp } from "@/components/marketing/value-prop";
import { FeatureCards } from "@/components/marketing/feature-cards";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <NewHero />
        <ValueProp />
        <FeatureCards />
      </main>
      <PublicFooter />
    </div>
  );
}

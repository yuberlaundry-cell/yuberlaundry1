import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { SocialProof } from "@/components/marketing/social-proof";
import { Testimonials } from "@/components/marketing/testimonials";
import { Cta } from "@/components/marketing/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Testimonials />
        <Cta />
      </main>
      <PublicFooter />
    </div>
  );
}

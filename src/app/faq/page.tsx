import { FaqChatbot } from '@/components/faq-chatbot';
import { PublicFooter } from '@/components/layout/public-footer';
import { PublicHeader } from '@/components/layout/public-header';

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <FaqChatbot />
      </main>
      <PublicFooter />
    </div>
  );
}

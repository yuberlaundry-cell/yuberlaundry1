
'use client';

import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FaqChatbot } from "@/components/faq-chatbot";

const faqSections = {
    "General": [
        { q: "What is Yuber Laundry?", a: "Yuber Laundry is a service that connects you with local laundromats for pickup and delivery of your laundry and dry cleaning." },
        { q: "What areas do you service?", a: "We are currently available in major cities across the UK. Enter your postcode on the homepage to see if we service your area." },
    ],
    "Booking & Orders": [
        { q: "How do I book a laundry service?", a: "You can book a service through our mobile app or website. Simply choose your services, select a pickup and delivery time, and we'll handle the rest." },
        { q: "Can I modify or cancel my order?", a: "Yes, you can modify or cancel your order up to 2 hours before the scheduled pickup time through the 'My Orders' section of your account." },
        { q: "What are your operating hours?", a: "Our pickup and delivery services operate from 8:00 AM to 10:00 PM, seven days a week. Our support hours may differ." },
    ],
    "Pricing & Payment": [
        { q: "How is pricing calculated?", a: "Wash & Fold is priced per pound, while dry cleaning and specialty items are priced individually. You can see a detailed price list on our pricing page." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards, including Visa, Mastercard, and American Express, processed securely via Paystack. You can also pay with your Yuber Wallet balance." },
        { q: "When am I charged for my order?", a: "You are charged only after your items have been cleaned and are ready for delivery. The final amount is based on the weight and items processed." }
    ],
    "Service Quality & Safety": [
        { q: "What if I'm not satisfied with the quality?", a: "We have a quality guarantee. If you're not happy with your order, please contact our support team within 24 hours, and we will re-clean your items free of charge." },
        { q: "Are my clothes mixed with other people's clothes?", a: "Never. Your items are always washed and dried in separate machines." },
    ],
};

export default function FaqPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-24">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-muted-foreground">Find answers to the most common questions about Yuber Laundry.</p>
                     <div className="mt-8 max-w-lg mx-auto">
                        <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="Search questions..." className="pl-10 h-12" />
                        </div>
                    </div>
                </div>

                <div className="mt-16 grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <Accordion type="multiple" className="w-full space-y-4">
                            {Object.entries(faqSections).map(([sectionTitle, questions]) => (
                                <div key={sectionTitle}>
                                    <h2 className="text-2xl font-bold mb-4">{sectionTitle}</h2>
                                    {questions.map((item, index) => (
                                        <AccordionItem value={`${sectionTitle}-${index}`} key={index}>
                                            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </div>
                            ))}
                        </Accordion>
                    </div>
                     <div className="lg:sticky top-24 self-start">
                        <FaqChatbot />
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

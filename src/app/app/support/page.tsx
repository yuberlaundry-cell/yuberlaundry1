
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Box, CreditCard, LifeBuoy, Mail, MessageSquare, PhoneCall, ShieldQuestion, Sparkles, User, Workflow } from "lucide-react";
import { FaqChatbot } from "@/components/faq-chatbot";

const faqSections = {
    "Orders & Booking": {
        icon: Box,
        questions: [
            { q: "How do I book a laundry service?", a: "You can book a service through our mobile app or website. Simply choose your services, select a pickup and delivery time, and we'll handle the rest." },
            { q: "Can I modify or cancel my order?", a: "Yes, you can modify or cancel your order up to 2 hours before the scheduled pickup time through the 'My Orders' section of your account." },
            { q: "What are your operating hours?", a: "Our pickup and delivery services operate from 8:00 AM to 10:00 PM, seven days a week. Our support hours may differ." },
        ]
    },
    "Pricing & Payment": {
        icon: CreditCard,
        questions: [
            { q: "How is pricing calculated?", a: "Wash & Fold is priced per pound, while dry cleaning and specialty items are priced individually. You can see a detailed price list on our pricing page." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, including Visa, Mastercard, and American Express. You can also pay with your Yuber Wallet balance." },
        ]
    },
    "Service Quality": {
        icon: Sparkles,
        questions: [
            { q: "What if I'm not satisfied with the quality?", a: "We have a quality guarantee. If you're not happy with your order, please contact our support team within 24 hours, and we will re-clean your items free of charge." },
        ]
    },
};

const supportContacts = [
  {
    icon: MessageSquare,
    title: 'Start a live chat',
    description: 'Chat with a support agent now.',
    cta: 'Start Chat',
  },
  {
    icon: Mail,
    title: 'Send us a message',
    description: 'We typically reply within a few hours.',
    cta: 'Send Message',
  },
];


export default function SupportPage() {
    return (
        <div className="space-y-8 pb-8">
             <div>
                <h1 className="text-3xl font-bold font-headline">Support Center</h1>
                <p className="text-muted-foreground">Get help with your orders, account, and more.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                {Object.entries(faqSections).map(([sectionTitle, section]) => (
                                    <AccordionItem value={sectionTitle} key={sectionTitle}>
                                        <AccordionTrigger className="text-lg font-semibold">
                                            <div className="flex items-center gap-3">
                                                <section.icon className="h-5 w-5 text-primary" />
                                                {sectionTitle}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <Accordion type="single" collapsible>
                                                {section.questions.map((item, index) => (
                                                    <AccordionItem value={`${sectionTitle}-${index}`} key={index}>
                                                        <AccordionTrigger>{item.q}</AccordionTrigger>
                                                        <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact A Human</CardTitle>
                             <CardDescription>Can't find what you're looking for? Reach out to us.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            {supportContacts.map(contact => (
                                <Card key={contact.title} className="p-4 flex flex-col items-center text-center">
                                    <contact.icon className="h-8 w-8 text-primary mb-2" />
                                    <h3 className="font-semibold">{contact.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                                    <Button variant="outline" className="w-full mt-auto">{contact.cta}</Button>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:sticky top-24 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-accent"/>
                                Live AI Support
                            </CardTitle>
                            <CardDescription>Ask our AI assistant for instant answers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Textarea placeholder="Type your question here... e.g., 'How do I change my delivery address?'" />
                             <Button className="w-full mt-2">Ask AI</Button>
                        </CardContent>
                    </Card>
                     <Card className="bg-muted/50 border-dashed">
                        <CardHeader>
                            <CardTitle>Support Hours</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                           <p>Mon-Fri: 8am - 10pm</p>
                           <p>Sat-Sun: 9am - 8pm</p>
                        </CardContent>
                    </Card>
                     <Card className="border-destructive bg-destructive/5">
                        <CardHeader>
                            <CardTitle className="text-destructive">Emergency Support</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-destructive/80">For urgent issues like a major spill or safety concern.</p>
                            <Button variant="destructive" className="w-full">
                                <PhoneCall className="mr-2"/> Call Emergency Line
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

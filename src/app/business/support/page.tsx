
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Box, CreditCard, LifeBuoy, Mail, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { FaqChatbot } from "@/components/faq-chatbot";

const faqSections = {
    "Account & Billing": {
        icon: CreditCard,
        questions: [
            { q: "How do I update my company's payment method?", a: "As a Business Admin, you can update the payment method under the 'Billing' -> 'Payment Methods' section of your portal." },
            { q: "Where can I find our past invoices?", a: "All past invoices are available for download in the 'Billing' -> 'Invoices' section." },
        ]
    },
    "Employee Management": {
        icon: Box,
        questions: [
            { q: "How do I add a new employee?", a: "Navigate to the 'Employees' section and click 'Add Employee'. You will need their name and email address to send an invite." },
            { q: "Can I set spending limits for individual employees?", a: "Yes, when adding or editing an employee, you can set both monthly allowances and per-order limits to control spending." },
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
                <p className="text-muted-foreground">Get help with your business account.</p>
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
                            <CardTitle>Contact Your Account Manager</CardTitle>
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
                    <FaqChatbot />
                </div>
            </div>
        </div>
    );
}

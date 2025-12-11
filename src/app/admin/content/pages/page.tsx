
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pages = [
  {
    id: 'about',
    title: 'About Us',
    description: 'Edit the content for your about page.',
    defaultContent: `Founded in 2023, Yuber Laundry was born from a simple idea: laundry is a chore that no one enjoys. We saw an opportunity to use technology to connect people with local, professional laundromats, creating a seamless experience from pickup to delivery. We believe in supporting local businesses while providing a world-class service to our customers.`,
  },
  {
    id: 'faq',
    title: 'FAQ Page',
    description: 'Edit the Q&A content for your FAQ page. Use the format: [Question]\n[Answer]',
    defaultContent: `[What is Yuber Laundry?]\n[Yuber Laundry is a service that connects you with local laundromats for pickup and delivery of your laundry and dry cleaning.]\n\n[What areas do you service?]\n[We are currently available in major cities across the UK. Enter your postcode on the homepage to see if we service your area.]`,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'Edit the content for your privacy policy page.',
    defaultContent: `Your privacy is important to us. This privacy statement explains the personal data Yuber Laundry processes, how Yuber Laundry processes it, and for what purposes.`,
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Edit the content for your terms of service page.',
    defaultContent: `Please read these terms and conditions carefully before using Our Service.`,
  },
];

export default function PagesContentPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent, page: string) => {
        e.preventDefault();
        toast({
            title: `${page} page saved!`,
            description: "Your changes have been successfully saved.",
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Static Pages</h1>
                <p className="text-muted-foreground">
                    Manage the content of your site's static pages like Privacy Policy and Terms.
                </p>
            </div>
            
            <Accordion type="multiple" className="space-y-4">
                {pages.map(page => (
                    <AccordionItem value={page.id} key={page.id}>
                        <Card>
                            <AccordionTrigger className="p-6">
                                <div>
                                    <CardTitle className="text-left">{page.title}</CardTitle>
                                    <CardDescription className="text-left">{page.description}</CardDescription>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <form onSubmit={(e) => handleSubmit(e, page.title)}>
                                    <CardContent className="space-y-4 pt-0">
                                        <Textarea 
                                            defaultValue={page.defaultContent}
                                            rows={15}
                                        />
                                        <Button type="submit">Save {page.title}</Button>
                                    </CardContent>
                                </form>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}


'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pages = [
  {
    id: 'careers',
    title: 'Careers',
    description: 'Edit the content for your careers page.',
    defaultContent: `Join our mission to make laundry day obsolete. We're hiring for a variety of roles. Check back soon for open positions.`,
  },
  {
    id: 'press',
    title: 'Press',
    description: 'Edit the content for your press page.',
    defaultContent: `For all press inquiries, please contact us at press@yuberlaundry.com.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: 'Edit the content for your contact page.',
    defaultContent: `Have a question? The best way to reach us is through our Help Center or by emailing support@yuberlaundry.com.`,
  },
  {
    id: 'partnerships',
    title: 'Partnerships',
    description: 'Edit the content for your partnerships page.',
    defaultContent: `We partner with local laundromats and businesses to provide the best service possible. Interested in partnering with us? Contact partnerships@yuberlaundry.com.`,
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
                    Manage the content of your site's simple, text-based pages.
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

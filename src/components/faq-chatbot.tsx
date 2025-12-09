'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { askQuestion } from '@/ai/flows/faq-chatbot';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const commonQuestions = [
    {
        q: "What is Yuber Laundry?",
        a: "Yuber Laundry is a convenient, on-demand laundry service. We pick up your dirty laundry and deliver it back to you clean and folded."
    },
    {
        q: "How does billing work?",
        a: "We charge per pound for standard wash & fold services. Dry cleaning and other special items are priced individually. You can see a full price list on our pricing page."
    },
    {
        q: "What is the turnaround time?",
        a: "Our standard turnaround time is 48 hours. We also offer next-day and same-day express options for an additional fee in select areas."
    }
]

export function FaqChatbot() {
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAnswer('');
    setError('');
    try {
      const result = await askQuestion({ question: data.question });
      setAnswer(result.answer);
    } catch (e) {
      console.error(e);
      setError('Sorry, I had trouble finding an answer. Please try rephrasing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-3xl font-headline">
            <Sparkles className="h-8 w-8 text-accent" />
            Ask our AI Assistant
          </CardTitle>
          <CardDescription>
            Have a question about our service? Ask away!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Question</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'How does pricing work for dry cleaning?'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  'Ask a Question'
                )}
              </Button>
            </form>
          </Form>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          {answer && (
            <div className="p-4 mt-6 border rounded-lg bg-secondary/50">
              <h3 className="font-semibold text-lg">Answer:</h3>
              <p className="mt-2 text-foreground/90">{answer}</p>
            </div>
          )}
        </CardContent>
      </Card>

        <div>
            <h3 className="text-2xl font-bold font-headline text-center mb-4">Common Questions</h3>
            <Accordion type="single" collapsible className="w-full">
                {commonQuestions.map((item, index) => (
                     <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>
                        {item.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </div>
  );
}

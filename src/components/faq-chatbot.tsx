
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
import { Loader2, Bot, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const formSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;


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
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" className="justify-start w-full">
                <Bot />
                <span>AI Assistant</span>
            </Button>
        </DialogTrigger>
        <DialogContent>
             <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent"/>
                        Live AI Support
                    </CardTitle>
                    <CardDescription>Ask our AI assistant for instant answers.</CardDescription>
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
                            <Input placeholder="e.g., 'How do I change my delivery address?'" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Asking...
                        </>
                        ) : (
                        'Ask AI'
                        )}
                    </Button>
                    </form>
                </Form>

                {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

                {answer && (
                    <div className="p-3 mt-4 border rounded-lg bg-secondary/50 text-sm">
                    <p className="text-foreground/90">{answer}</p>
                    </div>
                )}
                </CardContent>
            </Card>
        </DialogContent>
    </Dialog>
  );
}

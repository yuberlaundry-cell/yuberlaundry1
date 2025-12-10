
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Box, CreditCard, LifeBuoy, Mail, MessageSquare, PhoneCall, Send, ShieldQuestion, Sparkles, User, Workflow } from "lucide-react";

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
            { q:...

```
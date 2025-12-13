
'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import React from "react";

const templateVariables = [
    { name: 'Customer', vars: ['{{customer.firstName}}', '{{customer.lastName}}'] },
    { name: 'Order', vars: ['{{order.id}}', '{{order.status}}', '{{order.deliveryDate}}', '{{order.pickupTime}}'] },
    { name: 'Driver', vars: ['{{driver.name}}', '{{driver.eta}}'] },
    { name: 'Laundromat', vars: ['{{laundromat.name}}'] },
    { name: 'Supply', vars: ['{{supply.name}}'] },
];

const customerNotifications = {
    "Order Updates": [
        { 
            id: 'customer_order_confirmation', 
            title: 'Order Confirmation', 
            channels: {
                email: { enabled: true, subject: 'Your Yuber Laundry Order {{order.id}} is Confirmed', body: 'Hi {{customer.firstName}}, your order is confirmed.' },
                sms: { enabled: true, content: 'Hi {{customer.firstName}}, your Yuber Laundry order {{order.id}} is confirmed for pickup on {{order.pickupTime}}.' },
                push: { enabled: true, content: 'Your order {{order.id}} is confirmed!' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        { 
            id: 'customer_driver_assigned', 
            title: 'Driver Assigned', 
            channels: {
                email: { enabled: true, subject: 'Your driver for order {{order.id}} is on the way', body: 'Your driver, {{driver.name}}, is on the way.' },
                sms: { enabled: true, content: 'Your driver, {{driver.name}}, is on the way to collect order {{order.id}}.' },
                push: { enabled: true, content: 'Your driver is on the way!' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        {
            id: 'customer_items_collected',
            title: 'Items Collected',
            channels: {
                email: { enabled: true, subject: 'We have your laundry!', body: 'Your items for order {{order.id}} have been collected and are on their way to the facility.' },
                sms: { enabled: true, content: 'Your items for order {{order.id}} have been collected.' },
                push: { enabled: true, content: 'We have your laundry!' },
                whatsapp: { enabled: false, content: '' }
            }
        },
        {
            id: 'customer_items_at_laundromat',
            title: 'Items at Laundromat',
            channels: {
                email: { enabled: true, subject: 'Your laundry has arrived for cleaning', body: 'Order {{order.id}} has been received at {{laundromat.name}} and will be processed shortly.' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'Your laundry has arrived at the cleaning facility.' },
                whatsapp: { enabled: false, content: '' }
            }
        },
        {
            id: 'customer_items_ready',
            title: 'Items Ready for Delivery',
            channels: {
                email: { enabled: true, subject: 'Your laundry is clean!', body: 'Great news! Your items for order {{order.id}} are all clean and ready for delivery.' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'Your laundry is clean and ready for delivery!' },
                whatsapp: { enabled: false, content: '' }
            }
        },
        { 
            id: 'customer_out_for_delivery', 
            title: 'Out for Delivery', 
            channels: {
                email: { enabled: true, subject: 'Your order {{order.id}} is out for delivery', body: 'Good news! Your laundry is on its way.' },
                sms: { enabled: true, content: 'Good news! Order {{order.id}} is out for delivery and will arrive on {{order.deliveryDate}}.' },
                push: { enabled: true, content: 'Your laundry is on its way!' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        { 
            id: 'customer_order_delivered', 
            title: 'Order Delivered', 
            channels: {
                email: { enabled: true, subject: 'Order {{order.id}} Delivered', body: 'Your laundry has been delivered. Enjoy!' },
                sms: { enabled: true, content: 'Your order {{order.id}} has been delivered. Enjoy your fresh clothes!' },
                push: { enabled: true, content: 'Your laundry has been delivered!' },
                whatsapp: { enabled: false, content: ''}
            }
        },
    ],
    "Order Issues": [
        {
            id: 'customer_order_issue',
            title: 'Order Issue Reported',
            channels: {
                email: { enabled: true, subject: 'Update on your order {{order.id}}', body: 'Hi {{customer.firstName}}, there has been an update regarding an issue with your order. Please check the app for details.' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'There\'s an update on an issue with your order {{order.id}}.' },
                whatsapp: { enabled: false, content: ''}
            }
        }
    ],
    "Reminders": [
        {
            id: 'customer_pickup_reminder',
            title: 'Pickup Reminder',
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: true, content: 'Reminder: Your Yuber Laundry pickup is scheduled for today between {{order.pickupTime}}.' },
                push: { enabled: true, content: 'Pickup Reminder: Your driver will arrive soon!' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        {
            id: 'customer_delivery_reminder',
            title: 'Delivery Reminder',
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: true, content: 'Reminder: Your Yuber Laundry delivery is scheduled for today between {{order.deliveryTime}}.' },
                push: { enabled: true, content: 'Delivery Reminder: Your fresh clothes will arrive soon!' },
                whatsapp: { enabled: false, content: ''}
            }
        }
    ],
    "Account & Billing": [
         { 
            id: 'customer_account_welcome', 
            title: 'Welcome Email', 
            channels: {
                email: { enabled: true, subject: 'Welcome to Yuber Laundry, {{customer.firstName}}!', body: 'Welcome to the Yuber Laundry family!' },
                sms: { enabled: false, content: '' },
                push: { enabled: false, content: '' },
                whatsapp: { enabled: false, content: ''}
            }
        },
         { 
            id: 'customer_payment_failed', 
            title: 'Payment Failed', 
            channels: {
                email: { enabled: true, subject: 'Payment Failed for Order {{order.id}}', body: 'We were unable to process the payment for your recent order.' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'Payment failed for order {{order.id}}.' },
                whatsapp: { enabled: false, content: ''}
            }
        },
    ],
    "B2B Billing": [
        {
            id: 'b2b_new_invoice',
            title: 'New B2B Invoice Ready',
            channels: {
                email: { enabled: true, subject: 'Your new invoice from Yuber Laundry is ready', body: 'Hi {{customer.firstName}}, your invoice for the period is now available in your business portal.' },
                sms: { enabled: false, content: '' },
                push: { enabled: false, content: '' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        {
            id: 'b2b_invoice_reminder',
            title: 'B2B Invoice Payment Reminder',
            channels: {
                email: { enabled: true, subject: 'Reminder: Your Yuber Laundry invoice is due soon', body: 'Hi {{customer.firstName}}, this is a friendly reminder that your invoice is due for payment in 3 days.' },
                sms: { enabled: true, content: 'Reminder: Your Yuber Laundry invoice is due in 3 days.' },
                push: { enabled: false, content: '' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        {
            id: 'b2b_invoice_overdue',
            title: 'B2B Invoice Overdue',
            channels: {
                email: { enabled: true, subject: 'Action Required: Your Yuber Laundry invoice is overdue', body: 'Hi {{customer.firstName}}, your invoice is now overdue. Please log in to your business portal to settle the payment.' },
                sms: { enabled: true, content: 'Action Required: Your Yuber Laundry invoice is overdue.' },
                push: { enabled: true, content: 'Your company invoice is overdue. Please settle the payment.' },
                whatsapp: { enabled: false, content: ''}
            }
        }
    ]
}

const driverNotifications = {
    "Job Updates": [
        { 
            id: 'driver_new_job', 
            title: 'New Job Available', 
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'New job available in your area. Open the app to accept.' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        { 
            id: 'driver_job_assigned', 
            title: 'New Job Assignment', 
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: true, content: 'You have been assigned order {{order.id}} for pickup.' },
                push: { enabled: true, content: 'You have been assigned order {{order.id}} for pickup.' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        {
            id: 'driver_job_updated',
            title: 'Job Update',
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'A job on your route has been updated. Check order {{order.id}} for details.' },
                whatsapp: { enabled: false, content: '' }
            }
        },
        {
            id: 'driver_job_cancelled',
            title: 'Job Cancelled',
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'Job {{order.id}} has been cancelled and removed from your route.' },
                whatsapp: { enabled: false, content: '' }
            }
        }
    ],
    "Earnings & Payouts": [
        {
            id: 'driver_payout_sent',
            title: 'Weekly Payout Sent',
            channels: {
                email: { enabled: true, subject: 'Your weekly earnings have been sent!', body: 'Hi {{driver.name}}, your payout of {{payout.amount}} for the week ending {{payout.endDate}} has been processed.' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'Your weekly payout of {{payout.amount}} has been sent!' },
                whatsapp: { enabled: false, content: '' }
            }
        }
    ]
}

const laundromatNotifications = {
    "Order Flow": [
        { 
            id: 'laundromat_new_order', 
            title: 'New Order Arrived', 
            channels: {
                email: { enabled: true, subject: 'New Order {{order.id}} at your facility', body: 'A new order has arrived.' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'New order {{order.id}} from driver {{driver.name}} has arrived at your facility.' },
                whatsapp: { enabled: false, content: ''}
            }
        },
        { 
            id: 'laundromat_pickup_reminder', 
            title: 'Driver En-route for Pickup', 
            channels: {
                email: { enabled: false, subject: '', body: '' },
                sms: { enabled: false, content: '' },
                push: { enabled: true, content: 'Driver {{driver.name}} is scheduled to pick up ready orders in 30 minutes.' },
                whatsapp: { enabled: false, content: ''}
            }
        },
    ],
    "Alerts": [
        { 
            id: 'laundromat_low_supply', 
            title: 'Low Supply Alert', 
            channels: {
                email: { enabled: true, subject: 'Low Supply Alert: {{supply.name}}', body: 'Your supply of {{supply.name}} is running low.' },
                sms: { enabled: true, content: 'Alert: Your supply of {{supply.name}} is low.' },
                push: { enabled: true, content: 'Low supply alert for {{supply.name}}.' },
                whatsapp: { enabled: false, content: ''}
            }
        },
    ],
    "Earnings & Payouts": [
        {
            id: 'laundromat_payout_processed',
            title: 'Payout Processed',
            channels: {
                email: { enabled: true, subject: 'Your payout of {{payout.amount}} is on its way!', body: 'Hi {{laundromat.name}}, your payout for the period ending {{payout.endDate}} has been processed and will reflect in your account shortly.' },
                sms: { enabled: false, content: '' },
                push: { enabled: false, content: '' },
                whatsapp: { enabled: false, content: '' }
            }
        }
    ]
}

interface Template {
    id: string;
    title: string;
    channels: {
        email: { enabled: boolean; subject: string; body: string };
        sms: { enabled: boolean; content: string };
        push: { enabled: boolean; content: string };
        whatsapp: { enabled: boolean; content: string };
    };
}

interface TemplateFormProps {
    formId: string;
    categories: Record<string, Template[]>;
    onSave: (formId: string) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ formId, categories, onSave }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(formId); }}>
            <Accordion type="multiple" className="space-y-6">
                {Object.entries(categories).map(([category, templates]) => (
                    <Card key={category}>
                        <CardHeader>
                            <CardTitle>{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="multiple" className="space-y-4">
                                {templates.map(template => (
                                    <AccordionItem value={template.id} key={template.id}>
                                        <Card>
                                            <AccordionTrigger className="p-4 font-semibold">
                                                {template.title}
                                            </AccordionTrigger>
                                            <AccordionContent className="p-4 pt-0">
                                                <div className="space-y-6">
                                                   {/* Email */}
                                                   <div className="space-y-3">
                                                       <div className="flex items-center justify-between">
                                                          <Label htmlFor={`${template.id}-email-enabled`} className="font-semibold text-base">Email</Label>
                                                          <Switch id={`${template.id}-email-enabled`} defaultChecked={template.channels.email.enabled} />
                                                       </div>
                                                        {template.channels.email.enabled && (
                                                            <div className="space-y-4 pl-2 border-l-2 ml-2">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor={`${template.id}-email-subject`}>Subject</Label>
                                                                    <Input id={`${template.id}-email-subject`} defaultValue={template.channels.email.subject} />
                                                                </div>
                                                                 <div className="space-y-2">
                                                                    <Label htmlFor={`${template.id}-email-body`}>Body</Label>
                                                                    <Textarea id={`${template.id}-email-body`} defaultValue={template.channels.email.body} rows={5}/>
                                                                </div>
                                                            </div>
                                                        )}
                                                   </div>
                                                   <Separator />
                                                   {/* SMS */}
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                          <Label htmlFor={`${template.id}-sms-enabled`} className="font-semibold text-base">SMS</Label>
                                                          <Switch id={`${template.id}-sms-enabled`} defaultChecked={template.channels.sms.enabled} />
                                                       </div>
                                                       {template.channels.sms.enabled && (
                                                           <div className="space-y-2 pl-2 border-l-2 ml-2">
                                                                <Label htmlFor={`${template.id}-sms-content`}>Content</Label>
                                                                <Textarea id={`${template.id}-sms-content`} defaultValue={template.channels.sms.content} rows={3} />
                                                            </div>
                                                       )}
                                                    </div>
                                                    <Separator />
                                                    {/* Push */}
                                                     <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                          <Label htmlFor={`${template.id}-push-enabled`} className="font-semibold text-base">Push Notification</Label>
                                                          <Switch id={`${template.id}-push-enabled`} defaultChecked={template.channels.push.enabled} />
                                                       </div>
                                                       {template.channels.push.enabled && (
                                                            <div className="space-y-2 pl-2 border-l-2 ml-2">
                                                                <Label htmlFor={`${template.id}-push-content`}>Content</Label>
                                                                <Textarea id={`${template.id}-push-content`} defaultValue={template.channels.push.content} rows={2} />
                                                            </div>
                                                       )}
                                                    </div>
                                                    <Separator />
                                                    {/* WhatsApp */}
                                                     <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                          <Label htmlFor={`${template.id}-whatsapp-enabled`} className="font-semibold text-base">WhatsApp</Label>
                                                          <Switch id={`${template.id}-whatsapp-enabled`} defaultChecked={template.channels.whatsapp.enabled} />
                                                       </div>
                                                       {template.channels.whatsapp.enabled && (
                                                            <div className="space-y-2 pl-2 border-l-2 ml-2">
                                                                <Label htmlFor={`${template.id}-whatsapp-content`}>Content</Label>
                                                                <Textarea id={`${template.id}-whatsapp-content`} defaultValue={template.channels.whatsapp.content} rows={3} />
                                                            </div>
                                                       )}
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </Card>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                ))}
            </Accordion>
             <div className="mt-6 flex justify-end">
                <Button type="submit">Save {formId.charAt(0).toUpperCase() + formId.slice(1)} Templates</Button>
            </div>
        </form>
    );
};

export default function NotificationTemplatesPage() {
    const { toast } = useToast();

    const handleSave = (formId: string) => {
        toast({
            title: "Templates Saved",
            description: `Your changes to the ${formId} templates have been saved.`
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline tracking-tight sm:text-3xl">Notification Templates</h1>
                <p className="text-muted-foreground">
                    Manage automated messages sent via Email, SMS, Push, and WhatsApp.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="customer">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="customer">Customer</TabsTrigger>
                            <TabsTrigger value="driver">Driver</TabsTrigger>
                            <TabsTrigger value="laundromat">Laundromat</TabsTrigger>
                        </TabsList>
                        <TabsContent value="customer" className="mt-6">
                            <TemplateForm formId="customer" categories={customerNotifications} onSave={handleSave} />
                        </TabsContent>
                        <TabsContent value="driver" className="mt-6">
                            <TemplateForm formId="driver" categories={driverNotifications} onSave={handleSave} />
                        </TabsContent>
                        <TabsContent value="laundromat" className="mt-6">
                           <TemplateForm formId="laundromat" categories={laundromatNotifications} onSave={handleSave} />
                        </TabsContent>
                    </Tabs>
                </div>
                 <div className="lg:sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Template Variables</CardTitle>
                            <CardDescription>Use these placeholders in your messages. They will be replaced with real data.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           {templateVariables.map(group => (
                               <div key={group.name} className="mb-4">
                                   <h4 className="font-semibold mb-2">{group.name}</h4>
                                   <div className="space-y-1">
                                       {group.vars.map(variable => (
                                           <code key={variable} className="block text-sm p-2 bg-muted rounded-md font-mono">{variable}</code>
                                       ))}
                                   </div>
                               </div>
                           ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
 

    

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

const templateVariables = [
    { name: 'Customer', vars: ['{{customer.firstName}}', '{{customer.lastName}}'] },
    { name: 'Order', vars: ['{{order.id}}', '{{order.status}}', '{{order.deliveryDate}}', '{{order.pickupTime}}'] },
    { name: 'Driver', vars: ['{{driver.name}}', '{{driver.eta}}'] },
    { name: 'Laundromat', vars: ['{{laundromat.name}}'] },
];

const customerNotifications = {
    "Order Updates": [
        { id: 'customer_order_confirmation', title: 'Order Confirmation', defaultSms: 'Hi {{customer.firstName}}, your Yuber Laundry order {{order.id}} is confirmed for pickup on {{order.pickupTime}}.', defaultPush: 'Your order {{order.id}} is confirmed!', defaultEmailSubject: 'Your Yuber Laundry Order {{order.id}} is Confirmed' },
        { id: 'customer_driver_assigned', title: 'Driver Assigned', defaultSms: 'Your driver, {{driver.name}}, is on the way to collect order {{order.id}}.', defaultPush: 'Your driver is on the way!', defaultEmailSubject: 'Your driver for order {{order.id}} is on the way' },
        { id: 'customer_out_for_delivery', title: 'Out for Delivery', defaultSms: 'Good news! Order {{order.id}} is out for delivery and will arrive on {{order.deliveryDate}}.', defaultPush: 'Your laundry is on its way!', defaultEmailSubject: 'Your order {{order.id}} is out for delivery' },
        { id: 'customer_order_delivered', title: 'Order Delivered', defaultSms: 'Your order {{order.id}} has been delivered. Enjoy your fresh clothes!', defaultPush: 'Your laundry has been delivered!', defaultEmailSubject: 'Order {{order.id}} Delivered' },
    ],
    "Account & Billing": [
         { id: 'customer_account_welcome', title: 'Welcome Email', defaultSms: '', defaultPush: '', defaultEmailSubject: 'Welcome to Yuber Laundry, {{customer.firstName}}!' },
         { id: 'customer_payment_failed', title: 'Payment Failed', defaultSms: '', defaultPush: 'Payment failed for order {{order.id}}.', defaultEmailSubject: 'Payment Failed for Order {{order.id}}' },
    ]
}

const driverNotifications = {
    "Job Updates": [
        { id: 'driver_new_job', title: 'New Job Available', defaultSms: '', defaultPush: 'New job available in your area. Open the app to accept.' },
        { id: 'driver_job_assigned', title: 'New Job Assignment', defaultSms: '', defaultPush: 'You have been assigned order {{order.id}} for pickup.' },
    ]
}

const laundromatNotifications = {
    "Order Flow": [
        { id: 'laundromat_new_order', title: 'New Order Arrived', defaultSms: '', defaultPush: 'New order {{order.id}} from driver {{driver.name}} has arrived at your facility.' },
        { id: 'laundromat_pickup_reminder', title: 'Driver Pickup Reminder', defaultSms: '', defaultPush: 'Driver {{driver.name}} is scheduled to pick up ready orders in 30 minutes.' },
    ],
    "Alerts": [
        { id: 'laundromat_low_supply', title: 'Low Supply Alert', defaultSms: 'Alert: Your supply of {{supply.name}} is low.', defaultPush: 'Low supply alert for {{supply.name}}.' },
    ]
}


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
                    Manage automated messages sent via Email, SMS, and Push Notification.
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

interface TemplateFormProps {
    formId: string;
    categories: Record<string, { id: string; title: string; defaultSms?: string; defaultPush?: string; defaultEmailSubject?: string; }[]>;
    onSave: (formId: string) => void;
}

function TemplateForm({ formId, categories, onSave }: TemplateFormProps) {
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
                                                <div className="space-y-4">
                                                    {template.defaultEmailSubject !== undefined && (
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`${template.id}-email-subject`}>Email Subject</Label>
                                                            <Input id={`${template.id}-email-subject`} defaultValue={template.defaultEmailSubject} />
                                                        </div>
                                                    )}
                                                     <div className="space-y-2">
                                                        <Label htmlFor={`${template.id}-email-body`}>Email Body</Label>
                                                        <Textarea id={`${template.id}-email-body`} defaultValue="This is the full HTML email body. Use Handlebars for templating. e.g., {{customer.firstName}}..." rows={8}/>
                                                    </div>
                                                     {template.defaultSms !== undefined && template.defaultSms !== '' && (
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`${template.id}-sms`}>SMS</Label>
                                                            <Textarea id={`${template.id}-sms`} defaultValue={template.defaultSms} rows={3} />
                                                        </div>
                                                     )}
                                                     {template.defaultPush !== undefined && template.defaultPush !== '' && (
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`${template.id}-push`}>Push Notification</Label>
                                                            <Textarea id={`${template.id}-push`} defaultValue={template.defaultPush} rows={2} />
                                                        </div>
                                                     )}
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
}

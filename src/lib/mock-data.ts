
export type OrderStatusCategory = 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
export type TimelineEventStatus = 'completed' | 'in-progress' | 'pending';

export interface TimelineEvent {
    title: string;
    timestamp: string;
    status: TimelineEventStatus;
}

export interface Driver {
    name: string;
    avatarUrl: string;
    vehicle: string;
    eta: string;
}

export interface Order {
    id: string;
    serviceSummary: string;
    services: string[];
    status: string;
    statusCategory: OrderStatusCategory;
    pickupTime: string;
    deliveryTime: string;
    price: string;
    pickupAddress: string;
    deliveryAddress: string;
    timeline: TimelineEvent[];
    driver: Driver | null;
    payment: {
        subtotal: string;
        discount?: string;
        serviceFee: string;
    };
}

export const mockOrders: Order[] = [
    {
        id: '#YL12345',
        serviceSummary: 'Wash & Fold',
        services: ['Wash & Fold'],
        status: 'Washing',
        statusCategory: 'in-progress',
        pickupTime: 'Today, May 13, 12:00 - 14:00',
        deliveryTime: 'Wednesday, May 15, 18:00 - 20:00',
        price: '£25.50',
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        driver: {
            name: 'David L.',
            avatarUrl: 'https://picsum.photos/seed/driver1/100/100',
            vehicle: 'Blue Toyota Prius',
            eta: 'in 5 mins'
        },
        timeline: [
            { title: 'Order Scheduled', timestamp: 'May 13, 10:05 AM', status: 'completed' },
            { title: 'Driver Assigned', timestamp: 'May 13, 11:45 AM', status: 'completed' },
            { title: 'Driver on the way', timestamp: 'May 13, 11:55 AM', status: 'completed' },
            { title: 'Items Collected', timestamp: 'May 13, 12:10 PM', status: 'completed' },
            { title: 'At Laundromat', timestamp: 'May 13, 12:30 PM', status: 'completed' },
            { title: 'Washing', timestamp: 'May 13, 1:15 PM', status: 'in-progress' },
            { title: 'Drying', timestamp: 'Pending', status: 'pending' },
            { title: 'Folding & Quality Check', timestamp: 'Pending', status: 'pending' },
            { title: 'Handoff to Driver', timestamp: 'Pending', status: 'pending' },
            { title: 'Out for Delivery', timestamp: 'Pending', status: 'pending' },
            { title: 'Delivered', timestamp: 'Pending', status: 'pending' },
        ],
        payment: {
            subtotal: '£22.00',
            serviceFee: '£3.50',
        }
    },
    {
        id: '#YL12346',
        serviceSummary: 'Dry Cleaning & Ironing',
        services: ['Dry Cleaning', 'Ironing'],
        status: 'Out for Delivery',
        statusCategory: 'in-progress',
        pickupTime: 'Yesterday, May 12, 09:00 - 11:00',
        deliveryTime: 'Today, May 13, 16:00 - 18:00',
        price: '£42.00',
        pickupAddress: '456 Business Rd, London, EC1A 1BB',
        deliveryAddress: '456 Business Rd, London, EC1A 1BB',
        driver: {
            name: 'Sarah K.',
            avatarUrl: 'https://picsum.photos/seed/driver2/100/100',
            vehicle: 'White Ford Transit',
            eta: 'in 15 mins'
        },
        timeline: [
            { title: 'Order Scheduled', timestamp: 'May 12, 8:00 AM', status: 'completed' },
            { title: 'Items Collected', timestamp: 'May 12, 9:05 AM', status: 'completed' },
            { title: 'At Warehouse', timestamp: 'May 12, 9:30 AM', status: 'completed' },
            { title: 'In Transit to Laundromat', timestamp: 'May 12, 10:00AM', status: 'completed' },
            { title: 'At Laundromat', timestamp: 'May 12, 10:15 AM', status: 'completed' },
            { title: 'Washing', timestamp: 'May 12, 11:00 AM', status: 'completed' },
            { title: 'Drying', timestamp: 'May 12, 1:00 PM', status: 'completed' },
            { title: 'Handoff to Driver', timestamp: 'Today, 3:45 PM', status: 'completed'},
            { title: 'Out for Delivery', timestamp: 'Today, 3:45 PM', status: 'in-progress' },
            { title: 'Delivered', timestamp: 'Pending', status: 'pending' },
        ],
        payment: {
            subtotal: '£38.00',
            serviceFee: '£4.00',
        }
    },
    {
        id: '#YL12344',
        serviceSummary: 'Wash & Fold',
        services: ['Wash & Fold'],
        status: 'Delivered',
        statusCategory: 'completed',
        pickupTime: 'May 10, 12:00 - 14:00',
        deliveryTime: 'May 12, 18:00 - 20:00',
        price: '£25.50',
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        driver: null,
        timeline: [
            { title: 'Order Scheduled', timestamp: 'May 10, 10:00 AM', status: 'completed' },
            { title: 'Items Collected', timestamp: 'May 10, 12:10 PM', status: 'completed' },
            { title: 'At Laundromat', timestamp: 'May 10, 12:30 PM', status: 'completed' },
            { title: 'Washing', timestamp: 'May 10, 1:15 PM', status: 'completed' },
            { title: 'Drying', timestamp: 'May 10, 2:00 PM', status: 'completed' },
            { title: 'Folding & Quality Check', timestamp: 'May 11, 10:00 AM', status: 'completed' },
            { title: 'Out for Delivery', timestamp: 'May 12, 5:45 PM', status: 'completed' },
            { title: 'Delivered', timestamp: 'May 12, 6:15 PM', status: 'completed' },
        ],
        payment: {
            subtotal: '£22.00',
            serviceFee: '£3.50',
        }
    },
     {
        id: '#YL12347',
        serviceSummary: 'Wash & Fold',
        services: ['Wash & Fold'],
        status: 'Scheduled',
        statusCategory: 'upcoming',
        pickupTime: 'Tomorrow, May 14, 09:00 - 11:00',
        deliveryTime: 'Thursday, May 16, 18:00 - 20:00',
        price: 'Est. £30.00',
        pickupAddress: '789 Pine St, London, W1A 1AA',
        deliveryAddress: '789 Pine St, London, W1A 1AA',
        driver: null,
        timeline: [
            { title: 'Order Scheduled', timestamp: 'May 13, 2:00 PM', status: 'in-progress' },
            { title: 'Driver Assigned', timestamp: 'Pending', status: 'pending' },
            { title: 'Driver on the way', timestamp: 'Pending', status: 'pending' },
            { title: 'Items Collected', timestamp: 'Pending', status: 'pending' },
            { title: 'At Laundromat', timestamp: 'Pending', status: 'pending' },
            { title: 'Washing', timestamp: 'Pending', status: 'pending' },
            { title: 'Drying', timestamp: 'Pending', status: 'pending' },
            { title: 'Folding & Quality Check', timestamp: 'Pending', status: 'pending' },
            { title: 'Out for Delivery', timestamp: 'Pending', status: 'pending' },
            { title: 'Delivered', timestamp: 'Pending', status: 'pending' },
        ],
        payment: {
            subtotal: 'Est. £26.50',
            serviceFee: '£3.50',
        }
    },
    {
        id: '#YL12342',
        serviceSummary: 'Wash & Fold',
        services: ['Wash & Fold'],
        status: 'Cancelled',
        statusCategory: 'cancelled',
        pickupTime: 'May 9, 12:00 - 14:00',
        deliveryTime: 'May 11, 18:00 - 20:00',
        price: '£0.00',
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        driver: null,
        timeline: [
            { title: 'Order Scheduled', timestamp: 'May 9, 10:00 AM', status: 'completed' },
            { title: 'Order Cancelled', timestamp: 'May 9, 11:00 AM', status: 'completed' },
        ],
         payment: {
            subtotal: '£0.00',
            serviceFee: '£0.00',
        }
    },
];

export interface TimeSlot {
    value: string;
    label: string;
}

export const mockTimeSlots: Record<string, TimeSlot[]> = {
    today: [
        { value: '12:00-14:00', label: 'Today, 12:00 - 14:00' },
        { value: '14:00-16:00', label: 'Today, 14:00 - 16:00' },
        { value: '16:00-18:00', label: 'Today, 16:00 - 18:00' },
        { value: '18:00-20:00', label: 'Today, 18:00 - 20:00' },
        { value: '20:00-22:00', label: 'Today, 20:00 - 22:00' },
    ],
    tomorrow: [
        { value: '08:00-10:00', label: 'Tomorrow, 08:00 - 10:00' },
        { value: '10:00-12:00', label: 'Tomorrow, 10:00 - 12:00' },
        { value: '12:00-14:00', label: 'Tomorrow, 12:00 - 14:00' },
        { value: '14:00-16:00', label: 'Tomorrow, 14:00 - 16:00' },
        { value: '16:00-18:00', label: 'Tomorrow, 16:00 - 18:00' },
    ]
};


export interface BusinessEmployee {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Employee';
    status: 'Active' | 'Inactive';
    department: string;
    joinDate: string;
    mobile: string;
    allowance: {
        monthly: number;
        remaining: number;
        perOrder: number;
    },
    totalOrders: number;
    totalSpend: number;
    avgTurnaround: number;
    recentOrders: {
        id: string;
        date: string;
        status: 'Delivered' | 'In progress' | 'Cancelled';
        cost: number;
    }[];
}

export const mockBusinessEmployees: BusinessEmployee[] = [
    {
        id: 'emp-001',
        name: 'Emily Brown',
        email: 'emily.brown@acmecorp.com',
        role: 'Employee',
        status: 'Active',
        department: 'Marketing',
        joinDate: 'Jan 15, 2023',
        mobile: '(555) 123-4567',
        allowance: { monthly: 200, remaining: 145.50, perOrder: 75 },
        totalOrders: 18,
        totalSpend: 512.40,
        avgTurnaround: 48,
        recentOrders: [
            { id: '#C-54321', date: 'Dec 1, 2024', status: 'Delivered', cost: 45.50 },
            { id: '#C-54317', date: 'Nov 25, 2024', status: 'Delivered', cost: 25.00 }
        ]
    },
    {
        id: 'emp-002',
        name: 'John Smith',
        email: 'john.smith@acmecorp.com',
        role: 'Admin',
        status: 'Active',
        department: 'Management',
        joinDate: 'Mar 22, 2022',
        mobile: '(555) 987-6543',
        allowance: { monthly: 500, remaining: 350.00, perOrder: 150 },
        totalOrders: 35,
        totalSpend: 1250.80,
        avgTurnaround: 46,
        recentOrders: [
            { id: '#C-54320', date: 'Dec 2, 2024', status: 'In progress', cost: 62.00 },
        ]
    },
    {
        id: 'emp-003',
        name: 'Jessica Davis',
        email: 'jessica.davis@acmecorp.com',
        role: 'Manager',
        status: 'Active',
        department: 'Sales',
        joinDate: 'Feb 01, 2023',
        mobile: '(555) 234-5678',
        allowance: { monthly: 250, remaining: 55.25, perOrder: 75 },
        totalOrders: 25,
        totalSpend: 850.90,
        avgTurnaround: 52,
        recentOrders: [
            { id: '#C-54319', date: 'Nov 28, 2024', status: 'Delivered', cost: 38.75 }
        ]
    },
    {
        id: 'emp-004',
        name: 'Michael Wilson',
        email: 'michael.wilson@acmecorp.com',
        role: 'Employee',
        status: 'Inactive',
        department: 'Engineering',
        joinDate: 'Jun 10, 2023',
        mobile: '(555) 345-6789',
        allowance: { monthly: 150, remaining: 150.00, perOrder: 50 },
        totalOrders: 5,
        totalSpend: 150.00,
        avgTurnaround: 48,
        recentOrders: [
            { id: '#C-54318', date: 'Nov 27, 2024', status: 'Cancelled', cost: 0.00 },
        ]
    }
];

export interface BusinessOrder {
    id: string;
    employee: { id: string, name: string, avatar?: string };
    service: string;
    status: 'Delivered' | 'In progress' | 'Cancelled' | 'Scheduled';
    pickup: string;
    delivery: string;
    cost: number;
    companyShare: number;
    employeeShare: number;
    timeline: TimelineEvent[];
    pickupAddress: string;
    deliveryAddress: string;
}

export const mockBusinessOrders: BusinessOrder[] = [
    { 
        id: '#C-54321',
        employee: { id: 'emp-001', name: 'Emily Brown' },
        service: 'Wash & Fold', 
        status: 'Delivered', 
        pickup: 'Dec 1, 2024', 
        delivery: 'Dec 3, 2024', 
        cost: 45.50,
        companyShare: 45.50,
        employeeShare: 0.00,
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        timeline: [
            { title: 'Order Created by Admin', timestamp: 'Nov 30, 2024', status: 'completed' },
            { title: 'Scheduled', timestamp: 'Dec 1, 2024', status: 'completed' },
            { title: 'Delivered', timestamp: 'Dec 3, 2024', status: 'completed' },
        ]
    },
    { 
        id: '#C-54320', 
        employee: { id: 'emp-002', name: 'John Smith' },
        service: 'Dry Cleaning', 
        status: 'In progress', 
        pickup: 'Dec 2, 2024', 
        delivery: 'Dec 4, 2024', 
        cost: 62.00,
        companyShare: 62.00,
        employeeShare: 0.00,
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        timeline: [
            { title: 'Order Created', timestamp: 'Dec 1, 2024', status: 'completed' },
            { title: 'At Laundromat', timestamp: 'Dec 2, 2024', status: 'in-progress' },
        ]
    },
    { 
        id: '#C-54319', 
        employee: { id: 'emp-003', name: 'Jessica Davis' },
        service: 'Wash & Fold', 
        status: 'Delivered', 
        pickup: 'Nov 28, 2024', 
        delivery: 'Nov 30, 2024', 
        cost: 38.75,
        companyShare: 38.75,
        employeeShare: 0.00,
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        timeline: [
            { title: 'Scheduled', timestamp: 'Nov 28, 2024', status: 'completed' },
            { title: 'Delivered', timestamp: 'Nov 30, 2024', status: 'completed' },
        ]
    },
    { 
        id: '#C-54318', 
        employee: { id: 'emp-004', name: 'Michael Wilson' },
        service: 'Wash & Fold', 
        status: 'Cancelled', 
        pickup: 'Nov 27, 2024', 
        delivery: 'Nov 29, 2024', 
        cost: 0.00,
        companyShare: 0.00,
        employeeShare: 0.00,
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        timeline: [
             { title: 'Scheduled', timestamp: 'Nov 27, 2024', status: 'completed' },
             { title: 'Cancelled by user', timestamp: 'Nov 27, 2024', status: 'completed' },
        ]
    },
    { 
        id: '#C-54317', 
        employee: { id: 'emp-001', name: 'Emily Brown' },
        service: 'Ironing', 
        status: 'Delivered', 
        pickup: 'Nov 25, 2024', 
        delivery: 'Nov 26, 2024', 
        cost: 25.00,
        companyShare: 25.00,
        employeeShare: 0.00,
        pickupAddress: '123 Main St, London, SW1A 0AA',
        deliveryAddress: '123 Main St, London, SW1A 0AA',
        timeline: [
             { title: 'Scheduled', timestamp: 'Nov 24, 2024', status: 'completed' },
            { title: 'Delivered', timestamp: 'Nov 26, 2024', status: 'completed' },
        ]
    },
];

export interface Invoice {
    id: string;
    date: string;
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Due' | 'Overdue';
    items: {
        description: string;
        quantity: number;
        price: number;
        total: number;
    }[];
    subtotal: number;
    tax: number;
    total: number;
}

export const mockInvoices: Invoice[] = [
    {
        id: 'INV-2024-012',
        date: 'Dec 1, 2024',
        dueDate: 'Dec 15, 2024',
        amount: 4250.00,
        status: 'Paid',
        items: [
            { description: "Company-wide laundry services for November 2024", quantity: 1, price: 4250.00, total: 4250.00 }
        ],
        subtotal: 4250.00,
        tax: 0,
        total: 4250.00
    },
    {
        id: 'INV-2024-011',
        date: 'Nov 1, 2024',
        dueDate: 'Nov 15, 2024',
        amount: 3890.50,
        status: 'Paid',
        items: [
            { description: "Company-wide laundry services for October 2024", quantity: 1, price: 3890.50, total: 3890.50 }
        ],
        subtotal: 3890.50,
        tax: 0,
        total: 3890.50
    },
    {
        id: 'INV-2024-010',
        date: 'Oct 1, 2024',
        dueDate: 'Oct 15, 2024',
        amount: 4120.00,
        status: 'Paid',
        items: [
            { description: "Company-wide laundry services for September 2024", quantity: 1, price: 4120.00, total: 4120.00 }
        ],
        subtotal: 4120.00,
        tax: 0,
        total: 4120.00
    },
];

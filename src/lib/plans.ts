
export interface Plan {
    name: string;
    price: string;
    billingCycle: string;
    features: string[];
    active: boolean;
    type: 'Consumer' | 'Business' | 'Laundromat';
    paystackPlanCode: string;
    popular?: boolean;
    limits: {
        // Consumer
        kgIncluded?: number;
        bagsIncluded?: number;
        deliveryFeeWaiver?: boolean;
        platformFeeWaiver?: boolean;
        discountPercentage?: number;
        nextDayRushWaiver?: boolean;
        otherServicesCredit?: number;
        rollover?: boolean;


        // Business
        employees?: number;
        driverFeeWaiver?: boolean;

        // Laundromat
        commissionOverride?: number;
    }
}

export const initialPlans: Plan[] = [
     {
        name: "Yuber Repeat (1 Bag)",
        price: "800",
        billingCycle: "monthly",
        features: [ "Ideal for one person's needs" ],
        active: true,
        type: 'Consumer',
        paystackPlanCode: 'PLN_repeat_1bag',
        popular: false,
        limits: {
            bagsIncluded: 1,
            deliveryFeeWaiver: true, platformFeeWaiver: true, nextDayRushWaiver: true, otherServicesCredit: 120, rollover: true
        }
    },
    {
        name: "Yuber Repeat (2 Bags)",
        price: "1500",
        billingCycle: "monthly",
        features: [ "Perfect for couples" ],
        active: true,
        type: 'Consumer',
        paystackPlanCode: 'PLN_repeat_2bags',
        popular: true,
        limits: {
            bagsIncluded: 2,
            deliveryFeeWaiver: true, platformFeeWaiver: true, nextDayRushWaiver: true, otherServicesCredit: 120, rollover: true
        }
    },
     {
        name: "Yuber Repeat (4 Bags)",
        price: "2800",
        billingCycle: "monthly",
        features: [ "Great for families" ],
        active: true,
        type: 'Consumer',
        paystackPlanCode: 'PLN_repeat_4bags',
        popular: false,
        limits: {
            bagsIncluded: 4,
            deliveryFeeWaiver: true, platformFeeWaiver: true, nextDayRushWaiver: true, otherServicesCredit: 120, rollover: true
        }
    },
    {
        name: "Business Pro",
        price: "5000",
        billingCycle: "monthly",
        features: [
            "Centralized billing",
            "Usage reports",
            "Dedicated support"
        ],
        active: true,
        type: 'Business',
        paystackPlanCode: 'PLN_bizpro_monthly',
        limits: {
            employees: 100,
            driverFeeWaiver: true,
            platformFeeWaiver: true,
            discountPercentage: 10,
        }
    },
    {
        name: "Partner Tier 1",
        price: "1500",
        billingCycle: "monthly",
        features: [
            "Priority support",
            "Featured on homepage"
        ],
        active: true,
        type: 'Laundromat',
        paystackPlanCode: 'PLN_laundro_tier1',
        limits: {
            commissionOverride: 12,
        }
    },
     {
        name: "Yuber Lite (Legacy)",
        price: "250",
        billingCycle: "monthly",
        features: [
            "Discounted delivery",
        ],
        active: false,
        type: 'Consumer',
        paystackPlanCode: 'PLN_lite_legacy',
        limits: {
            kgIncluded: 15
        }
    }
]


# Yuber Laundry - Platform Overview

This document provides a high-level overview of the different user portals and their core features within the Yuber Laundry platform.

## 1. Consumer Portal (`/app`)

This is the main portal for individual customers to manage their laundry needs.

### Key Features:
- **Dashboard:** A summary of recent activity, wallet balance, and quick actions.
- **Order Management:** Users can place new orders through a multi-step booking flow, track the status of active orders in real-time, and view their order history.
- **Flexible Payments:** At checkout, users can choose to pay with their Yuber Wallet balance or a credit/debit card, with full support for new customers via Paystack.
- **Wallet & Promotions:** Users can manage their wallet balance, view available promotions, and participate in a referral program.
- **Account Settings:** Manage profile information, saved addresses, and payment methods.
- **AI Support:** An integrated AI chatbot helps users with frequently asked questions.

---

## 2. Business Portal (`/business`)

This portal serves corporate clients and has two distinct roles: **Business Admin** and **Business Employee**.

### Key Features (Admin Role):
- **Admin Dashboard:** An overview of company-wide laundry spending, order volume, and active employees.
- **Employee Management:** Admins can add, edit, and deactivate employees, and set individual spending allowances.
- **Order Management:** Admins can create orders on behalf of employees and view all company orders.
- **Billing & Reports:** Access to detailed spending reports, invoice history, and management of company payment methods.
- **Company Settings:** Configure company-wide laundry preferences.

### Key Features (Employee Role):
- **Employee Dashboard:** A simplified view showing personal order history and remaining allowance.
- **Order History:** View and track personal laundry orders placed through the company account.

---

## 3. Driver Portal (`/driver`)

This is the mobile-first portal for drivers responsible for pickups and deliveries.

### Key Features:
- **Today's Tasks:** A focused view of the current day's assigned jobs.
- **Job Workflow:** A step-by-step process for each job, from navigating to the customer to confirming collection/delivery, including QR code scanning and photo/signature capture.
- **Available Jobs:** A list of new jobs in the area that drivers can accept.
- **Earnings:** A dashboard to track earnings from jobs and tips, and view payout history.
- **Profile Management:** Drivers can manage their personal and vehicle information.

---

## 4. Laundromat Portal (`/laundromat`)

This portal is for partner laundry facilities to manage their internal operations.

### Key Features:
- **Facility Dashboard:** A real-time overview of all orders currently in the facility, categorized by processing stage (Washing, Drying, QC, etc.).
- **Intake Flow:** A unified process for checking in orders, whether they arrive from a driver, a customer drop-off, or as a new walk-in.
- **Processing Board (Kanban):** A visual board to drag-and-drop orders through the laundry lifecycle (Washing → Drying → Folding/QC → Ready for Handoff).
- **Order Details & Pricing:** A detailed view for each order where staff can weigh items, finalize the bill, and log any quality control issues.
- **Financials & Subscriptions:** Track earnings, view detailed payout statements, and manage the facility's subscription tier with the platform.
- **Operational Settings:**
    - **Order Acceptance:** Choose to accept incoming orders automatically or manually (via a "ringing" notification).
    - **Services & Pricing:** Enable/disable specific services (e.g., Wash & Fold, Dry Cleaning) and set custom pricing.
- **Resource Management:** A hub for managing staff roles, machine status (e.g., in use, maintenance), and supply inventory.

---

## 5. Superadmin Portal (`/admin`)

This is the central control panel for the platform owner to manage all aspects of the service.

### Key Features:
- **Global Dashboard:** A top-level view of key platform metrics like revenue, user growth, and partner activity.
- **User Management:** View and manage all users across all portals, with the ability to impersonate users for support purposes.
- **Roles & Permissions (RBAC):** A comprehensive system to define and manage permissions for every user role on the platform.
- **Content Management System (CMS):** Edit content for public marketing pages, including the homepage, About Us, FAQ, Privacy Policy, and Terms of Service.
- **Revenue & Billing:**
    - **Commission Rules:** Configure platform-wide commission rules and create specific overrides for individual laundromats.
    - **Subscription Plans:** Create and manage tiered subscription plans for consumers, businesses, and laundromats.
    - **B2B Billing:** Oversee and manage the entire billing and invoicing lifecycle for corporate accounts.
- **Logistics & Routing:**
    - **Service Zones:** Define geographic operational areas. Assign specific laundromats and drivers, and set the logistical model for each zone (e.g., direct-to-laundromat or a central warehouse hub).
    - **Time Slot Templates:** Create reusable scheduling patterns that define operating hours, service levels (Standard vs. Premium), premium surcharges, and turnaround time rules (e.g., default 48hr, with overrides for specific services).
    - **Routing Rules:** Configure global parameters for route optimization, such as the maximum number of orders per driver route and the time limit for manual order acceptance by laundromats.
- **Quality & Risk:**
    - **Compliance:** Monitor high-risk entities (drivers/laundromats), track expiring documents, and manage compliance tasks.
    - **Fraud Monitoring:** Review fraud alerts, manage investigations, and block suspicious accounts.
- **Platform Health & Settings:**
    - **Feature Flags:** Enable or disable specific platform features (e.g., payment methods, service types, turnaround times) to adapt to different markets or test new functionality.
    - **API & System Status:** Monitor the health of core components and third-party integrations (e.g., Paystack, Google Maps).
    - **Notification Templates:** Customize all automated communications (Email, SMS, Push) sent to customers, drivers, and laundromats, using a rich set of template variables.

it
# Yuber Laundry - Platform Overview

This document provides a high-level overview of the different user portals and their core features within the Yuber Laundry platform.

## 1. Consumer Portal (`/app`)

This is the main portal for individual customers to manage their laundry needs.

### Key Features:
- **Dashboard:** A summary of recent activity, wallet balance, and quick actions.
- **Order Management:** Users can place new orders through a multi-step booking flow, track the status of active orders in real-time, and view their order history.
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
- **Financials:** A section to track earnings and view detailed payout statements.
- **Resource Management:** A hub for managing staff roles, machine status (e.g., in use, maintenance), and supply inventory.

---

## 5. Superadmin Portal (`/admin`)

This is the central control panel for the platform owner to manage all aspects of the service.

### Key Features:
- **Global Dashboard:** A top-level view of key platform metrics like revenue, user growth, and partner activity.
- **User Management:** View and manage all users across all portals, with the ability to impersonate users for support purposes.
- **Roles & Permissions (RBAC):** A comprehensive system to define and manage permissions for every user role on the platform.
- **Content Management System (CMS):** Edit content for public marketing pages, including the homepage, About Us, FAQ, Privacy Policy, and Terms of Service.
- **Revenue & Billing:** Configure platform-wide commission rules and manage B2B billing.
- **Logistics:** Manage service zones, time slot templates, and routing rules for the driver fleet.
- **Quality & Risk:**
    - **Compliance:** Monitor high-risk entities (drivers/laundromats), track expiring documents, and manage compliance tasks.
    - **Fraud Monitoring:** Review fraud alerts, manage investigations, and block suspicious accounts.
- **Platform Health & Settings:**
    - **Feature Flags:** Enable or disable specific platform features (e.g., payment methods, service types, turnaround times) to adapt to different markets or test new functionality.
    - **API & System Status:** Monitor the health of core components and third-party integrations (e.g., Paystack, Google Maps).

import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PrivacyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: May 13, 2024</p>
                    <p>Your privacy is important to us. This privacy statement explains the personal data Yuber Laundry processes, how Yuber Laundry processes it, and for what purposes.</p>
                    <h2>Information We Collect</h2>
                    <p>Yuber Laundry collects data to operate effectively and provide you the best experiences with our services. You provide some of this data directly, such as when you create an account, place an order for laundry service, or contact us for support.</p>
                    <h2>How We Use Personal Data</h2>
                    <p>Yuber Laundry uses the data we collect for three basic purposes: to operate our business and provide (including improving and personalizing) the services we offer, to send communications, including promotional communications, and to display advertising.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

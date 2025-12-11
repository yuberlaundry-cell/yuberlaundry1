
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Contact Us</h1>
                    <p>Have a question? The best way to reach us is through our Help Center or by emailing support@yuberlaundry.com.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

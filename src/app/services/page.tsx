
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Our Services</h1>
                    <p>We offer a range of services to meet your laundry needs. From standard wash & fold to delicate dry cleaning, we've got you covered.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

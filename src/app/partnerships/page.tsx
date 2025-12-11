
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PartnershipsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Partnerships</h1>
                    <p>We partner with local laundromats and businesses to provide the best service possible. Interested in partnering with us? Contact partnerships@yuberlaundry.com.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}


import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function CoveragePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Our Coverage</h1>
                    <p>We are constantly expanding our service areas. Currently, we operate in major metropolitan areas. Enter your address on the homepage to see if we're in your neighborhood.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

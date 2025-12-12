
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function CareersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Careers</h1>
                    <p>Join our mission to make laundry day obsolete. We're hiring for a variety of roles. Check back soon for open positions.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

    
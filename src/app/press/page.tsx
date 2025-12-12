
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function PressPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Press</h1>
                    <p>For all press inquiries, please contact us at press@yuberlaundry.com.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

    
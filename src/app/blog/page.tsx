
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow container mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-24">
                <div className="prose lg:prose-xl mx-auto">
                    <h1>Blog</h1>
                    <p>Welcome to the Yuber Laundry blog! Stay tuned for laundry tips, company news, and more.</p>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}

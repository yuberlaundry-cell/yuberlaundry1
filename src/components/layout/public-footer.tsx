import Link from 'next/link';
import { Apple, Play } from 'lucide-react';
import { Button } from '../ui/button';

const footerLinks = {
  Product: [
    { name: "Pricing", href: "/pricing" },
    { name: "Services", href: "#" },
    { name: "Coverage", href: "#" },
    { name: "App", href: "#" },
  ],
  Company: [
    { name: "About us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ],
  Resources: [
    { name: "FAQ", href: "/faq" },
    { name: "Help Center", href: "/faq" },
    { name: "Contact Us", href: "#" },
    { name: "Partnerships", href: "#" },
  ],
  Business: [
    { name: "Corporate", href: "/for-business" },
    { name: "Hotels", href: "/for-business" },
    { name: "Restaurants", href: "/for-business" },
  ],
};

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold font-headline text-lg">Yuber Laundry</span>
            </Link>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
             <div key={title} className="space-y-4">
                <h4 className="font-semibold text-sm">{title}</h4>
                <ul className="space-y-3">
                  {links.map(link => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {link.name}
                        </Link>
                      </li>
                  ))}
                </ul>
             </div>
          ))}
        </div>
        
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="text-sm text-muted-foreground order-2 md:order-1 text-center md:text-left">
            <p>&copy; {currentYear} Yuber Laundry Ltd. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 justify-center md:justify-start">
              <Link href="#" className="hover:text-foreground">Website T&Cs</Link>
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 order-1 md:order-2">
             <Button variant="ghost" className="h-12 text-left flex items-center gap-2 border bg-gray-800 hover:bg-gray-700 text-white hover:text-white w-full sm:w-auto">
                <Apple className="h-6 w-6"/>
                <div>
                    <div className='text-xs'>Download on the</div>
                    <div className="font-bold text-base -mt-1">App Store</div>
                </div>
            </Button>
            <Button variant="ghost" className="h-12 text-left flex items-center gap-2 border bg-gray-800 hover:bg-gray-700 text-white hover:text-white w-full sm:w-auto">
                <Play className="h-6 w-6"/>
                <div>
                    <div className='text-xs'>GET IT ON</div>
                    <div className="font-bold text-base -mt-1">Google Play</div>
                </div>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

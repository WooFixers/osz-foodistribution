import { Phone, Mail, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-background">
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Marque */}
        <div>
          <div className="mb-5">
            <Link href="/">
              <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto brightness-0 invert opacity-80" />
            </Link>
          </div>
          <p className="text-background/60 text-sm leading-relaxed">
            Spécialiste de la distribution de viandes et produits alimentaires depuis plus de 15 ans. Qualité, traçabilité et service d&apos;excellence.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Contact</h4>
          <ul className="space-y-3 text-sm text-background/60">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:0670594545" className="hover:text-primary transition-colors">06 70 59 45 45</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>commande@osz-foodistribution.ma</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <span>Marrakech, Maroc</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Lun-Sam : 8h00 - 20h00</span>
            </li>
          </ul>
        </div>

        {/* Zones de livraison */}
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Zones de livraison</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li>Marrakech centre</li>
            <li>Guéliz</li>
            <li>Hivernage</li>
            <li>Palmeraie</li>
            <li>Targa</li>
          </ul>
        </div>

        {/* Accès rapide */}
        <div>
          <h4 className="font-heading text-lg font-semibold text-background mb-5">Accès rapide</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "/", label: "Accueil" },
              { href: "/professionnels", label: "Professionnels" },
              { href: "/particuliers", label: "Particuliers" },
              { href: "/particuliers/catalogue", label: "Catalogue" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-background/60 hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-background/40">
        <p>© 2025 OSZ Food Distribution. Tous droits réservés.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-background/60 transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-background/60 transition-colors">Politique de confidentialité</a>
          <a href="#" className="hover:text-background/60 transition-colors">CGV</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

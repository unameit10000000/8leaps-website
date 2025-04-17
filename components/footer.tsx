"use client";

import { useLanguage } from "./language-provider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);

  // Only show theme-specific content after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use the same exact path matching as in the header
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path;
  };

  return (
    <footer className="bg-black text-white py-12 mt-auto lg:px-4">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            {/* Show appropriate full logo based on theme */}
            {mounted ? (
              <div className="mb-4 relative h-20 w-32">
                <Image
                  src="/logo-full-dark.png"
                  alt="8Leaps"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="mb-4 relative h-20 w-32">
                <Image
                  src="/logo-full.png"
                  alt="8Leaps"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <p className="text-gray-400 max-w-xs">{t("footer.description")}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.quicklinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`text-gray-400 hover:text-green-500 transition-colors ${
                    isActive("/") ? "text-green-500" : ""
                  }`}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className={`text-gray-400 hover:text-green-500 transition-colors ${
                    isActive("/services") ? "text-green-500" : ""
                  }`}
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={`text-gray-400 hover:text-green-500 transition-colors ${
                    isActive("/pricing") ? "text-green-500" : ""
                  }`}
                >
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-gray-400 hover:text-green-500 transition-colors ${
                    isActive("/about") ? "text-green-500" : ""
                  }`}
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-gray-400 hover:text-green-500 transition-colors ${
                    isActive("/contact") ? "text-primary" : ""
                  }`}
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.connect")}</h3>
            {/* <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div> */}
            <p className="text-gray-400">
              info@8leaps.com
              <br />
              {/* +31 6 39667436 */}
              <br />
              Leeuwarden, Netherlands
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>
            &copy; {currentYear} 8Leaps. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
}

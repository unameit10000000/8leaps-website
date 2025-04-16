"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./language-provider";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetDescription,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Moon, Sun, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple exact path matching
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-4">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            {/* Show appropriate logo based on theme */}
            {mounted ? (
              <div className="relative h-6 w-32">
                <Image
                  src={
                    theme === "dark" ? "/logo-text-dark.png" : "/logo-text.png"
                  }
                  alt="8Leaps"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative h-6 w-32">
                <Image
                  src="/logo-text.png"
                  alt="8Leaps"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </Link>

          <Separator orientation="vertical" className="h-6" />

          <nav className="hidden md:flex gap-6">
            {/* Reordered navigation links as requested */}
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : ""
              }`}
            >
              {t("nav.home")}
            </Link>

            {/* Services as a normal link, not a dropdown */}
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/services") ? "text-primary" : ""
              }`}
            >
              {t("nav.services")}
            </Link>

            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/pricing") ? "text-primary" : ""
              }`}
            >
              {t("nav.pricing")}
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : ""
              }`}
            >
              {t("nav.about")}
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : ""
              }`}
            >
              {t("nav.contact")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                {language === "en" ? "EN" : "NL"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("nl")}>
                Nederlands
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {mounted && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Schedule Call button - only visible on desktop */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white"
            >
              <a
                href="https://calendly.com/8leaps"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("chat.button")}
              </a>
            </Button>
          </div>

          {/* Mobile menu using Sheet component */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader></SheetHeader>
              <div className="grid gap-4 py-6">
                <div className="flex flex-col space-y-4 text-left">
                  <Link
                    href="/"
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive("/") ? "text-primary" : ""
                    }`}
                  >
                    {t("nav.home")}
                  </Link>
                  <Link
                    href="/services"
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive("/services") ? "text-primary" : ""
                    }`}
                  >
                    {t("nav.services")}
                  </Link>
                  <Link
                    href="/pricing"
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive("/pricing") ? "text-primary" : ""
                    }`}
                  >
                    {t("nav.pricing")}
                  </Link>
                  <Link
                    href="/about"
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive("/about") ? "text-primary" : ""
                    }`}
                  >
                    {t("nav.about")}
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive("/contact") ? "text-primary" : ""
                    }`}
                  >
                    {t("nav.contact")}
                  </Link>
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white"
                    >
                      <a
                        href="https://calendly.com/8leaps"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("chat.button")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

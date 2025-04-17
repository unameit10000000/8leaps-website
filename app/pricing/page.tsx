"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Users, GraduationCap, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClientType = "company" | "student" | "nonprofit";

export default function PricingPage() {
  const { t, language } = useLanguage();
  const [clientType, setClientType] = useState<ClientType>("company");

  // Calculate discount percentage based on client type
  const getDiscountPercentage = (): number => {
    if (clientType === "student") return 10;
    if (clientType === "nonprofit") return 20;
    return 0;
  };

  // Get discount message
  const getDiscountMessage = (): string => {
    const percentage = getDiscountPercentage();
    if (percentage === 0) return "";

    return language === "en"
      ? `Incl. ${percentage}% discount!`
      : `Incl. ${percentage}% korting!`;
  };

  // Calculate discounted price
  const getDiscountedPrice = (originalPrice: number): number => {
    const discountPercentage = getDiscountPercentage();
    if (discountPercentage === 0) return originalPrice;

    return Math.round(originalPrice * (1 - discountPercentage / 100));
  };

  // Original prices
  const starterPrice = 300;
  const professionalPrice = 850;

  // Discounted prices
  const discountedStarterPrice = getDiscountedPrice(starterPrice);
  const discountedProfessionalPrice = getDiscountedPrice(professionalPrice);

  // Discount message
  const discountMessage = getDiscountMessage();

  // Special company discount for starter package
  const starterSpecialDiscount =
    clientType === "company"
      ? language === "en"
        ? "Temporarily from €265!"
        : "Tijdelijk vanaf €265!"
      : "";

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24 lg:px-4">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">
            {t("pricing.title")}
          </h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>
      </div>

      {/* Client type selector */}
      <section className="py-8 md:py-12 bg-muted/30 lg:px-4">
        <div className="container">
          <div className="max-w-md mx-auto">
            <label
              htmlFor="client-type"
              className="block text-sm font-medium mb-2"
            >
              {language === "en" ? "I am a:" : "Ik ben een:"}
            </label>
            <Select
              value={clientType}
              onValueChange={(value) => setClientType(value as ClientType)}
            >
              <SelectTrigger id="client-type" className="w-full">
                <SelectValue
                  placeholder={
                    language === "en"
                      ? "Select client type"
                      : "Selecteer klanttype"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{language === "en" ? "Company" : "Bedrijf"}</span>
                  </div>
                </SelectItem>
                <SelectItem value="student">
                  <div className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    <span>{language === "en" ? "Student" : "Student"}</span>
                  </div>
                </SelectItem>
                <SelectItem value="nonprofit">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>
                      {language === "en" ? "Non-profit" : "Non-profit"}
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32 lg:px-4">
        <div className="container">
          <div className="grid gap-8 lg:gap-16 lg:grid-cols-3">
            {/* Starter Plan */}
            <Card className="border-2 hover:border-green-500 transition-all duration-300 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("pricing.starter.title")}
                </CardTitle>
                <CardDescription className="text-lg font-medium">
                  {t("pricing.starter.tagline")}
                </CardDescription>
                {/* <div className="mt-4">
                  <div className="text-xl font-bold">
                    {language === "en"
                      ? `from €${discountedStarterPrice} excl. VAT`
                      : `vanaf €${discountedStarterPrice} excl. BTW`}
                  </div>
                  {discountMessage && <div className="text-green-500 font-medium">{discountMessage}</div>}
                  {starterSpecialDiscount && <div className="text-green-500 font-medium">{starterSpecialDiscount}</div>}
                </div> */}
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 md:space-y-4">
                  {t("pricing.starter.features", { returnObjects: true }).map(
                    (feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-6 text-muted-foreground">
                  {t("pricing.starter.description")}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <Link href="/contact">{t("pricing.cta")}</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-green-500 shadow-lg relative flex flex-col">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                {t("pricing.professional.popular")}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("pricing.professional.title")}
                </CardTitle>
                <CardDescription className="text-lg font-medium">
                  {t("pricing.professional.tagline")}
                </CardDescription>
                {/* <div className="mt-4">
                  <div className="text-xl font-bold">
                    {language === "en"
                      ? `from €${discountedProfessionalPrice} excl. VAT`
                      : `vanaf €${discountedProfessionalPrice} excl. BTW`}
                  </div>
                  {discountMessage && (
                    <div className="text-green-500 font-medium">
                      {discountMessage}
                    </div>
                  )}
                </div> */}
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 md:space-y-4">
                  {t("pricing.professional.features", {
                    returnObjects: true,
                  }).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-muted-foreground">
                  {t("pricing.professional.description")}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <Link href="/contact">{t("pricing.cta")}</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Custom Plan */}
            <Card className="border-2 hover:border-green-500 transition-all duration-300 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {t("pricing.custom.title")}
                </CardTitle>
                <CardDescription className="text-lg font-medium">
                  {t("pricing.custom.tagline")}
                </CardDescription>
                {/* <div className="mt-4">
                  <div className="text-xl font-bold">
                    {t("pricing.custom.price")}
                  </div>
                  {discountMessage && (
                    <div className="text-green-500 font-medium">
                      {discountMessage}
                    </div>
                  )}
                </div> */}
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 md:space-y-4">
                  {t("pricing.custom.features", { returnObjects: true }).map(
                    (feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
                <div className="mt-6 text-muted-foreground">
                  {t("pricing.custom.description")}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  <Link href="/contact">{t("pricing.cta")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/50 lg:px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 md:mb-12 text-center">
            {t("pricing.additional.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
            <Card className="border-2 hover:border-green-500 transition-all duration-300">
              <CardHeader>
                <CardTitle>{t("pricing.additional.ai.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("pricing.additional.ai.description")}</p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:text-green-500 hover:border-green-500"
                >
                  <Link href="/contact">{t("pricing.cta")}</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 hover:border-green-500 transition-all duration-300">
              <CardHeader>
                <CardTitle>
                  {t("pricing.additional.validation.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("pricing.additional.validation.description")}</p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full hover:text-green-500 hover:border-green-500"
                >
                  <Link href="/contact">{t("pricing.cta")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

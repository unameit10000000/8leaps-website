"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// Dynamically import the ParticleLogo component with SSR disabled
const ParticleLogo = dynamic(() => import("@/components/ParticleLogo"), {
  ssr: false,
});

export default function MVPPage() {
  const { t, language } = useLanguage();
  const [showAnimation, setShowAnimation] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Function to set the correct viewport height
    const setVH = () => {
      // First we get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set the height initially
    setVH();

    // Add event listener to reset when window is resized
    window.addEventListener("resize", setVH);

    // Clean up
    return () => window.removeEventListener("resize", setVH);
  }, []);

  useEffect(() => {
    // Show animation when component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000); // 4s display + 1s fade = 5s total

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = (packageName: string) => {
    setSelectedPackage(packageName);
    setShowOrderDialog(true);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Animation overlay that completely covers everything */}
      {!animationComplete && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500"
          style={{
            opacity: showAnimation ? 1 : 0,
            animation: "fadeOut 1s forwards 4s", // 4s display + 1s fade = 5s total
          }}
        >
          <div
            className="w-full"
            style={{
              height: "calc(var(--vh, 1vh) * 100)",
            }}
          >
            {isMobile ? (
              <ParticleLogo
                logoSrc="/logo-full-dark.svg"
                colors={["#00ff00", "#00ee88"]}
                particleDensity={25}
                particleSpeed={5}
                particleSize={1}
                particleType="circle"
                randomizeSizes={false}
                enableHoverEffect={true}
                hoverRadius={50}
                hoverStrength={10}
                backgroundColor="black"
                width="100%"
                height="100%"
              />
            ) : (
              <ParticleLogo
                logoSrc="/logo-full-dark.svg"
                colors={["#00ff00", "#00ee88"]}
                particleDensity={10}
                particleSpeed={5}
                particleSize={2}
                particleType="circle"
                randomizeSizes={false}
                enableHoverEffect={true}
                hoverRadius={150}
                hoverStrength={20}
                backgroundColor="black"
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      )}

      {/* Only show content after animation is complete */}
      <div
        className={
          animationComplete
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0"
        }
      >
        <Header />
        <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24 lg:px-4">
          <div className="container">
            <h1 className="text-4xl font-bold text-white text-center">
              {t("services.mvp.title")}
            </h1>
            <p className="text-white text-center mt-4 max-w-2xl mx-auto">
              {language === "en"
                ? "Get your product to market quickly with our rapid MVP development service"
                : "Breng uw product snel op de markt met onze snelle MVP-ontwikkelingsservice"}
            </p>
          </div>
        </div>

        {/* Hero section */}
        <section className="py-16 md:py-24 lg:px-4">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {language === "en"
                    ? "From Idea to MVP in Just 1-3 Weeks"
                    : "Van Idee naar MVP in Slechts 1-3 Weken"}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {language === "en"
                    ? "Our MVP (Minimum Viable Product) development service is designed for startups and entrepreneurs who need to validate their ideas quickly and efficiently."
                    : "Onze MVP (Minimum Viable Product) ontwikkelingsservice is ontworpen voor startups en ondernemers die hun ideeën snel en efficiënt willen valideren."}
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === "en"
                    ? "We focus on building the core functionality of your product, allowing you to test your concept with real users and gather valuable feedback before investing in a full-scale solution."
                    : "We richten ons op het bouwen van de kernfunctionaliteit van uw product, zodat u uw concept kunt testen met echte gebruikers en waardevolle feedback kunt verzamelen voordat u investeert in een volledige oplossing."}
                </p>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white px-8"
                  onClick={() => {
                    document
                      .getElementById("mvp-options")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {language === "en" ? "View Options" : "Bekijk Opties"}
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <Image
                    src="/mvp.png"
                    alt="MVP Development"
                    width={320}
                    height={320}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="py-16 md:py-24 lg:px-4">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {language === "en"
                ? "Our MVP Development Process"
                : "Ons MVP Ontwikkelingsproces"}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "en"
                    ? "Discovery & Planning"
                    : "Ontdekking & Planning"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "We start with a deep dive into your idea, identifying the core features that will provide the most value to your users."
                    : "We beginnen met een diepgaande analyse van uw idee, waarbij we de kernfuncties identificeren die de meeste waarde voor uw gebruikers zullen opleveren."}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Feature prioritization"
                        : "Functie prioritering"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "User journey mapping"
                        : "Gebruikersreis in kaart brengen"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Technology selection"
                        : "Technologieselectie"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "en"
                    ? "Rapid Development"
                    : "Snelle Ontwikkeling"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "Our experienced team works in short, focused sprints to build your MVP with the essential functionality."
                    : "Ons ervaren team werkt in korte, gerichte sprints om uw MVP te bouwen met de essentiële functionaliteit."}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Agile methodology"
                        : "Agile methodologie"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Daily progress updates"
                        : "Dagelijkse voortgangsupdates"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Continuous integration"
                        : "Continue integratie"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {language === "en"
                    ? "Launch & Iterate"
                    : "Lanceren & Itereren"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "We help you launch your MVP and gather initial user feedback, which can inform future development decisions."
                    : "We helpen u bij het lanceren van uw MVP en het verzamelen van initiële gebruikersfeedback, die toekomstige ontwikkelingsbeslissingen kan informeren."}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Deployment assistance"
                        : "Hulp bij implementatie"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Basic analytics setup"
                        : "Basis analytics setup"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Feedback collection tools"
                        : "Feedback verzamelingstools"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className="py-16 bg-muted/50 lg:px-4">
          <div className="container">
            <h2
              className="text-3xl font-bold mb-6 text-center"
              id="mvp-options"
            >
              {language === "en"
                ? "MVP Development Options"
                : "MVP Ontwikkelingsopties"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {language === "en"
                ? "Choose the right MVP package for your needs and budget."
                : "Kies het juiste MVP-pakket voor uw behoeften en budget."}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* MVP One */}
              <div className="bg-card p-8 rounded-lg border-2 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2">MVP One</h3>
                <div className="text-3xl font-bold mb-1">$499</div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en"
                    ? "One-time Payment"
                    : "Eenmalige betaling"}
                </p>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "For those who need the simplest version of their product to test an idea quickly."
                    : "Voor degenen die de eenvoudigste versie van hun product nodig hebben om snel een idee te testen."}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "For Web Applications Only"
                        : "Alleen voor webapplicaties"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en" ? "1 Core Feature" : "1 kernfunctie"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en" ? "Authentication" : "Authenticatie"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en" ? "Deployment" : "Implementatie"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Clean, Functional UI"
                        : "Schone, functionele UI"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Delivered in 1-3 Weeks"
                        : "Geleverd in 1-3 weken"}
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white mt-auto"
                  onClick={() => handleGetStarted("MVP One")}
                >
                  {language === "en" ? "Get Started" : "Aan de slag"}
                </Button>
              </div>

              {/* MVP Standard */}
              <div className="bg-card p-8 rounded-lg border-2 border-green-500 flex flex-col h-full relative">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  {language === "en" ? "Popular" : "Populair"}
                </div>
                <h3 className="text-2xl font-bold mb-2">MVP Standard</h3>
                <div className="text-3xl font-bold mb-1">$2,499</div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en"
                    ? "One-time or Milestone Payments"
                    : "Eenmalige of mijlpaalbetalingen"}
                </p>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "For MVPs that require more functionality and a well-structured product plan."
                    : "Voor MVP's die meer functionaliteit en een goed gestructureerd productplan vereisen."}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "For Web & Mobile Applications"
                        : "Voor web- en mobiele applicaties"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "2 or More Core Features"
                        : "2 of meer kernfuncties"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en" ? "Authentication" : "Authenticatie"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Custom UI Design"
                        : "Aangepast UI-ontwerp"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Product Requirements Document"
                        : "Product vereisten document"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Deployment & Hosting Setup"
                        : "Implementatie & hosting setup"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "1 Month of Post-Launch Support"
                        : "1 maand ondersteuning na lancering"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Delivered in 1-3 Weeks"
                        : "Geleverd in 1-3 weken"}
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white mt-auto"
                  onClick={() => handleGetStarted("MVP Standard")}
                >
                  {language === "en" ? "Get Started" : "Aan de slag"}
                </Button>
              </div>

              {/* MVP Growth */}
              <div className="bg-card p-8 rounded-lg border-2 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-2">MVP Growth</h3>
                <div className="text-3xl font-bold mb-1">$1,499</div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en" ? "Per Month" : "Per maand"}
                </p>
                <p className="text-muted-foreground mb-6">
                  {language === "en"
                    ? "For founders who need ongoing development and iterations for their MVP."
                    : "Voor oprichters die doorlopende ontwikkeling en iteraties nodig hebben voor hun MVP."}
                </p>
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "For Web & Mobile Applications"
                        : "Voor web- en mobiele applicaties"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Continuous Feature Development"
                        : "Continue functieontwikkeling"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Bug Fixes & Maintenance"
                        : "Bugfixes & onderhoud"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "UX/UI Refinements"
                        : "UX/UI-verfijningen"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Scaling Support"
                        : "Schaalondersteuning"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Bi-Weekly Strategy & Progress Calls"
                        : "Tweewekelijkse strategie- en voortgangsgesprekken"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en"
                        ? "Ongoing Development & Support"
                        : "Doorlopende ontwikkeling & ondersteuning"}
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white mt-auto"
                  onClick={() => handleGetStarted("MVP Growth")}
                >
                  {language === "en" ? "Get Started" : "Aan de slag"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 lg:px-4">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === "en"
                ? "Questions about building an MVP?"
                : "Vragen over het bouwen van een MVP?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === "en"
                ? "Let's talk about how we can turn your idea into a working product in just 1-3 weeks."
                : "Laten we bespreken hoe we uw idee in slechts 1-3 weken kunnen omzetten in een werkend product."}
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-8"
              onClick={() => {
                setSelectedPackage(null);
                setShowOrderDialog(true);
              }}
            >
              {t("services.contact")}
            </Button>
          </div>
        </section>

        <Footer />
      </div>

      {/* Order Summary Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>
              {language === "en"
                ? "Request MVP Development"
                : "MVP-ontwikkeling aanvragen"}
            </DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Review your package details and fill in your contact information to submit."
                : "Bekijk uw pakketgegevens en vul uw contactgegevens in om te verzenden."}
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable content area */}
          <div
            className="overflow-y-auto flex-grow py-4 pr-2"
            style={{ maxHeight: "calc(90vh - 180px)" }}
          >
            {/* Package Summary */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>{language === "en" ? "Package:" : "Pakket:"}</span>
                <span className="font-medium">
                  {selectedPackage ||
                    (language === "en"
                      ? "Custom Request"
                      : "Aangepaste aanvraag")}
                </span>
              </div>

              {selectedPackage === "MVP One" && (
                <>
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Price:" : "Prijs:"}</span>
                    <span className="font-medium">$499</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Timeline:" : "Tijdlijn:"}</span>
                    <span className="font-medium">
                      {language === "en" ? "1-3 Weeks" : "1-3 Weken"}
                    </span>
                  </div>
                </>
              )}

              {selectedPackage === "MVP Standard" && (
                <>
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Price:" : "Prijs:"}</span>
                    <span className="font-medium">$2,499</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Timeline:" : "Tijdlijn:"}</span>
                    <span className="font-medium">
                      {language === "en" ? "1-3 Weeks" : "1-3 Weken"}
                    </span>
                  </div>
                </>
              )}

              {selectedPackage === "MVP Growth" && (
                <>
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Price:" : "Prijs:"}</span>
                    <span className="font-medium">
                      $1,499 {language === "en" ? "per month" : "per maand"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === "en" ? "Timeline:" : "Tijdlijn:"}</span>
                    <span className="font-medium">
                      {language === "en" ? "Ongoing" : "Doorlopend"}
                    </span>
                  </div>
                </>
              )}
            </div>

            <Separator className="my-4" />

            {/* Contact Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    {language === "en" ? "First Name" : "Voornaam"}
                  </label>
                  <input
                    id="firstName"
                    className="w-full p-2 border rounded-md"
                    placeholder={language === "en" ? "John" : "Jan"}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    {language === "en" ? "Last Name" : "Achternaam"}
                  </label>
                  <input
                    id="lastName"
                    className="w-full p-2 border rounded-md"
                    placeholder={language === "en" ? "Doe" : "Jansen"}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {language === "en" ? "Email" : "E-mail"}
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder={
                    language === "en"
                      ? "john.doe@example.com"
                      : "jan.jansen@voorbeeld.nl"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  {language === "en"
                    ? "Phone (optional)"
                    : "Telefoon (optioneel)"}
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full p-2 border rounded-md"
                  placeholder="+31 6 12345678"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="projectDescription"
                  className="text-sm font-medium"
                >
                  {language === "en"
                    ? "Project Description"
                    : "Projectbeschrijving"}
                </label>
                <textarea
                  id="projectDescription"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  placeholder={
                    language === "en"
                      ? "Tell us about your project idea and what you're looking to achieve..."
                      : "Vertel ons over uw projectidee en wat u wilt bereiken..."
                  }
                />
              </div>
            </form>
          </div>

          <DialogFooter className="sm:justify-between flex-shrink-0 mt-4 pt-2 border-t">
            <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
              {language === "en" ? "Back" : "Terug"}
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={async () => {
                // Get form values
                const firstName = (
                  document.getElementById("firstName") as HTMLInputElement
                )?.value;
                const lastName = (
                  document.getElementById("lastName") as HTMLInputElement
                )?.value;
                const email = (
                  document.getElementById("email") as HTMLInputElement
                )?.value;
                const phone = (
                  document.getElementById("phone") as HTMLInputElement
                )?.value;
                const projectDescription = (
                  document.getElementById(
                    "projectDescription"
                  ) as HTMLTextAreaElement
                )?.value;

                // Validate required fields
                if (!firstName || !lastName || !email) {
                  alert(
                    language === "en"
                      ? "Please fill in all required fields"
                      : "Vul alle verplichte velden in"
                  );
                  return;
                }

                // Set loading state
                setIsLoading(true);

                try {
                  // Send the form data to our API
                  const response = await fetch("/api/form-submission", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      formType: "mvp",
                      formData: {
                        firstName,
                        lastName,
                        email,
                        phone,
                        projectDescription,
                        selectedPackage,
                        language, // Add the current language
                      },
                    }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    // Show success message
                    alert(
                      language === "en"
                        ? "Your request has been submitted! We'll contact you soon."
                        : "Uw aanvraag is ingediend! We nemen binnenkort contact met u op."
                    );
                    setShowOrderDialog(false);
                  } else {
                    // Show error message
                    alert(
                      language === "en"
                        ? `Error: ${data.error || "Failed to submit request"}`
                        : `Fout: ${data.error || "Aanvraag indienen mislukt"}`
                    );
                  }
                } catch (error) {
                  // Show error message
                  alert(
                    language === "en"
                      ? "An unexpected error occurred. Please try again later."
                      : "Er is een onverwachte fout opgetreden. Probeer het later opnieuw."
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === "en" ? "Submitting..." : "Indienen..."}
                </span>
              ) : language === "en" ? (
                "Submit Request"
              ) : (
                "Aanvraag indienen"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add CSS for animation */}
      <style jsx global>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        :root {
          --vh: 1vh;
        }
      `}</style>
    </main>
  );
}

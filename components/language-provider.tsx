"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "nl";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Add pricing page translations
const translations = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.allservices": "All Services",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "services.webdev": "Web Development",
    "services.aiintegration": "AI Integrations",
    "services.consulting": "IT Consulting",
    "services.validation": "Idea Validation",
    "services.learnmore": "Learn more",
    "services.contact": "Contact us",
    "hero.title": "Jump forward. Stay ahead.",
    "hero.subtitle":
      "Your competition doesn't wait, and neither do we. From powerful web experiences to smart consultancy, we help you move fast, stay relevant, and continuously improve your digital presence.",
    "hero.cta": "Learn more about our services",
    "chat.button": "Schedule a Call ☕",
    "footer.rights": "All rights reserved",
    "services.title": "Our Services",
    "services.description":
      "We provide comprehensive development solutions to help your business thrive in the digital world.",
    "services.page.subtitle": "Comprehensive solutions for your digital needs",
    "footer.description":
      "Professional web development services that help businesses leap forward in the digital world.",
    "footer.quicklinks": "Quick Links",
    "footer.connect": "Connect",
    "services.webdev.desc":
      "Custom, modern, responsive websites and web applications built with the latest technologies and thoughtful design.",
    "services.aiintegration.desc":
      "Seamless AI integration solutions to enhance your digital products and services.",
    "services.consulting.desc":
      "Strategic technology consulting to help your business grow and innovate.",
    "services.validation.desc":
      "Comprehensive testing and validation for new ideas and early-stage products. We act as real users, perform blackbox testing, and check for security issues and bugs to ensure your product is market-ready.",

    // Detailed service descriptions
    "services.consulting.sub1": "Strategic technology planning and roadmapping",
    "services.consulting.sub2": "Digital transformation guidance",
    "services.consulting.sub3": "Technology stack selection and optimization",
    "services.consulting.sub4": "Process improvement and automation",
    "services.consulting.card1.title": "Technology Strategy",
    "services.consulting.card1.description":
      "We help you develop a comprehensive technology strategy aligned with your business goals, ensuring you invest in the right solutions for sustainable growth.",
    "services.consulting.card2.title": "Digital Transformation",
    "services.consulting.card2.description":
      "Navigate the complexities of digital transformation with expert guidance on implementing new technologies and optimizing existing processes.",

    "services.validation.sub1": "User experience testing and feedback",
    "services.validation.sub2": "Market fit analysis",
    "services.validation.sub3": "Security and performance testing",
    "services.validation.sub4":
      "Comprehensive bug reporting and recommendations",
    "services.validation.card1.title": "User Testing",
    "services.validation.card1.description":
      "We act as real users to test your product, providing detailed feedback on usability, functionality, and overall experience.",
    "services.validation.card2.title": "Technical Validation",
    "services.validation.card2.description":
      "Our experts perform thorough technical validation, identifying potential security issues, performance bottlenecks, and bugs before launch.",

    "services.webdev.sub1": "Custom website and web application development",
    "services.webdev.sub2": "Responsive design for all devices",
    "services.webdev.sub3": "E-commerce solutions",
    "services.webdev.sub4": "Content management systems",
    "services.webdev.sub5": "Performance optimization and SEO",
    "services.webdev.card1.title": "WordPress Solutions",
    "services.webdev.card1.description":
      "From simple websites to complex custom solutions, we build professional WordPress sites with clean code, optimized performance, and user-friendly admin interfaces.",
    "services.webdev.card2.title": "Custom Web Applications",
    "services.webdev.card2.description":
      "We develop tailored web applications using modern frameworks and technologies to meet your specific business requirements and provide a seamless user experience.",

    "services.aiintegration.sub1": "AI-powered chatbots and virtual assistants",
    "services.aiintegration.sub2": "Content generation and optimization tools",
    "services.aiintegration.sub3": "Data analysis and insights automation",
    "services.aiintegration.sub4":
      "Custom AI solutions for specific business needs",
    "services.aiintegration.card1.title": "Conversational AI",
    "services.aiintegration.card1.description":
      "Enhance customer engagement with intelligent chatbots and virtual assistants that provide personalized interactions and support.",
    "services.aiintegration.card2.title": "AI-Powered Automation",
    "services.aiintegration.card2.description":
      "Streamline operations and boost productivity with custom AI solutions that automate repetitive tasks and provide valuable insights from your data.",

    "services.cta.title": "Ready to transform your digital presence?",
    "services.cta.description":
      "Let's discuss how our services can help your business grow and succeed in the digital landscape.",
    "services.cta.contact": "Contact us",
    "services.cta.pricing": "View pricing",

    // About page translations
    "about.title": "About Us",
    "about.mission.title": "Our Mission",
    "about.mission.text1":
      "At 8Leaps, we're dedicated to helping businesses make significant leaps forward in their digital journey. Our mission is to provide innovative, high-quality technology solutions that drive growth and create meaningful digital experiences.",
    "about.mission.text2":
      "We believe in building long-term partnerships with our clients, understanding their unique challenges, and delivering solutions that exceed expectations.",
    "about.values.title": "Our Values",
    "about.values.innovation.title": "Innovation",
    "about.values.innovation.text":
      "We constantly explore new technologies and approaches to deliver cutting-edge solutions.",
    "about.values.quality.title": "Quality",
    "about.values.quality.text":
      "We're committed to excellence in everything we do, from code to client communication.",
    "about.values.collaboration.title": "Collaboration",
    "about.values.collaboration.text":
      "We work closely with our clients, treating their challenges as our own.",
    "about.approach.title": "Our Approach",
    "about.approach.text1":
      "We take a strategic, client-focused approach to every project. Our process begins with a deep understanding of your business goals and challenges. We then craft tailored solutions that address your specific needs, using the most appropriate technologies and methodologies.",
    "about.approach.text2":
      "Our team of experienced professionals brings expertise across a range of disciplines, from web development and AI integration to IT consulting and idea validation. We're committed to delivering results that drive your business forward.",

    // Contact page translations
    "contact.title": "Contact Us",
    "contact.getintouch.title": "Get in Touch",
    "contact.getintouch.text":
      "Have a question or want to discuss a project? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.",
    "contact.email.title": "Email",
    "contact.phone.title": "Phone",
    "contact.location.title": "Location",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "Your email",
    "contact.form.subject": "Subject",
    "contact.form.subject.placeholder": "Subject",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Your message",
    "contact.form.submit": "Send Message",
    "contact.letschat.title": "Let's Chat",
    "contact.letschat.text":
      "Prefer a more direct approach? Schedule a call with us to discuss your project needs.",
    "contact.letschat.button": "Schedule a Call ☕",

    // Pricing page translations
    "pricing.title": "Pricing",
    "pricing.subtitle": "Transparent pricing for your digital needs",
    "pricing.starter.title": "Starter",
    "pricing.starter.tagline": "Simple & effective",
    "pricing.starter.price": "from €300 excl. VAT",
    "pricing.starter.discount": "Temporarily from €265!",
    "pricing.starter.features": [
      "WordPress CMS",
      "Clean, simple layout",
      "Up to 5 pages",
      "Contact form",
      "Mobile-friendly",
      "Search engine-friendly",
      "Ready-made solution possible",
    ],
    "pricing.starter.description":
      "Perfect for those who need a simple yet professional online presence with essential features.",
    "pricing.professional.title": "Professional",
    "pricing.professional.tagline": "Professional & complete",
    "pricing.professional.price": "from €850 excl. VAT",
    "pricing.professional.popular": "Popular",
    "pricing.professional.features": [
      "WordPress CMS",
      "Tailored design",
      "Design revisions for 100% satisfaction",
      "Content structured to your needs",
      "Unlimited pages",
      "Advanced forms",
      "News / Portfolio / Projects sections",
      "Optimized for mobile & performance",
      "SEO setup",
      "Flexible layout options",
    ],
    "pricing.professional.description":
      "Ideal for those who need a comprehensive online platform with advanced features and customization options.",
    "pricing.custom.title": "Custom-made",
    "pricing.custom.tagline": "Completely custom-built",
    "pricing.custom.price": "from € p.o.a. excl. VAT",
    "pricing.custom.features": [
      "WordPress CMS",
      "Exclusive, one-of-a-kind design",
      "Advanced features and integrations",
      "Custom-coded components",
      "Database connections",
      "Fully responsive design",
      "Custom CMS enhancements",
      "Full SEO optimization",
      "Blazing fast performance",
    ],
    "pricing.custom.description":
      "For projects with unique requirements and specific needs—built exactly to your specifications.",
    "pricing.additional.title": "Additional Services",
    "pricing.additional.ai.title": "AI Integrations",
    "pricing.additional.ai.description":
      "Smart integrations for startups and established businesses. From chatbots to content tools and backend automation—bring AI into your product, website, or workflow.",
    "pricing.additional.validation.title": "Idea Validation",
    "pricing.additional.validation.description":
      "Testing and validation for new products and startup ideas. We act like real users, test like devs, and think like critics—offering you feedback, bug reports, and UX suggestions before launch.",
    "pricing.cta": "Contact us",
  },
  nl: {
    "nav.home": "Home",
    "nav.services": "Diensten",
    "nav.allservices": "Alle Diensten",
    "nav.pricing": "Tarieven",
    "nav.about": "Over ons",
    "nav.contact": "Contact",
    "services.webdev": "Webontwikkeling",
    "services.aiintegration": "AI Integraties",
    "services.consulting": "IT Consultancy",
    "services.validation": "Idee Validatie",
    "services.learnmore": "Meer informatie",
    "services.contact": "Neem contact op",
    "hero.title": "Spring vooruit. Blijf voorop.",
    "hero.subtitle":
      "De concurrentie wacht niet—en wij ook niet. Van krachtige weboplossingen tot slimme strategie, wij zorgen dat je snel schakelt, relevant blijft en je digitale aanwezigheid blijft verbeteren.",
    "hero.cta": "Lees meer over onze diensten",
    "chat.button": "Plan Gesprek ☕",
    "footer.rights": "Alle rechten voorbehouden",
    "services.title": "Onze Diensten",
    "services.description":
      "Wij bieden uitgebreide ontwikkelingsoplossingen om uw bedrijf te laten floreren in de digitale wereld.",
    "services.page.subtitle":
      "Uitgebreide oplossingen voor uw digitale behoeften",
    "footer.description":
      "Professionele webontwikkelingsdiensten die bedrijven helpen vooruit te springen in de digitale wereld.",
    "footer.quicklinks": "Snelle Links",
    "footer.connect": "Verbinden",
    "services.webdev.desc":
      "Op maat gemaakte, moderne, responsieve websites en webapplicaties gebouwd met de nieuwste technologieën en doordacht ontwerp.",
    "services.aiintegration.desc":
      "Naadloze AI-integratieoplossingen om uw digitale producten en diensten te verbeteren.",
    "services.consulting.desc":
      "Strategische technologische consultancy om uw bedrijf te laten groeien en innoveren.",
    "services.validation.desc":
      "Uitgebreide tests en validatie voor nieuwe ideeën en producten in een vroeg stadium. We handelen als echte gebruikers, voeren blackbox-tests uit en controleren op beveiligingsproblemen en bugs om ervoor te zorgen dat uw product klaar is voor de markt.",

    // Detailed service descriptions
    "services.consulting.sub1":
      "Strategische technologieplanning en roadmapping",
    "services.consulting.sub2": "Begeleiding bij digitale transformatie",
    "services.consulting.sub3":
      "Selectie en optimalisatie van technologiestack",
    "services.consulting.sub4": "Procesverbetering en automatisering",
    "services.consulting.card1.title": "Technologiestrategie",
    "services.consulting.card1.description":
      "We helpen u een uitgebreide technologiestrategie te ontwikkelen die is afgestemd op uw bedrijfsdoelstellingen, zodat u investeert in de juiste oplossingen voor duurzame groei.",
    "services.consulting.card2.title": "Digitale Transformatie",
    "services.consulting.card2.description":
      "Navigeer door de complexiteit van digitale transformatie met deskundige begeleiding bij het implementeren van nieuwe technologieën en het optimaliseren van bestaande processen.",

    "services.validation.sub1": "Gebruikerservaring testen en feedback",
    "services.validation.sub2": "Marktfit analyse",
    "services.validation.sub3": "Beveiligings- en prestatietests",
    "services.validation.sub4": "Uitgebreide bugrapportage en aanbevelingen",
    "services.validation.card1.title": "Gebruikerstesten",
    "services.validation.card1.description":
      "We handelen als echte gebruikers om uw product te testen en geven gedetailleerde feedback over bruikbaarheid, functionaliteit en algemene ervaring.",
    "services.validation.card2.title": "Technische Validatie",
    "services.validation.card2.description":
      "Onze experts voeren grondige technische validatie uit, waarbij potentiële beveiligingsproblemen, prestatiebottlenecks en bugs worden geïdentificeerd vóór de lancering.",

    "services.webdev.sub1":
      "Ontwikkeling van aangepaste websites en webapplicaties",
    "services.webdev.sub2": "Responsief ontwerp voor alle apparaten",
    "services.webdev.sub3": "E-commerce oplossingen",
    "services.webdev.sub4": "Content management systemen",
    "services.webdev.sub5": "Prestatie-optimalisatie en SEO",
    "services.webdev.card1.title": "WordPress Oplossingen",
    "services.webdev.card1.description":
      "Van eenvoudige websites tot complexe aangepaste oplossingen, we bouwen professionele WordPress-sites met schone code, geoptimaliseerde prestaties en gebruiksvriendelijke beheerinterfaces.",
    "services.webdev.card2.title": "Aangepaste Webapplicaties",
    "services.webdev.card2.description":
      "We ontwikkelen op maat gemaakte webapplicaties met moderne frameworks en technologieën om aan uw specifieke zakelijke vereisten te voldoen en een naadloze gebruikerservaring te bieden.",

    "services.aiintegration.sub1":
      "AI-gestuurde chatbots en virtuele assistenten",
    "services.aiintegration.sub2":
      "Tools voor contentgeneratie en -optimalisatie",
    "services.aiintegration.sub3":
      "Automatisering van gegevensanalyse en inzichten",
    "services.aiintegration.sub4":
      "Aangepaste AI-oplossingen voor specifieke zakelijke behoeften",
    "services.aiintegration.card1.title": "Conversationele AI",
    "services.aiintegration.card1.description":
      "Verbeter klantbetrokkenheid met intelligente chatbots en virtuele assistenten die gepersonaliseerde interacties en ondersteuning bieden.",
    "services.aiintegration.card2.title": "AI-gestuurde Automatisering",
    "services.aiintegration.card2.description":
      "Stroomlijn operaties en verhoog productiviteit met aangepaste AI-oplossingen die repetitieve taken automatiseren en waardevolle inzichten uit uw gegevens halen.",

    "services.cta.title": "Klaar om uw digitale aanwezigheid te transformeren?",
    "services.cta.description":
      "Laten we bespreken hoe onze diensten uw bedrijf kunnen helpen groeien en slagen in het digitale landschap.",
    "services.cta.contact": "Neem contact op",
    "services.cta.pricing": "Bekijk tarieven",

    // About page translations
    "about.title": "Over Ons",
    "about.mission.title": "Onze Missie",
    "about.mission.text1":
      "Bij 8Leaps zijn we toegewijd om bedrijven te helpen significante sprongen voorwaarts te maken in hun digitale reis. Onze missie is het leveren van innovatieve, hoogwaardige technologische oplossingen die groei stimuleren en betekenisvolle digitale ervaringen creëren.",
    "about.mission.text2":
      "Wij geloven in het opbouwen van langdurige partnerschappen met onze klanten, het begrijpen van hun unieke uitdagingen en het leveren van oplossingen die de verwachtingen overtreffen.",
    "about.values.title": "Onze Waarden",
    "about.values.innovation.title": "Innovatie",
    "about.values.innovation.text":
      "We verkennen voortdurend nieuwe technologieën en benaderingen om geavanceerde oplossingen te leveren.",
    "about.values.quality.title": "Kwaliteit",
    "about.values.quality.text":
      "We streven naar uitmuntendheid in alles wat we doen, van code tot klantcommunicatie.",
    "about.values.collaboration.title": "Samenwerking",
    "about.values.collaboration.text":
      "We werken nauw samen met onze klanten en behandelen hun uitdagingen als de onze.",
    "about.approach.title": "Onze Aanpak",
    "about.approach.text1":
      "We hanteren een strategische, klantgerichte aanpak voor elk project. Ons proces begint met een diepgaand begrip van uw bedrijfsdoelen en uitdagingen. Vervolgens ontwikkelen we op maat gemaakte oplossingen die aan uw specifieke behoeften voldoen, met behulp van de meest geschikte technologieën en methodologieën.",
    "about.approach.text2":
      "Ons team van ervaren professionals brengt expertise op verschillende gebieden, van webontwikkeling en AI-integratie tot IT-consultancy en ideevalidatie. We zijn toegewijd aan het leveren van resultaten die uw bedrijf vooruit helpen.",

    // Contact page translations
    "contact.title": "Contact",
    "contact.getintouch.title": "Neem Contact Op",
    "contact.getintouch.text":
      "Heeft u een vraag of wilt u een project bespreken? We horen graag van u. Vul het formulier in en we nemen zo snel mogelijk contact met u op.",
    "contact.email.title": "E-mail",
    "contact.phone.title": "Telefoon",
    "contact.location.title": "Locatie",
    "contact.form.name": "Naam",
    "contact.form.name.placeholder": "Uw naam",
    "contact.form.email": "E-mail",
    "contact.form.email.placeholder": "Uw e-mail",
    "contact.form.subject": "Onderwerp",
    "contact.form.subject.placeholder": "Onderwerp",
    "contact.form.message": "Bericht",
    "contact.form.message.placeholder": "Uw bericht",
    "contact.form.submit": "Bericht Versturen",
    "contact.letschat.title": "Laten We Praten",
    "contact.letschat.text":
      "Geeft u de voorkeur aan een directere aanpak? Plan een gesprek met ons om uw projectbehoeften te bespreken.",
    "contact.letschat.button": "Plan een Gesprek ☕",

    // Pricing page translations
    "pricing.title": "Tarieven",
    "pricing.subtitle": "Transparante prijzen voor uw digitale behoeften",
    "pricing.starter.title": "Starter",
    "pricing.starter.tagline": "Eenvoudig & effectief",
    "pricing.starter.price": "vanaf €300 excl. BTW",
    "pricing.starter.discount": "Tijdelijk vanaf €265!",
    "pricing.starter.features": [
      "WordPress CMS",
      "Strakke, eenvoudige layout",
      "Tot 5 pagina's",
      "Contactformulier",
      "Mobiel-vriendelijk",
      "Zoekmachine-vriendelijk",
      "Kant-en-klare oplossing mogelijk",
    ],
    "pricing.starter.description":
      "Perfect voor wie een eenvoudige maar professionele online aanwezigheid nodig heeft met essentiële functies.",
    "pricing.professional.title": "Professional",
    "pricing.professional.tagline": "Professioneel & compleet",
    "pricing.professional.price": "vanaf €850 excl. BTW",
    "pricing.professional.popular": "Populair",
    "pricing.professional.features": [
      "WordPress CMS",
      "Op maat gemaakt ontwerp",
      "Ontwerpherzieningen voor 100% tevredenheid",
      "Content gestructureerd naar uw behoeften",
      "Onbeperkt aantal pagina's",
      "Geavanceerde formulieren",
      "Nieuws / Portfolio / Projecten secties",
      "Geoptimaliseerd voor mobiel & prestaties",
      "SEO setup",
      "Flexibele layout opties",
    ],
    "pricing.professional.description":
      "Ideaal voor wie een uitgebreid online platform nodig heeft met geavanceerde functies en aanpassingsmogelijkheden.",
    "pricing.custom.title": "Op maat gemaakt",
    "pricing.custom.tagline": "Volledig op maat gebouwd",
    "pricing.custom.price": "vanaf € p.o.a. excl. BTW",
    "pricing.custom.features": [
      "WordPress CMS",
      "Exclusief, uniek ontwerp",
      "Geavanceerde functies en integraties",
      "Op maat geprogrammeerde componenten",
      "Database verbindingen",
      "Volledig responsief ontwerp",
      "Aangepaste CMS verbeteringen",
      "Volledige SEO optimalisatie",
      "Razendsnelle prestaties",
    ],
    "pricing.custom.description":
      "Voor projecten met unieke vereisten en specifieke behoeften—precies gebouwd volgens uw specificaties.",
    "pricing.additional.title": "Aanvullende Diensten",
    "pricing.additional.ai.title": "AI Integraties",
    "pricing.additional.ai.description":
      "Slimme integraties voor startups en gevestigde bedrijven. Van chatbots tot content tools en backend automatisering—breng AI in uw product, website of workflow.",
    "pricing.additional.validation.title": "Idee Validatie",
    "pricing.additional.validation.description":
      "Testen en validatie voor nieuwe producten en startup ideeën. We handelen als echte gebruikers, testen als ontwikkelaars en denken als critici—en bieden u feedback, bugrapporten en UX-suggesties vóór de lancering.",
    "pricing.cta": "Neem contact op",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "nl") {
      setLanguage("nl");
    }

    // Check if there's a stored language preference
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang && (storedLang === "en" || storedLang === "nl")) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

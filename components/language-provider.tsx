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
    "nav.services": "Solutions",
    "nav.allservices": "All Services",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    // Blog
    "blog.back": "Back",
    "blog.readmore": "Read more",
    // Solutions page header
    "solutions.title": "Solutions",
    "solutions.page.subtitle": "Comprehensive services for your digital needs",
    "services.webdev": "Web Development",
    "services.aiintegration": "AI Integrations",
    "services.consulting": "IT Consulting",
    "services.validation": "Idea Validation",
    "services.learnmore": "Learn more",
    "services.contact": "Contact us",
    "hero.title": "Jump forward. Stay ahead.",
    "hero.subtitle":
      "The world doesn't wait, and neither do we. From impactful digital experiences to strategic support, we help projects move fast, grow with purpose, and stay ahead.",
    "hero.cta": "Checkout our services",
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

    // How We Work section translations
    "howwework.title": "How We Work",
    "howwework.description":
      "Our process ensures efficient delivery and high-quality results for your project.",
    "howwework.includes": "This stage includes:",

    "howwework.stage1.title": "Discovery and Planning",
    "howwework.stage1.description":
      "We start by understanding your needs and planning the development process.",
    "howwework.stage1.item1": "Preparing for development",
    "howwework.stage1.item2": "Content delivery",
    "howwework.stage1.item3": "Theme/style selection",
    "howwework.stage1.item4": "Project scope definition",

    "howwework.stage2.title": "Development and Testing",
    "howwework.stage2.description":
      "We build your solution and thoroughly test it to ensure quality.",
    "howwework.stage2.item1": "Frontend and backend development",
    "howwework.stage2.item2": "Responsive design implementation",
    "howwework.stage2.item3": "Quality assurance and testing",

    "howwework.stage3.title": "Deployment and Delivery",
    "howwework.stage3.description":
      "We launch your project and ensure everything works perfectly.",
    "howwework.stage3.item1": "Server configuration",
    "howwework.stage3.item2": "Domain setup and SSL installation",
    "howwework.stage3.item3": "Final review and handover",

    "howwework.stage4.title": "Maintenance (Optional)",
    "howwework.stage4.description":
      "We provide ongoing support to keep your solution running smoothly.",
    "howwework.stage4.item1": "Regular updates and security patches",
    "howwework.stage4.item2": "Performance monitoring",
    "howwework.stage4.item3": "Content updates and technical support",

    "howwework.learn.more": "Learn More About Our Process",

    // MVP service translations
    "services.mvp.title": "MVP Development",
    "services.mvp.desc":
      "Rapid development of your Minimum Viable Product to validate your idea quickly and efficiently.",
    "services.mvp.sub1": "From idea to MVP in 1-3 weeks",
    "services.mvp.sub2": "Focus on core functionality",
    "services.mvp.sub3": "User testing and feedback collection",
    "services.mvp.sub4": "Iterative development approach",
    "services.mvp.card1.title": "Quick Launch",
    "services.mvp.card1.description":
      "Get your product to market in just 1-3 weeks, allowing you to start gathering user feedback immediately.",
    "services.mvp.card2.title": "Iterative Approach",
    "services.mvp.card2.description":
      "We work in short sprints, allowing for quick adjustments based on your feedback throughout the development process.",
    "services.mvp.button": "Start",

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
    "services.webdev.sub3": "Content management systems",
    "services.webdev.sub4": "Performance optimization and SEO",
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
      "Have a question or want to discuss a project? We'd love to hear from you. Fill in the form or plan a meeting to have a chat.",
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
      "Schedule a call (phone or Google Meet) with us to discuss your project needs.",
    "contact.letschat.button": "Schedule a Call ☕",

    // Pricing page translations
    "pricing.title": "Pricing",
    "pricing.subtitle": "Transparent pricing for your digital needs",
    "pricing.starter.title": "Starter",
    "pricing.starter.tagline": "Simple & effective",
    "pricing.starter.price": "from €300 excl. VAT",
    "pricing.starter.discount": "Temporarily from €265!",
    "pricing.starter.features": [
      // "WordPress CMS",
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
      // "WordPress CMS",
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
      // "WordPress CMS",
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
      "For projects with unique requirements and specific needs, built exactly to your specifications.",
    "pricing.additional.title": "Additional Services",
    "pricing.additional.ai.title": "AI Integrations",
    "pricing.additional.ai.description":
      "Smart integrations for startups and established businesses. From chatbots to content tools and backend automation, bring AI into your product, website, or workflow.",
    "pricing.additional.validation.title": "Idea Validation",
    "pricing.additional.validation.description":
      "Testing and validation for new products and startup ideas. We act like real users, test like devs, and think like critics, offering you feedback, bug reports, and UX-suggestions before launch.",
    "pricing.cta": "Contact us",
    "pricing.predefined.packages": "Fixed Bundles",
    "pricing.custom.calculator": "Choose yourself",
    "pricing.select.client.type": "I am a",
    "pricing.select.tier": "Select Tier",
    "pricing.need.custom":
      "Need a more customized solution? Try our calculator to build your own package.",
    "pricing.build.custom": "Compose bundle yourself",
    "pricing.step.type": "Type",
    "pricing.step.tier": "Tier",
    "pricing.step.technology": "Tools",
    "pricing.step.extras": "Extra",
    "pricing.select.technology": "Select Tools",
    "pricing.tech.consultation":
      "For the Custom-made tier, tools are determined during consultation",
    "pricing.continue": "Continue",
    "pricing.select.packages": "Select Additional Packages",
    "pricing.packages.consultation":
      "For the Custom-made tier, additional packages are determined during consultation",
    "pricing.back": "Back",
    "pricing.request.consultation": "Request Consultation",
    "pricing.summary": "Summary",
    "pricing.review.details":
      "Review your request details and fill in your contact information to submit.",
    "pricing.package": "Package:",
    "pricing.client.type": "Client Type:",
    "pricing.company": "Company",
    "pricing.company.desc": "Standard pricing for businesses of all sizes.",
    "pricing.student": "Student",
    "pricing.student.desc": "25% discount for students with valid ID.",
    "pricing.nonprofit": "Non-profit",
    "pricing.nonprofit.desc":
      "50% discount for registered non-profit organizations.",
    "pricing.discount": "Discount:",
    "pricing.total": "Total:",
    "pricing.tier": "Tier:",
    "pricing.technology": "Tools:",
    "pricing.packages": "Packages:",
    "pricing.consultation.needed": "Consultation needed",
    "pricing.form.firstname": "First Name",
    "pricing.form.lastname": "Last Name",
    "pricing.form.email": "Email",
    "pricing.form.phone": "Phone (optional)",
    "pricing.form.message": "Additional Information (optional)",
    "pricing.form.message.placeholder":
      "Tell us more about your project or specific requirements...",
    "pricing.form.submit": "Submit Request",
    "pricing.view.details": "View details",
    "pricing.tier.name": "Tier: ",
    "pricing.technology.name": "Tools:",
    "pricing.included.packages": "Included packages:",
    "pricing.compatible.with": "Compatible with:",
    "pricing.most.popular": "Most Popular",
    "pricing.popular": "Popular",
    "pricing.simple.bundle": "Simple Bundle",
    "pricing.plus.bundle": "Plus Bundle",
    "pricing.premium.bundle": "Premium Bundle",
    "pricing.simple.bundle.desc": "Simple website with basic functionality",
    "pricing.plus.bundle.desc": "Complete WordPress solution for businesses",
    "pricing.premium.bundle.desc": "Advanced solution with custom frontend",
    "pricing.month": "/month",
    "pricing.fill.required": "Please fill in all required fields",
    "pricing.request.submitted":
      "Request submitted! Check the console for details.",
    "pricing.tech.idontknow": "I don't know",
    "pricing.tech.frontend": "Frontend Full",
    "pricing.tech.wpheadless": "WP CMS (headless) + flexible frontend",
    "pricing.tech.wpfull": "WP CMS Full",
    "pricing.package.integrations": "Integrations (WP Plugins)",
    "pricing.package.contactforms": "Contact Forms",
    "pricing.package.setup": "Setup",
    "pricing.package.setup.desc": "Domain, hosting & email (one-time fee)",
    "pricing.package.maintenance": "Maintenance",
    "pricing.package.maintenance.desc":
      "Domain, hosting, email and updates (€9.99/month)",
    "pricing.in.consultation": "In consultation",
    "pricing.consultation.text":
      "For the Custom-made tier, additional packages are determined during consultation",
    "pricing.mvp.bundle": "MVP Bundle",
    "pricing.mvp.bundle.desc":
      "Rapid development for your minimum viable product",
    "pricing.about": "About",
    "pricing.mvp.timeframe": "Delivered within 1-3 weeks",
    "pricing.learn.more": "Learn More",
    "pricing.error": "Error",
    "pricing.submission.failed": "Failed to submit request",
    "pricing.unexpected.error":
      "An unexpected error occurred. Please try again later.",
    "services.explore": "Explore",
    "services.create": "Create",
    // Cases
    "cases.title": "Cases",
    "cases.subtitle": "A selection of projects we worked on.",
    "cases.status.live": "Live",
    "cases.status.building": "Under construction",
    "cases.view.project": "View project",

    // Guide page translations
    "guide.hero.title": "Welcome to our quickstart guide",
    "guide.hero.subtitle": "Your business has potential. Let's unlock it together, step by step, in just 1 minute.",
    "guide.hero.startButton": "Start Your Journey",
    "guide.step1.title": "Where Are You Right Now?",
    "guide.step1.subtitle": "Let's figure out where you are and where you want to go",
    "guide.step1.description": "Every successful business journey starts with understanding where you are today. Let's identify your current situation.",
    "guide.step2.startup.title": "Perfect! Let's Get Your Idea to Market",
    "guide.step2.startup.subtitle": "Here's exactly what we recommend for startups like yours. We'll get you to market fast and validate your idea.",
    "guide.step2.scale.title": "Great! Let's Scale Your Business",
    "guide.step2.scale.subtitle": "Here's how we can help you scale efficiently. We'll automate your growth and maximize your potential.",
    "guide.step3.title": "Let's Make It Happen",
    "guide.step3.subtitle": "You've identified your path. Now let's take the first step together. We'll make sure it fits your budget and timeline.",
    "guide.path.startup.title": "I'm Starting Something New",
    "guide.path.startup.description": "I have an idea, a vision, or I'm in the early stages of building my business",
    "guide.path.startup.details": "You're ready to validate your idea, build an MVP, or create your first digital presence.",
    "guide.path.startup.badge": "Perfect for startups",
    "guide.path.scale.title": "I'm Ready to Scale",
    "guide.path.scale.description": "I have a business that's working, but I need to grow faster and more efficiently",
    "guide.path.scale.details": "You're ready to automate processes, integrate AI, and scale your operations.",
    "guide.path.scale.badge": "Perfect for growth",
    "guide.solution.mvp.title": "MVP Development (1-3 weeks)",
    "guide.solution.mvp.description": "Get your core idea built and live quickly",
    "guide.solution.mvp.what": "What you get:",
    "guide.solution.mvp.whatValue": "Working product with essential features only",
    "guide.solution.mvp.perfect": "Perfect for:",
    "guide.solution.mvp.perfectValue": "Testing your idea with real users",
    "guide.solution.mvp.investment": "Investment:",
    "guide.solution.mvp.investmentValue": "Sprint-based pricing (pay per 1-3 week cycle)",
    "guide.solution.validation.title": "Idea Validation",
    "guide.solution.validation.description": "Test your assumptions before building anything",
    "guide.solution.validation.what": "What you get:",
    "guide.solution.validation.whatValue": "Market research, user interviews, and validation strategy",
    "guide.solution.validation.perfect": "Perfect for:",
    "guide.solution.validation.perfectValue": "Understanding if your idea has real potential",
    "guide.solution.validation.investment": "Investment:",
    "guide.solution.validation.investmentValue": "Fixed consultation fee",
    "guide.solution.website.title": "Professional Website",
    "guide.solution.website.description": "Create your digital presence with clean, scalable code",
    "guide.solution.website.what": "What you get:",
    "guide.solution.website.whatValue": "Custom website or WordPress solution",
    "guide.solution.website.perfect": "Perfect for:",
    "guide.solution.website.perfectValue": "Establishing credibility and attracting customers",
    "guide.solution.website.investment": "Investment:",
    "guide.solution.website.investmentValue": "Fixed project fee",
    "guide.solution.marketing.title": "Marketing Automation",
    "guide.solution.marketing.description": "Automate your lead generation and nurturing",
    "guide.solution.marketing.what": "What you get:",
    "guide.solution.marketing.whatValue": "Lead funnels, email campaigns, CRM integration",
    "guide.solution.marketing.perfect": "Perfect for:",
    "guide.solution.marketing.perfectValue": "Scaling your sales without scaling your team",
    "guide.solution.marketing.investment": "Investment:",
    "guide.solution.marketing.investmentValue": "Performance-based pricing",
    "guide.solution.ai.title": "AI Integration",
    "guide.solution.ai.description": "Add intelligent automation to your business",
    "guide.solution.ai.what": "What you get:",
    "guide.solution.ai.whatValue": "Chatbots, content automation, predictive analytics",
    "guide.solution.ai.perfect": "Perfect for:",
    "guide.solution.ai.perfectValue": "Reducing manual work and improving efficiency",
    "guide.solution.ai.investment": "Investment:",
    "guide.solution.ai.investmentValue": "Hybrid pricing model",
    "guide.solution.process.title": "Process Optimization",
    "guide.solution.process.description": "Streamline and automate your operations",
    "guide.solution.process.what": "What you get:",
    "guide.solution.process.whatValue": "Workflow automation, system integration, efficiency improvements",
    "guide.solution.process.perfect": "Perfect for:",
    "guide.solution.process.perfectValue": "Scaling without chaos",
    "guide.solution.process.investment": "Investment:",
    "guide.solution.process.investmentValue": "Project-based or ongoing support",
    "guide.solution.other.title": "Other / All",
    "guide.solution.other.description": "I need something different or want to explore all options",
    "guide.solution.other.what": "What you get:",
    "guide.solution.other.whatValue": "Custom consultation and tailored approach",
    "guide.solution.other.perfect": "Perfect for:",
    "guide.solution.other.perfectValue": "Complex projects or when you're not sure what you need",
    "guide.solution.other.investment": "Investment:",
    "guide.solution.other.investmentValue": "We'll discuss the best approach for your situation",
    "guide.action.discovery.title": "Quick Discovery Call",
    "guide.action.discovery.description": "Perfect if you want to discuss your project and get personalized recommendations",
    "guide.action.discovery.bullet1": "• 30-minute focused conversation",
    "guide.action.discovery.bullet2": "• We understand your goals and constraints",
    "guide.action.discovery.bullet3": "• We propose the right approach for you",
    "guide.action.discovery.bullet4": "• No pressure, just helpful guidance",
    "guide.action.discovery.button": "Schedule Your Call",
    "guide.action.submit.title": "Submit Your Request",
    "guide.action.submit.description": "Perfect if you prefer to share details in writing first",
    "guide.action.submit.bullet1": "• Share your project details",
    "guide.action.submit.bullet2": "• We respond within 24 hours",
    "guide.action.submit.bullet3": "• Initial thoughts and next steps",
    "guide.action.submit.bullet4": "• Follow up with a call if needed",
    "guide.action.submit.button": "Submit",
    "guide.why.title": "Why This Approach Works",
    "guide.why.fast.title": "Fast Start",
    "guide.why.fast.description": "We can typically begin within 3-5 business days after our call",
    "guide.why.fit.title": "Right Fit",
    "guide.why.fit.description": "We tailor our approach to your specific situation and budget",
    "guide.why.risk.title": "No Risk",
    "guide.why.risk.description": "No long-term contracts. We succeed when you succeed.",
    "guide.final.title": "Ready to Take the First Step?",
    "guide.final.subtitle": "Your business has potential. Let's unlock it together, one sprint at a time.",
    "guide.final.startOver": "Start Over",
    "guide.final.getStarted": "Contact us direct",
    "guide.modal.title": "Submit Your Request",
    "guide.modal.description": "Review your selections and provide additional details",
    "guide.modal.selections": "Your Selections:",
    "guide.modal.path": "Path:",
    "guide.modal.solution": "Solution:",
    "guide.modal.form.name": "Full Name",
    "guide.modal.form.name.placeholder": "John Doe",
    "guide.modal.form.email": "Email Address",
    "guide.modal.form.email.placeholder": "your.email@example.com",
    "guide.modal.form.message": "Project Description",
    "guide.modal.form.message.placeholder": "Tell us about your project goals, timeline, and any specific requirements...",
    "guide.modal.form.details": "Additional Details (Optional)",
    "guide.modal.form.details.placeholder": "Any additional information, constraints, or questions you have...",
    "guide.modal.form.url": "Website URL (Optional)",
    "guide.modal.form.url.placeholder": "https://your-website.com",
    "guide.modal.form.cancel": "Cancel",
    "guide.modal.form.submit": "Submit Request",
    "guide.modal.form.submitting": "Submitting...",
    "guide.modal.success": "✅ Request submitted successfully! We'll get back to you within 24 hours.",
    "guide.modal.error": "❌ There was an error submitting your request. Please try again.",
    "guide.path.startup.label": "Starting Something New",
    "guide.path.scale.label": "Ready to Scale",
    "guide.solution.mvp.label": "MVP Development (1-3 weeks)",
    "guide.solution.validation.label": "Idea Validation",
    "guide.solution.website.label": "Professional Website",
    "guide.solution.marketing.label": "Marketing Automation",
    "guide.solution.ai.label": "AI Integration",
    "guide.solution.process.label": "Process Optimization",
    "guide.solution.other.label": "Other / All",
    "guide.solution.notSelected": "Not selected",
  },
  nl: {
    "nav.home": "Home",
    "nav.services": "Oplossingen",
    "nav.allservices": "Alle Diensten",
    "nav.pricing": "Tarieven",
    "nav.blog": "Blog",
    "nav.about": "Over ons",
    "nav.contact": "Contact",
    // Blog
    "blog.back": "Terug",
    "blog.readmore": "Lees meer",
    // Solutions page header
    "solutions.title": "Oplossingen",
    "solutions.page.subtitle": "Uitgebreide diensten voor uw digitale behoeften",
    "services.webdev": "Webontwikkeling",
    "services.aiintegration": "AI Integraties",
    "services.consulting": "IT Consultancy",
    "services.validation": "Idee Validatie",
    "services.learnmore": "Meer informatie",
    "services.contact": "Neem contact op",
    "hero.title": "Spring vooruit. Blijf voorop.",
    "hero.subtitle":
      "De wereld wacht niet, en wij ook niet. Van impactvolle digitale ervaringen tot strategische ondersteuning, helpen we projecten snel te bewegen, doelgericht te groeien en voorop te blijven.",
    "hero.cta": "Bekijk onze diensten",
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

    // How We Work section translations
    "howwework.title": "Hoe Wij Werken",
    "howwework.description":
      "Ons proces zorgt voor efficiënte levering en hoogwaardige resultaten voor uw project.",
    "howwework.includes": "Deze fase omvat:",

    "howwework.stage1.title": "Ontdekking en Planning",
    "howwework.stage1.description":
      "We beginnen met het begrijpen van uw behoeften en het plannen van het ontwikkelingsproces.",
    "howwework.stage1.item1": "Voorbereiding voor ontwikkeling",
    "howwework.stage1.item2": "Content levering",
    "howwework.stage1.item3": "Thema/stijl selectie",
    "howwework.stage1.item4": "Projectomvang definitie",

    "howwework.stage2.title": "Ontwikkeling en Testen",
    "howwework.stage2.description":
      "We bouwen uw oplossing en testen deze grondig om kwaliteit te garanderen.",
    "howwework.stage2.item1": "Frontend en backend ontwikkeling",
    "howwework.stage2.item2": "Implementatie van responsief ontwerp",
    "howwework.stage2.item3": "Kwaliteitsborging en testen",

    "howwework.stage3.title": "Implementatie en Oplevering",
    "howwework.stage3.description":
      "We lanceren uw project en zorgen ervoor dat alles perfect werkt.",
    "howwework.stage3.item1": "Server configuratie",
    "howwework.stage3.item2": "Domein setup en SSL installatie",
    "howwework.stage3.item3": "Eindcontrole en overdracht",

    "howwework.stage4.title": "Onderhoud (Optioneel)",
    "howwework.stage4.description":
      "We bieden doorlopende ondersteuning om uw oplossing soepel te laten draaien.",
    "howwework.stage4.item1": "Regelmatige updates en beveiligingspatches",
    "howwework.stage4.item2": "Prestatiemonitoring",
    "howwework.stage4.item3": "Content updates en technische ondersteuning",

    "howwework.learn.more": "Meer Over Ons Proces",

    // MVP service translations
    "services.mvp.title": "MVP Ontwikkeling",
    "services.mvp.desc":
      "Snelle ontwikkeling van uw Minimum Viable Product om uw idee snel en efficiënt te valideren.",
    "services.mvp.sub1": "Van idee naar MVP in 1-3 weken",
    "services.mvp.sub2": "Focus op kernfunctionaliteit",
    "services.mvp.sub3": "Gebruikerstesten en feedback verzamelen",
    "services.mvp.sub4": "Iteratieve ontwikkelingsaanpak",
    "services.mvp.card1.title": "Snelle Lancering",
    "services.mvp.card1.description":
      "Breng uw product in slechts 1-3 weken op de markt, zodat u direct gebruikersfeedback kunt verzamelen.",
    "services.mvp.card2.title": "Iteratieve Aanpak",
    "services.mvp.card2.description":
      "We werken in korte sprints, waardoor snelle aanpassingen mogelijk zijn op basis van uw feedback tijdens het ontwikkelingsproces.",
    "services.mvp.button": "Starten",

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
    "services.webdev.sub3": "Content management systemen",
    "services.webdev.sub4": "Prestatie-optimalisatie en SEO",
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
      "Heeft u een vraag of wilt u een project bespreken? We horen graag van u. Vul het formulier in of plan een gesprek om te chatten.",
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
      "Plan een gesprek (telefoon of Google Meet) met ons om uw projectbehoeften te bespreken.",
    "contact.letschat.button": "Plan een Gesprek ☕",

    // Pricing page translations
    "pricing.title": "Tarieven",
    "pricing.subtitle": "Transparante prijzen voor uw digitale behoeften",
    "pricing.starter.title": "Starter",
    "pricing.starter.tagline": "Eenvoudig & effectief",
    "pricing.starter.price": "vanaf €300 excl. BTW",
    "pricing.starter.discount": "Tijdelijk vanaf €265!",
    "pricing.starter.features": [
      // "WordPress CMS",
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
      // "WordPress CMS",
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
      // "WordPress CMS",
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
      "Voor projecten met unieke vereisten en specifieke behoeften, precies gebouwd volgens uw specificaties.",
    "pricing.additional.title": "Aanvullende Diensten",
    "pricing.additional.ai.title": "AI Integraties",
    "pricing.additional.ai.description":
      "Slimme integraties voor startups en gevestigde bedrijven. Van chatbots tot content tools en backend automatisering, breng AI in uw product, website of workflow.",
    "pricing.additional.validation.title": "Idee Validatie",
    "pricing.additional.validation.description":
      "Testen en validatie voor nieuwe producten en startup ideeën. We handelen als echte gebruikers, testen als ontwikkelaars en denken als critici, en bieden u feedback, bugrapporten en UX-suggesties vóór de lancering.",
    "pricing.cta": "Neem contact op",
    "pricing.predefined.packages": "Vaste Bundels",
    "pricing.custom.calculator": "Zelf kiezen",
    "pricing.select.client.type": "Ik ben een",
    "pricing.select.tier": "Selecteer Niveau",
    "pricing.need.custom":
      "Heeft u een meer aangepaste oplossing nodig? Probeer onze calculator om uw eigen pakket samen te stellen.",
    "pricing.build.custom": "Bundel zelf samenstellen",
    "pricing.step.type": "Type",
    "pricing.step.tier": "Niveau",
    "pricing.step.technology": "Tools",
    "pricing.step.extras": "Extra",
    "pricing.select.technology": "Selecteer Tools",
    "pricing.tech.consultation":
      "Voor het Custom-made niveau worden de tools bepaald tijdens het overleg",
    "pricing.continue": "Doorgaan",
    "pricing.select.packages": "Selecteer Aanvullende Pakketten",
    "pricing.packages.consultation":
      "Voor het Custom-made niveau worden aanvullende pakketten bepaald tijdens het overleg",
    "pricing.back": "Terug",
    "pricing.request.consultation": "Consultatie Aanvragen",
    "pricing.summary": "Samenvatting",
    "pricing.review.details":
      "Bekijk uw aanvraaggegevens en vul uw contactgegevens in om te verzenden.",
    "pricing.package": "Pakket:",
    "pricing.client.type": "Klanttype:",
    "pricing.company": "Bedrijf",
    "pricing.company.desc":
      "Standaard prijzen voor bedrijven van alle groottes.",
    "pricing.student": "Student",
    "pricing.student.desc":
      "25% korting voor studenten met een geldige studentenkaart.",
    "pricing.nonprofit": "Non-profit",
    "pricing.nonprofit.desc":
      "50% korting voor geregistreerde non-profit organisaties.",
    "pricing.discount": "Korting:",
    "pricing.total": "Totaal:",
    "pricing.tier": "Niveau:",
    "pricing.technology": "Tools:",
    "pricing.packages": "Pakketten:",
    "pricing.form.firstname": "Voornaam",
    "pricing.form.lastname": "Achternaam",
    "pricing.form.email": "E-mail",
    "pricing.form.phone": "Telefoon (optioneel)",
    "pricing.form.message": "Aanvullende Informatie (optioneel)",
    "pricing.form.message.placeholder":
      "Vertel ons meer over uw project of specifieke vereisten...",
    "pricing.form.submit": "Aanvraag Indienen",
    "pricing.view.details": "Bekijk details",
    "pricing.tier.name": "Niveau: ",
    "pricing.technology.name": "Tools:",
    "pricing.included.packages": "Inbegrepen pakketten:",
    "pricing.compatible.with": "Compatibel met:",
    "pricing.most.popular": "Meest Populair",
    "pricing.popular": "Populair",
    "pricing.simple.bundle": "Eenvoudig Bundel",
    "pricing.plus.bundle": "Plus Bundel",
    "pricing.premium.bundle": "Premium Bundel",
    "pricing.simple.bundle.desc": "Eenvoudige website met basisfunctionaliteit",
    "pricing.plus.bundle.desc": "Complete WordPress-oplossing voor bedrijven",
    "pricing.premium.bundle.desc":
      "Geavanceerde oplossing met aangepaste frontend",
    "pricing.month": "/maand",
    "pricing.fill.required": "Vul alle verplichte velden in",
    "pricing.request.submitted":
      "Aanvraag ingediend! Controleer de console voor details.",
    "pricing.tech.idontknow": "Ik weet het niet",
    "pricing.tech.frontend": "Frontend Volledig",
    "pricing.tech.wpheadless": "WP CMS (headless) + flexibele frontend",
    "pricing.tech.wpfull": "WP CMS Volledig",
    "pricing.package.integrations": "Integraties (WP Plugins)",
    "pricing.package.contactforms": "Contactformulieren",
    "pricing.package.setup": "Setup",
    "pricing.package.setup.desc": "Domein, hosting & e-mail (eenmalige kosten)",
    "pricing.package.maintenance": "Onderhoud",
    "pricing.package.maintenance.desc":
      "Domein, hosting, e-mail en updates (€9.99/maand)",
    "pricing.in.consultation": "In overleg",
    "pricing.mvp.bundle": "MVP Bundel",
    "pricing.mvp.bundle.desc":
      "Snelle ontwikkeling voor uw minimaal levensvatbaar product",
    "pricing.about": "Over",
    "pricing.mvp.timeframe": "Geleverd binnen 1-3 weken",
    "pricing.learn.more": "Meer Informatie",
    "pricing.error": "Fout",
    "pricing.submission.failed": "Aanvraag indienen mislukt",
    "pricing.unexpected.error":
      "Er is een onverwachte fout opgetreden. Probeer het later opnieuw.",
    "services.explore": "Ontdek",
    "services.create": "Creëer",
    // Cases
    "cases.title": "Cases",
    "cases.subtitle": "Een selectie van projecten waar we aan hebben gewerkt.",
    "cases.status.live": "Live",
    "cases.status.building": "Wordt gebouwd",
    "cases.view.project": "Bekijk project",

    // For tier details
    "pricing.tier.starter.details": "Starter niveau met essentiële functies",
    "pricing.tier.professional.details":
      "Professioneel niveau met uitgebreide functies",
    "pricing.tier.custom.details":
      "Volledig op maat gemaakt voor uw specifieke behoeften",

    // For technology details
    "pricing.tech.frontend.details":
      "Moderne frontend ontwikkeling met React, Next.js of Vue",
    "pricing.tech.wpheadless.details":
      "WordPress als headless CMS met een flexibele frontend",
    "pricing.tech.wpfull.details":
      "Volledige WordPress oplossing met aangepaste thema's",
    "pricing.tech.idontknow.details":
      "Wij adviseren de beste technologie voor uw project",

    // For package details
    "pricing.package.integrations.details":
      "Integratie van plugins en externe diensten",
    "pricing.package.contactforms.details":
      "Geavanceerde contactformulieren met aangepaste functionaliteit",
    "pricing.package.setup.details":
      "Volledige setup van domein, hosting en e-mail",
    "pricing.package.maintenance.details":
      "Doorlopend onderhoud en updates voor uw website",

    // For bundle details
    "pricing.bundle.simple.features":
      "Eenvoudige website met essentiële functies",
    "pricing.bundle.plus.features":
      "Professionele website met uitgebreide functionaliteit",
    "pricing.bundle.premium.features":
      "Volledig op maat gemaakte oplossing voor complexe behoeften",
    "pricing.bundle.mvp.features":
      "Snelle ontwikkeling van uw minimaal levensvatbaar product",

    // For included items
    "pricing.included": "Inbegrepen",
    "pricing.not.included": "Niet inbegrepen",

    // For consultation text
    "pricing.consultation.needed": "Consultatie nodig",
    "pricing.consultation.text":
      "Voor het op maat gemaakte niveau worden details bepaald tijdens het overleg",

    // For pricing calculator steps
    "pricing.step.type.description": "Selecteer uw klanttype",
    "pricing.step.tier.description": "Kies uw gewenste niveau",
    "pricing.step.technology.description": "Selecteer de technologie",
    "pricing.step.extras.description": "Voeg extra diensten toe",

    // For form fields
    "pricing.form.company": "Bedrijfsnaam (optioneel)",
    "pricing.form.company.placeholder": "Uw bedrijfsnaam",
    "pricing.form.requirements": "Specifieke vereisten",
    "pricing.form.requirements.placeholder":
      "Vertel ons over specifieke functionaliteiten of vereisten...",

    // Add specific translations for tier inclusions
    "pricing.tier.starter.inclusion.0": "Uniek ontwerp",
    "pricing.tier.starter.inclusion.1": "Mobiel-vriendelijk",
    "pricing.tier.starter.inclusion.2": "1 ontwerpiteratie",
    "pricing.tier.starter.inclusion.3": "Tot 5 pagina's",
    "pricing.tier.starter.inclusion.4": "SEO Setup",

    "pricing.tier.professional.inclusion.0": "Alles in starter +",
    "pricing.tier.professional.inclusion.1": "Voorgedefinieerde thema's",
    "pricing.tier.professional.inclusion.2": "5 ontwerpiteraties",
    "pricing.tier.professional.inclusion.3": "Onbeperkt aantal pagina's",
    "pricing.tier.professional.inclusion.4": "Geavanceerde SEO-optimalisatie",
    "pricing.tier.professional.inclusion.5": "Prestatie geoptimaliseerd",
    "pricing.tier.professional.inclusion.6": "Inclusief teksten & afbeeldingen",

    "pricing.tier.customMade.inclusion.0": "Alles in professional +",
    "pricing.tier.customMade.inclusion.1": "Onbeperkte ontwerpiteraties",
    "pricing.tier.customMade.inclusion.2": "Geavanceerde database-integraties",
    "pricing.tier.customMade.inclusion.3": "Aangepaste API-ontwikkeling",
    "pricing.tier.customMade.inclusion.4": "Integraties met externe diensten",
    "pricing.tier.customMade.inclusion.5": "AI-integraties",
    "pricing.tier.customMade.inclusion.6": "Gebruikersauthenticatiesysteem",

    // Guide page translations
    "guide.hero.title": "Welkom bij onze snelle startgids",
    "guide.hero.subtitle": "Uw bedrijf heeft potentieel. Laten we het samen ontgrendelen, stap voor stap, in slechts 1 minuut.",
    "guide.hero.startButton": "Start Uw Reis",
    "guide.step1.title": "Waar Bent U Nu?",
    "guide.step1.subtitle": "Laten we uitzoeken waar u bent en waar u naartoe wilt",
    "guide.step1.description": "Elke succesvolle bedrijfsreis begint met het begrijpen van waar u vandaag staat. Laten we uw huidige situatie identificeren.",
    "guide.step2.startup.title": "Perfect! Laten We Uw Idee Op De Markt Brengen",
    "guide.step2.startup.subtitle": "Hier is precies wat we aanbevelen voor startups zoals de uwe. We brengen u snel op de markt en valideren uw idee.",
    "guide.step2.scale.title": "Geweldig! Laten We Uw Bedrijf Schalen",
    "guide.step2.scale.subtitle": "Hier is hoe we u kunnen helpen efficiënt te schalen. We automatiseren uw groei en maximaliseren uw potentieel.",
    "guide.step3.title": "Laten We Het Waarmaken",
    "guide.step3.subtitle": "U heeft uw pad geïdentificeerd. Laten we nu samen de eerste stap zetten. We zorgen ervoor dat het past bij uw budget en tijdlijn.",
    "guide.path.startup.title": "Ik Begin Iets Nieuws",
    "guide.path.startup.description": "Ik heb een idee, een visie, of ik ben in de vroege stadia van het opbouwen van mijn bedrijf",
    "guide.path.startup.details": "U bent klaar om uw idee te valideren, een MVP te bouwen, of uw eerste digitale aanwezigheid te creëren.",
    "guide.path.startup.badge": "Perfect voor startups",
    "guide.path.scale.title": "Ik Ben Klaar Om Te Schalen",
    "guide.path.scale.description": "Ik heb een bedrijf dat werkt, maar ik moet sneller en efficiënter groeien",
    "guide.path.scale.details": "U bent klaar om processen te automatiseren, AI te integreren en uw operaties te schalen.",
    "guide.path.scale.badge": "Perfect voor groei",
    "guide.solution.mvp.title": "MVP Ontwikkeling (1-3 weken)",
    "guide.solution.mvp.description": "Krijg uw kernidee snel gebouwd en live",
    "guide.solution.mvp.what": "Wat u krijgt:",
    "guide.solution.mvp.whatValue": "Werkend product met alleen essentiële functies",
    "guide.solution.mvp.perfect": "Perfect voor:",
    "guide.solution.mvp.perfectValue": "Uw idee testen met echte gebruikers",
    "guide.solution.mvp.investment": "Investering:",
    "guide.solution.mvp.investmentValue": "Sprint-gebaseerde prijzen (betalen per 1-3 weken cyclus)",
    "guide.solution.validation.title": "Idee Validatie",
    "guide.solution.validation.description": "Test uw aannames voordat u iets bouwt",
    "guide.solution.validation.what": "Wat u krijgt:",
    "guide.solution.validation.whatValue": "Marktonderzoek, gebruikersinterviews en validatiestrategie",
    "guide.solution.validation.perfect": "Perfect voor:",
    "guide.solution.validation.perfectValue": "Begrijpen of uw idee echt potentieel heeft",
    "guide.solution.validation.investment": "Investering:",
    "guide.solution.validation.investmentValue": "Vaste consultatiekosten",
    "guide.solution.website.title": "Professionele Website",
    "guide.solution.website.description": "Creëer uw digitale aanwezigheid met schone, schaalbare code",
    "guide.solution.website.what": "Wat u krijgt:",
    "guide.solution.website.whatValue": "Aangepaste website of WordPress-oplossing",
    "guide.solution.website.perfect": "Perfect voor:",
    "guide.solution.website.perfectValue": "Geloofwaardigheid opbouwen en klanten aantrekken",
    "guide.solution.website.investment": "Investering:",
    "guide.solution.website.investmentValue": "Vaste projectkosten",
    "guide.solution.marketing.title": "Marketing Automatisering",
    "guide.solution.marketing.description": "Automatiseer uw leadgeneratie en -verzorging",
    "guide.solution.marketing.what": "Wat u krijgt:",
    "guide.solution.marketing.whatValue": "Lead funnels, e-mailcampagnes, CRM-integratie",
    "guide.solution.marketing.perfect": "Perfect voor:",
    "guide.solution.marketing.perfectValue": "Uw verkoop schalen zonder uw team te schalen",
    "guide.solution.marketing.investment": "Investering:",
    "guide.solution.marketing.investmentValue": "Prestatie-gebaseerde prijzen",
    "guide.solution.ai.title": "AI Integratie",
    "guide.solution.ai.description": "Voeg intelligente automatisering toe aan uw bedrijf",
    "guide.solution.ai.what": "Wat u krijgt:",
    "guide.solution.ai.whatValue": "Chatbots, contentautomatisering, voorspellende analyses",
    "guide.solution.ai.perfect": "Perfect voor:",
    "guide.solution.ai.perfectValue": "Handmatig werk verminderen en efficiëntie verbeteren",
    "guide.solution.ai.investment": "Investering:",
    "guide.solution.ai.investmentValue": "Hybride prijsmodel",
    "guide.solution.process.title": "Proces Optimalisatie",
    "guide.solution.process.description": "Stroomlijn en automatiseer uw operaties",
    "guide.solution.process.what": "Wat u krijgt:",
    "guide.solution.process.whatValue": "Workflow-automatisering, systeemintegratie, efficiëntieverbeteringen",
    "guide.solution.process.perfect": "Perfect voor:",
    "guide.solution.process.perfectValue": "Schalen zonder chaos",
    "guide.solution.process.investment": "Investering:",
    "guide.solution.process.investmentValue": "Project-gebaseerd of doorlopende ondersteuning",
    "guide.solution.other.title": "Anders / Alles",
    "guide.solution.other.description": "Ik heb iets anders nodig of wil alle opties verkennen",
    "guide.solution.other.what": "Wat u krijgt:",
    "guide.solution.other.whatValue": "Aangepaste consultatie en op maat gemaakte aanpak",
    "guide.solution.other.perfect": "Perfect voor:",
    "guide.solution.other.perfectValue": "Complexe projecten of wanneer u niet zeker weet wat u nodig heeft",
    "guide.solution.other.investment": "Investering:",
    "guide.solution.other.investmentValue": "We bespreken de beste aanpak voor uw situatie",
    "guide.action.discovery.title": "Snelle Ontdekkingsgesprek",
    "guide.action.discovery.description": "Perfect als u uw project wilt bespreken en gepersonaliseerde aanbevelingen wilt krijgen",
    "guide.action.discovery.bullet1": "• 30-minuten gefocust gesprek",
    "guide.action.discovery.bullet2": "• We begrijpen uw doelen en beperkingen",
    "guide.action.discovery.bullet3": "• We stellen de juiste aanpak voor u voor",
    "guide.action.discovery.bullet4": "• Geen druk, alleen behulpzame begeleiding",
    "guide.action.discovery.button": "Plan Uw Gesprek",
    "guide.action.submit.title": "Dien Uw Verzoek In",
    "guide.action.submit.description": "Perfect als u de details eerst schriftelijk wilt delen",
    "guide.action.submit.bullet1": "• Deel uw projectdetails",
    "guide.action.submit.bullet2": "• We reageren binnen 24 uur",
    "guide.action.submit.bullet3": "• Eerste gedachten en volgende stappen",
    "guide.action.submit.bullet4": "• Follow-up met een gesprek indien nodig",
    "guide.action.submit.button": "Indienen",
    "guide.why.title": "Waarom Deze Aanpak Werkt",
    "guide.why.fast.title": "Snelle Start",
    "guide.why.fast.description": "We kunnen meestal beginnen binnen 3-5 werkdagen na ons gesprek",
    "guide.why.fit.title": "Juiste Pasvorm",
    "guide.why.fit.description": "We passen onze aanpak aan aan uw specifieke situatie en budget",
    "guide.why.risk.title": "Geen Risico",
    "guide.why.risk.description": "Geen langetermijncontracten. We slagen wanneer u slaagt.",
    "guide.final.title": "Klaar Om De Eerste Stap Te Zetten?",
    "guide.final.subtitle": "Uw bedrijf heeft potentieel. Laten we het samen ontgrendelen, één sprint tegelijk.",
    "guide.final.startOver": "Opnieuw Beginnen",
    "guide.final.getStarted": "Neem contact op",
    "guide.modal.title": "Dien Uw Verzoek In",
    "guide.modal.description": "Bekijk uw selecties en geef aanvullende details",
    "guide.modal.selections": "Uw Selecties:",
    "guide.modal.path": "Pad:",
    "guide.modal.solution": "Oplossing:",
    "guide.modal.form.name": "Volledige Naam",
    "guide.modal.form.name.placeholder": "Jan Jansen",
    "guide.modal.form.email": "E-mailadres",
    "guide.modal.form.email.placeholder": "uw.email@voorbeeld.nl",
    "guide.modal.form.message": "Projectbeschrijving",
    "guide.modal.form.message.placeholder": "Vertel ons over uw projectdoelen, tijdlijn en specifieke vereisten...",
    "guide.modal.form.details": "Aanvullende Details (Optioneel)",
    "guide.modal.form.details.placeholder": "Eventuele aanvullende informatie, beperkingen of vragen die u heeft...",
    "guide.modal.form.url": "Website URL (Optioneel)",
    "guide.modal.form.url.placeholder": "https://uw-website.nl",
    "guide.modal.form.cancel": "Annuleren",
    "guide.modal.form.submit": "Verzoek Indienen",
    "guide.modal.form.submitting": "Indienen...",
    "guide.modal.success": "✅ Verzoek succesvol ingediend! We nemen binnen 24 uur contact met u op.",
    "guide.modal.error": "❌ Er was een fout bij het indienen van uw verzoek. Probeer het opnieuw.",
    "guide.path.startup.label": "Iets Nieuws Beginnen",
    "guide.path.scale.label": "Klaar Om Te Schalen",
    "guide.solution.mvp.label": "MVP Ontwikkeling (1-3 weken)",
    "guide.solution.validation.label": "Idee Validatie",
    "guide.solution.website.label": "Professionele Website",
    "guide.solution.marketing.label": "Marketing Automatisering",
    "guide.solution.ai.label": "AI Integratie",
    "guide.solution.process.label": "Proces Optimalisatie",
    "guide.solution.other.label": "Anders / Alles",
    "guide.solution.notSelected": "Niet geselecteerd",
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
    // Check if the key exists in the current language
    if (translations[language] && key in translations[language]) {
      return translations[language][key as keyof typeof translations.en];
    }

    // If not found in current language, try English as fallback
    if (language !== "en" && translations.en && key in translations.en) {
      console.warn(
        `Missing translation for key "${key}" in language "${language}", using English fallback`
      );
      return translations.en[key as keyof typeof translations.en];
    }

    // If still not found, return the key itself and log a warning
    console.warn(`Translation key not found: "${key}"`);
    return key;
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

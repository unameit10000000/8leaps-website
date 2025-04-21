"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  Check,
  Users,
  GraduationCap,
  Heart,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HelpCircle,
  Crown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel } from "@/components/ui/carousel"
import { useMediaQuery } from "@/hooks/use-media-query"
import { CustomAccordion } from "@/components/custom-accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define types for our pricing structure
type ClientType = "company" | "student" | "nonprofit"
type TierType = "starter" | "professional" | "customMade"
type DevType = "iDontKnow" | "frontendFull" | "wpCmsHeadless" | "wpCmsFull" | "inConsultation"
type PackageType = "integrations" | "contactForms" | "setup" | "maintenance"
// Update the PredefinedPackageType to include the new MVP bundle
type PredefinedPackageType = "basic" | "business" | "enterprise" | "mvp"

// Update the type definition to include additionalDevTypes
type PredefinedPackageData = {
  name: string
  description: string
  tier: TierType
  devType: DevType
  additionalDevTypes?: DevType[]
  packages: PackageType[]
}

// Updated data model
const DATA = {
  // Tiers with prices and inclusions
  tiers: {
    starter: {
      name: "Starter",
      price: 249,
      inclusions: ["Unique design", "Mobile-friendly", "1 design iteration", "Up to 5 pages", "SEO Setup"],
    },
    professional: {
      name: "Professional",
      price: 499,
      inclusions: [
        "Everything in starter +",
        "Pre-defined themes",
        "5 design iterations",
        "Unlimited pages",
        "Advanced SEO optimization",
        "Performance optimized",
        "Including texts & images",
      ],
    },
    customMade: {
      name: "Custom-made",
      price: null,
      isConsultation: true,
      inclusions: [
        "Everything in professional +",
        "Unlimited design iterations",
        "Advanced database integrations",
        "Custom API development",
        "Third-party service integrations",
        "AI integrations",
        "User authentication system",
      ],
    },
  },

  // Technology types with prices and tier compatibility
  devTypes: {
    iDontKnow: {
      name: "I don't know",
      price: null,
      isConsultation: true,
      compatibleTiers: ["starter", "professional", "customMade"],
    },
    frontendFull: {
      name: "Frontend Full",
      price: 249,
      compatibleTiers: ["starter", "professional", "customMade"],
    },
    wpCmsHeadless: {
      name: "WP CMS (headless) + flexible frontend",
      price: 499,
      compatibleTiers: ["starter", "professional"],
    },
    wpCmsFull: {
      name: "WP CMS Full",
      price: 749,
      compatibleTiers: ["starter", "professional"],
    },
    inConsultation: {
      name: "In consultation",
      price: null,
      isConsultation: true,
      compatibleTiers: ["customMade"],
    },
  },

  // Packages with prices and compatibility
  packages: {
    integrations: {
      name: "Integrations (WP Plugins)",
      price: 99,
      compatibleDevTypes: ["wpCmsHeadless", "wpCmsFull"],
    },
    contactForms: {
      name: "Contact Forms",
      price: 49,
      compatibleDevTypes: ["wpCmsHeadless", "wpCmsFull", "frontendFull", "inConsultation"],
    },
    setup: {
      name: "Setup",
      price: 99,
      compatibleDevTypes: ["wpCmsHeadless", "wpCmsFull", "frontendFull"],
      description: "Domain, hosting & email (one-time fee)",
    },
    maintenance: {
      name: "Maintenance",
      price: 9.99,
      isMonthly: true,
      compatibleDevTypes: ["wpCmsHeadless", "wpCmsFull", "frontendFull"],
      description: "Domain, hosting, email and updates (€9.99/month)",
    },
  },

  // Predefined packages - Updated names and Premium Bundle packages
  predefinedPackages: {
    basic: {
      name: "Simple Bundle",
      description: "Simple website with basic functionality",
      tier: "starter",
      devType: "frontendFull",
      packages: ["contactForms", "setup", "maintenance"] as PackageType[],
    },
    business: {
      name: "Plus Bundle",
      description: "Complete WordPress solution for businesses",
      tier: "professional",
      devType: "wpCmsFull",
      additionalDevTypes: ["wpCmsHeadless"] as DevType[],
      packages: ["contactForms", "integrations", "setup", "maintenance"] as PackageType[],
    },
    enterprise: {
      name: "Premium Bundle",
      description: "Advanced solution with custom frontend",
      tier: "customMade",
      devType: "inConsultation",
      packages: [] as PackageType[],
    },
    mvp: {
      name: "MVP Bundle",
      description: "Rapid development for your minimum viable product",
      price: 499,
      isSpecial: true,
      redirectTo: "/mvp",
    },
  },

  // Updated discounts
  discounts: {
    student: 0.25, // 25% discount (changed from 0.5)
    nonprofit: 0.5, // 50% discount (changed from 0.75)
  },
}

// Client type information
const CLIENT_TYPE_INFO = {
  company: {
    title: "Company",
    description: "Standard pricing for businesses of all sizes.",
    icon: <Users className="h-4 w-4 text-green-500" />,
  },
  student: {
    title: "Student",
    description: "25% discount for students with valid ID.", // Changed from 50%
    icon: <GraduationCap className="h-4 w-4 text-green-500" />,
    discount: "25%", // Changed from 50%
  },
  nonprofit: {
    title: "Non-profit",
    description: "50% discount for registered non-profit organizations.", // Changed from 75%
    icon: <Heart className="h-4 w-4 text-green-500" />,
    discount: "50%", // Changed from 75%
  },
}

export default function PricingPage() {
  const { t, language } = useLanguage()

  useEffect(() => {
    console.log("Current language:", language)
    console.log("Translation test:", t("pricing.predefined.packages"))
  }, [language])

  const [activeTab, setActiveTab] = useState("predefined-packages")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showOrderDialog, setShowOrderDialog] = useState(false)

  // Track open accordions - separate states for mobile and desktop
  const [mobilePredefinedAccordionOpen, setMobilePredefinedAccordionOpen] = useState(false)
  const [mobileTierAccordionOpen, setMobileTierAccordionOpen] = useState(false)
  const [mobileDevTypeAccordionOpen, setMobileDevTypeAccordionOpen] = useState(false)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({})

  // Track current slide for each carousel
  const [clientTypeSlide, setClientTypeSlide] = useState(0)
  const [predefinedPackageSlide, setPredefinedPackageSlide] = useState(0)
  const [tierSlide, setTierSlide] = useState(0)
  const [devTypeSlide, setDevTypeSlide] = useState(0)

  // Predefined packages state
  const [selectedPredefinedPackage, setSelectedPredefinedPackage] = useState<PredefinedPackageType | null>(null)
  const [predefinedPackageClientType, setPredefinedPackageClientType] = useState<ClientType>("company")
  const [predefinedPackagePrice, setPredefinedPackagePrice] = useState<number | null>(null)
  const [predefinedPackageMonthly, setPredefinedPackageMonthly] = useState<number | null>(null)

  // Auto-select the first predefined package when the component mounts
  useEffect(() => {
    if (!selectedPredefinedPackage && Object.keys(DATA.predefinedPackages).length > 0) {
      // Get visible packages based on client type
      const visiblePackages = Object.entries(DATA.predefinedPackages)
        .filter(([key]) => {
          // Filter out MVP for non-company clients
          return !(key === "mvp" && predefinedPackageClientType !== "company")
        })
        .sort(([key1], [key2]) => {
          // Put MVP last
          if (key1 === "mvp") return 1
          if (key2 === "mvp") return -1
          return 0
        })

      if (visiblePackages.length > 0) {
        setSelectedPredefinedPackage(visiblePackages[0][0] as PredefinedPackageType)
      }
    }
  }, [selectedPredefinedPackage, predefinedPackageClientType])

  // Calculator state
  const [step, setStep] = useState(1)
  const [clientType, setClientType] = useState<ClientType>("company")
  const [selectedTier, setSelectedTier] = useState<TierType | null>(null)
  const [selectedDevType, setSelectedDevType] = useState<DevType | null>(null)
  const [selectedPackages, setSelectedPackages] = useState<PackageType[]>([])
  const [totalPrice, setTotalPrice] = useState<number | null>(null)
  const [monthlyPrice, setMonthlyPrice] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [needsConsultation, setNeedsConsultation] = useState(false)

  // Initialize state for carousel slides
  const [clientTypeSlideCalculator, setClientTypeSlideCalculator] = useState(0)

  // Add a loading state variable at the top of the component:
  // Add this near the other state variables
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle accordion toggle based on device type
  const handlePredefinedAccordionToggle = (id: string, isOpen: boolean) => {
    if (isMobile) {
      // On mobile, toggle all accordions together
      setMobilePredefinedAccordionOpen(isOpen)
    } else {
      // On desktop, toggle only the specific accordion
      setOpenAccordions((prev) => ({
        ...prev,
        [id]: isOpen,
      }))
    }
  }

  const handleTierAccordionToggle = (id: string, isOpen: boolean) => {
    if (isMobile) {
      // On mobile, toggle all accordions together
      setMobileTierAccordionOpen(isOpen)
    } else {
      // On desktop, toggle only the specific accordion
      setOpenAccordions((prev) => ({
        ...prev,
        [id]: isOpen,
      }))
    }
  }

  const handleDevTypeAccordionToggle = (id: string, isOpen: boolean) => {
    if (isMobile) {
      // On mobile, toggle all accordions together
      setMobileDevTypeAccordionOpen(isOpen)
    } else {
      // On desktop, toggle only the specific accordion
      setOpenAccordions((prev) => ({
        ...prev,
        [id]: isOpen,
      }))
    }
  }

  // Calculate predefined package price with discount
  useEffect(() => {
    if (selectedPredefinedPackage) {
      const packageData = DATA.predefinedPackages[selectedPredefinedPackage]

      // Special handling for MVP package which has a different structure
      if (selectedPredefinedPackage === "mvp") {
        const mvpPkg = packageData as any
        let price = mvpPkg.price

        // Apply discount if applicable
        if (predefinedPackageClientType === "student") {
          price = price * (1 - DATA.discounts.student)
        } else if (predefinedPackageClientType === "nonprofit") {
          price = price * (1 - DATA.discounts.nonprofit)
        }

        setPredefinedPackagePrice(Math.round(price))
        setPredefinedPackageMonthly(null)
        return
      }

      // Regular package handling
      const tierData = DATA.tiers[packageData.tier]
      const devTypeData = DATA.devTypes[packageData.devType]

      // Check if consultation is needed
      if (tierData.isConsultation || devTypeData.isConsultation) {
        setPredefinedPackagePrice(null)
        setPredefinedPackageMonthly(null)
        return
      }

      let oneTimePrice = 0
      let monthlyPrice = 0

      // Add tier price if available
      if (tierData.price !== null) {
        oneTimePrice += tierData.price
      }

      // Add development type price if available
      if (devTypeData.price !== null) {
        oneTimePrice += devTypeData.price
      }

      // Add package prices
      packageData.packages.forEach((pkg) => {
        const packageInfo = DATA.packages[pkg]
        if (packageInfo.isMonthly) {
          monthlyPrice += packageInfo.price
        } else {
          oneTimePrice += packageInfo.price
        }
      })

      // Apply discount if applicable
      if (predefinedPackageClientType === "student") {
        oneTimePrice = oneTimePrice * (1 - DATA.discounts.student)
        monthlyPrice = monthlyPrice * (1 - DATA.discounts.student)
      } else if (predefinedPackageClientType === "nonprofit") {
        oneTimePrice = oneTimePrice * (1 - DATA.discounts.nonprofit)
        monthlyPrice = monthlyPrice * (1 - DATA.discounts.nonprofit)
      }

      setPredefinedPackagePrice(Math.round(oneTimePrice))
      setPredefinedPackageMonthly(monthlyPrice > 0 ? Math.round(monthlyPrice) : null)
    } else {
      setPredefinedPackagePrice(null)
      setPredefinedPackageMonthly(null)
    }
  }, [selectedPredefinedPackage, predefinedPackageClientType, DATA.discounts.nonprofit, DATA.discounts.student])

  // Calculate calculator total price whenever selections change
  useEffect(() => {
    if (!selectedTier) {
      setTotalPrice(null)
      setMonthlyPrice(null)
      setNeedsConsultation(false)
      return
    }

    // If custom-made tier is selected, automatically set to consultation needed
    if (selectedTier === "customMade") {
      setTotalPrice(null)
      setMonthlyPrice(null)
      setNeedsConsultation(true)
      return
    }

    const tierData = DATA.tiers[selectedTier]
    const devTypeData = selectedDevType ? DATA.devTypes[selectedDevType] : null

    // Check if consultation is needed
    if ((tierData && tierData.isConsultation) || (devTypeData && devTypeData.isConsultation)) {
      setTotalPrice(null)
      setMonthlyPrice(null)
      setNeedsConsultation(true)
      return
    }

    // If no dev type is selected yet, don't calculate price
    if (!selectedDevType) {
      setTotalPrice(null)
      setMonthlyPrice(null)
      setNeedsConsultation(false)
      return
    }

    let oneTimePrice = 0
    let monthlyPrice = 0

    // Add tier price if available
    if (tierData.price !== null) {
      oneTimePrice += tierData.price
    }

    // Add development type price if available
    if (devTypeData.price !== null) {
      oneTimePrice += devTypeData.price
    }

    // Add packages prices
    selectedPackages.forEach((pkg) => {
      const packageInfo = DATA.packages[pkg]
      if (packageInfo.isMonthly) {
        monthlyPrice += packageInfo.price
      } else {
        oneTimePrice += packageInfo.price
      }
    })

    // Apply discount if applicable
    if (clientType === "student") {
      oneTimePrice = oneTimePrice * (1 - DATA.discounts.student)
      monthlyPrice = monthlyPrice * (1 - DATA.discounts.student)
    } else if (clientType === "nonprofit") {
      oneTimePrice = oneTimePrice * (1 - DATA.discounts.nonprofit)
      monthlyPrice = monthlyPrice * (1 - DATA.discounts.nonprofit)
    }

    setTotalPrice(Math.round(oneTimePrice))
    setMonthlyPrice(monthlyPrice > 0 ? Math.round(monthlyPrice) : null)
    setNeedsConsultation(false)
  }, [clientType, selectedTier, selectedDevType, selectedPackages, DATA.discounts.student, DATA.discounts.nonprofit])

  // Add these useEffect hooks after the existing useEffect hooks to set initial selections

  // Add this effect to select the first tier when step 2 is reached
  useEffect(() => {
    if (step === 2 && !selectedTier && Object.keys(DATA.tiers).length > 0) {
      // Select the first tier by default
      setSelectedTier(Object.keys(DATA.tiers)[0] as TierType)
    }
  }, [step, selectedTier])

  // Add this effect to select the first compatible dev type when step 3 is reached
  useEffect(() => {
    if (step === 3 && selectedTier && !selectedDevType) {
      // Find the first compatible dev type
      const compatibleDevType = Object.entries(DATA.devTypes).find(([key, devType]) =>
        devType.compatibleTiers.includes(selectedTier),
      )

      if (compatibleDevType) {
        setSelectedDevType(compatibleDevType[0] as DevType)
      }
    }
  }, [step, selectedTier, selectedDevType])

  // Add this effect to ensure the calculator client type is selected initially
  useEffect(() => {
    if (!clientType && Object.keys(CLIENT_TYPE_INFO).length > 0) {
      // Set the default client type to the first one (usually "company")
      setClientType(Object.keys(CLIENT_TYPE_INFO)[0] as ClientType)
    }
  }, [clientType])

  // Handle predefined package order
  const handlePredefinedPackageRequest = () => {
    if (!selectedPredefinedPackage) {
      alert("Please select a package first")
      return
    }

    console.log("Request submitted:", {
      package: DATA.predefinedPackages[selectedPredefinedPackage].name,
      clientType: predefinedPackageClientType,
      price: predefinedPackagePrice !== null ? `€${predefinedPackagePrice}` : "Consultation needed",
      monthlyPrice: predefinedPackageMonthly !== null ? `€${predefinedPackageMonthly}/month` : null,
    })

    setShowOrderDialog(true)
  }

  // Check if a development type is compatible with the selected tier
  const isDevTypeCompatible = (devType: DevType) => {
    if (!selectedTier) return false
    return DATA.devTypes[devType].compatibleTiers.includes(selectedTier)
  }

  // Check if a package is compatible with the selected development type
  const isPackageCompatible = (pkg: PackageType) => {
    if (!selectedDevType) return false
    return DATA.packages[pkg].compatibleDevTypes.includes(selectedDevType)
  }

  // Toggle package selection
  const togglePackage = (pkg: PackageType) => {
    if (selectedPackages.includes(pkg)) {
      setSelectedPackages(selectedPackages.filter((p) => p !== pkg))
    } else {
      setSelectedPackages([...selectedPackages, pkg])
    }
  }

  // Handle continue button click
  const handleContinue = () => {
    const newErrors: string[] = []

    if (step === 1 && !clientType) {
      newErrors.push("Please select a client type")
    }

    if (step === 2 && !selectedTier) {
      newErrors.push("Please select a tier")
    }

    if (step === 3 && !selectedDevType && selectedTier !== "customMade") {
      newErrors.push("Please select a technology approach")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors([])

    // If custom-made tier is selected at step 2, automatically set selectedDevType to "inConsultation"
    if (step === 2 && selectedTier === "customMade") {
      setSelectedDevType("inConsultation")
    }

    if (step < 4) {
      setStep(step + 1)
    } else {
      // Final step - show order dialog
      setShowOrderDialog(true)
    }
  }

  // Handle back button click
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Get discount percentage based on client type
  const getDiscountPercentage = (type: ClientType): number => {
    if (type === "student") return 25
    if (type === "nonprofit") return 50
    return 0
  }

  // Get discount message
  const getDiscountMessage = (type: ClientType): string => {
    const percentage = getDiscountPercentage(type)
    if (percentage === 0) return ""

    return language === "en" ? `${percentage}% discount applied!` : `${percentage}% korting toegepast!`
  }

  // Render "In consultation" text consistently
  const renderConsultationText = () => (
    <span className="flex items-center text-base">
      <HelpCircle className="h-4 w-4 mr-1" /> {t("pricing.in.consultation")}
    </span>
  )

  // Translate client type title
  const getClientTypeTitle = (type: ClientType): string => {
    if (type === "company") return language === "en" ? "Company" : t("pricing.company")
    if (type === "student") return language === "en" ? "Student" : t("pricing.student")
    return language === "en" ? "Non-profit" : t("pricing.nonprofit")
  }

  // Translate client type description
  const getClientTypeDescription = (type: ClientType): string => {
    if (type === "company")
      return language === "en" ? "Standard pricing for businesses of all sizes." : t("pricing.company.desc")
    if (type === "student")
      return language === "en" ? "25% discount for students with valid ID." : t("pricing.student.desc")
    return language === "en" ? "50% discount for registered non-profit organizations." : t("pricing.nonprofit.desc")
  }

  // Client type cards for predefined packages
  const clientTypeCards = Object.entries(CLIENT_TYPE_INFO).map(([key, info]) => (
    <div
      key={key}
      className={`p-4 rounded-lg border-2 cursor-pointer h-full ${
        predefinedPackageClientType === key ? "border-green-500 bg-green-50/50" : "hover:border-green-500"
      }`}
      onClick={() => setPredefinedPackageClientType(key as ClientType)}
    >
      <div className="flex items-center gap-2 mb-2">
        {info.icon}
        <h3 className="font-medium">{getClientTypeTitle(key as ClientType)}</h3>
        {info.discount && <Badge className="bg-green-500 text-xs">-{info.discount}</Badge>}
      </div>
      <p className="text-xs text-muted-foreground">{getClientTypeDescription(key as ClientType)}</p>
    </div>
  ))

  // Client type cards for calculator
  const calculatorClientTypeCards = Object.entries(CLIENT_TYPE_INFO).map(([key, info]) => (
    <div
      key={key}
      className={`p-4 rounded-lg border-2 cursor-pointer h-full ${
        clientType === key ? "border-green-500 bg-green-50/50" : "hover:border-green-500"
      }`}
      onClick={() => setClientType(key as ClientType)}
    >
      <div className="flex items-center gap-2 mb-2">
        {info.icon}
        <h3 className="font-medium">{getClientTypeTitle(key as ClientType)}</h3>
        {info.discount && <Badge className="bg-green-500 text-xs">-{info.discount}</Badge>}
      </div>
      <p className="text-xs text-muted-foreground">{getClientTypeDescription(key as ClientType)}</p>
    </div>
  ))

  // Translate tier name
  const getTierName = (tier: TierType): string => {
    if (tier === "starter") return language === "en" ? "Starter" : t("pricing.starter.title")
    if (tier === "professional") return language === "en" ? "Professional" : t("pricing.professional.title")
    return language === "en" ? "Custom-made" : t("pricing.custom.title")
  }

  // Translate dev type name
  const getDevTypeName = (devType: DevType): string => {
    if (devType === "iDontKnow") return language === "en" ? "I don't know" : t("pricing.tech.idontknow")
    if (devType === "frontendFull") return language === "en" ? "Frontend Full" : t("pricing.tech.frontend")
    if (devType === "wpCmsHeadless")
      return language === "en" ? "WP CMS (headless) + flexible frontend" : t("pricing.tech.wpheadless")
    if (devType === "wpCmsFull") return language === "en" ? "WP CMS Full" : t("pricing.tech.wpfull")
    return language === "en" ? "In consultation" : t("pricing.tech.consultation")
  }

  // Translate package name and description
  const getPackageName = (pkg: PackageType): string => {
    if (pkg === "integrations")
      return language === "en" ? "Integrations (WP Plugins)" : t("pricing.package.integrations")
    if (pkg === "contactForms") return language === "en" ? "Contact Forms" : t("pricing.package.contactforms")
    if (pkg === "setup") return language === "en" ? "Setup" : t("pricing.package.setup")
    return language === "en" ? "Maintenance" : t("pricing.package.maintenance")
  }

  const getPackageDescription = (pkg: PackageType): string => {
    if (pkg === "setup")
      return language === "en" ? "Domain, hosting & email (one-time fee)" : t("pricing.package.setup.desc")
    if (pkg === "maintenance")
      return language === "en"
        ? "Domain, hosting, email and updates (€9.99/month)"
        : t("pricing.package.maintenance.desc")
    return ""
  }

  // Predefined package cards
  const predefinedPackageCards = Object.entries(DATA.predefinedPackages)
    .sort(([key1], [key2]) => {
      // Put MVP last
      if (key1 === "mvp") return 1
      if (key2 === "mvp") return -1
      return 0
    })
    .map(([key, pkg], index) => {
      // Special handling for MVP bundle
      if (key === "mvp") {
        // Only show MVP bundle for companies
        if (predefinedPackageClientType !== "company") {
          return null // Don't render for non-company client types
        }

        const mvpPkg = pkg as any // Using any to handle the special structure
        return (
          <div
            key={key}
            className={`border-2 rounded-lg overflow-hidden transition-all h-full ${
              isMobile && selectedPredefinedPackage === key ? "border-green-500" : "border-border"
            }`}
            onClick={() => setSelectedPredefinedPackage(key as PredefinedPackageType)}
          >
            <div className="p-5 relative">
              <div className="absolute top-0 left-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-br-lg z-10 flex items-center">
                <Crown className="h-4 w-4 mr-1" />
                {t("pricing.popular")}
              </div>
              {/* Only show button on desktop */}
              {!isMobile && (
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = mvpPkg.redirectTo
                    }}
                  >
                    {t("pricing.continue")}
                  </Button>
                </div>
              )}
              <div className="pt-8">
                <h3 className="font-bold text-lg">{t("pricing.mvp.bundle")}</h3>
                <p className="text-sm text-muted-foreground">{t("pricing.mvp.bundle.desc")}</p>
                <div className="text-2xl font-bold mt-1">
                  €{mvpPkg.price}
                  {predefinedPackageClientType !== "company" && (
                    <span className="text-green-500 text-sm font-medium ml-2">
                      {getDiscountMessage(predefinedPackageClientType)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <CustomAccordion
              title={t("pricing.view.details")}
              isOpen={isMobile ? mobilePredefinedAccordionOpen : openAccordions[`predefined-${index}`]}
              onToggle={(isOpen) => handlePredefinedAccordionToggle(`predefined-${index}`, isOpen)}
              titleClassName="py-2 px-4 text-sm"
            >
              <div className="mb-4">
                <h4 className="font-medium mb-2">{t("pricing.about")}</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{t("pricing.mvp.timeframe")}</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full border-green-500 text-green-500 hover:bg-green-50"
                onClick={(e) => {
                  e.stopPropagation()
                  window.location.href = mvpPkg.redirectTo
                }}
              >
                {t("pricing.continue")}
              </Button>
            </CustomAccordion>
          </div>
        )
      }

      // Regular bundle handling (existing code)
      const tierData = DATA.tiers[pkg.tier]
      const devTypeData = DATA.devTypes[pkg.devType]
      const needsConsultation = tierData.isConsultation || devTypeData.isConsultation
      const isPopular = key === "business"

      // Calculate discounted prices for all packages based on client type
      let displayPrice = calculatePackagePrice(pkg)
      let displayMonthlyPrice = calculateMonthlyPrice(pkg)

      // Apply discount if applicable
      if (predefinedPackageClientType === "student") {
        displayPrice = Math.round(displayPrice * (1 - DATA.discounts.student))
        displayMonthlyPrice = Math.round(displayMonthlyPrice * (1 - DATA.discounts.student))
      } else if (predefinedPackageClientType === "nonprofit") {
        displayPrice = Math.round(displayPrice * (1 - DATA.discounts.nonprofit))
        displayMonthlyPrice = Math.round(displayMonthlyPrice * (1 - DATA.discounts.nonprofit))
      }

      return (
        <div
          key={key}
          className={`border-2 rounded-lg overflow-hidden transition-all h-full ${
            isMobile && selectedPredefinedPackage === key ? "border-green-500" : "border-border"
          } ${isPopular ? "relative" : ""}`}
          onClick={() => setSelectedPredefinedPackage(key as PredefinedPackageType)}
        >
          {isPopular && (
            <div className="absolute top-0 left-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-br-lg z-10 flex items-center">
              <Crown className="h-4 w-4 mr-1" />
              {t("pricing.popular")}
            </div>
          )}

          <div className="p-5 relative">
            {/* Only show button on desktop */}
            {!isMobile && (
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Set the selected package and directly show the order dialog
                    setSelectedPredefinedPackage(key as PredefinedPackageType)
                    setShowOrderDialog(true)
                  }}
                >
                  {needsConsultation ? t("pricing.request.consultation") : t("pricing.continue")}
                </Button>
              </div>
            )}
            <div className={isPopular ? "pt-8" : ""}>
              <h3 className="font-bold text-lg">
                {key === "basic"
                  ? t("pricing.simple.bundle")
                  : key === "business"
                    ? t("pricing.plus.bundle")
                    : t("pricing.premium.bundle")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {key === "basic"
                  ? t("pricing.simple.bundle.desc")
                  : key === "business"
                    ? t("pricing.plus.bundle.desc")
                    : t("pricing.premium.bundle.desc")}
              </p>
              <div className="text-2xl font-bold mt-1">
                {needsConsultation ? (
                  renderConsultationText()
                ) : (
                  <>
                    €{displayPrice}
                    {predefinedPackageClientType !== "company" && (
                      <span className="text-green-500 text-sm font-medium ml-2">
                        {getDiscountMessage(predefinedPackageClientType)}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!needsConsultation && hasMonthlyFee(pkg) && (
                <div className="text-sm text-muted-foreground mt-1">
                  + €{displayMonthlyPrice}
                  {language === "en" ? "/month" : "/maand"}
                  {predefinedPackageClientType !== "company" && (
                    <span className="text-green-500 text-xs ml-1">
                      ({getDiscountPercentage(predefinedPackageClientType)}% {language === "en" ? "off" : "korting"})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <CustomAccordion
            title={t("pricing.view.details")}
            isOpen={isMobile ? mobilePredefinedAccordionOpen : openAccordions[`predefined-${index}`]}
            onToggle={(isOpen) => handlePredefinedAccordionToggle(`predefined-${index}`, isOpen)}
            titleClassName="py-2 px-4 text-sm"
          >
            <div className="mb-4">
              <h4 className="font-medium mb-2">
                {t("pricing.tier.name")}
                {getTierName(pkg.tier)}
              </h4>
              <ul className="space-y-2 mb-4">
                {tierData.inclusions.map((inclusion, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>
                      {language === "en" ? inclusion : t(`pricing.tier.${pkg.tier}.inclusion.${idx}`) || inclusion}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">{t("pricing.technology.name")}</h4>
              {devTypeData.isConsultation ? (
                renderConsultationText()
              ) : (
                <div>
                  <div>{getDevTypeName(pkg.devType)}</div>
                  {pkg.additionalDevTypes &&
                    pkg.additionalDevTypes.map((devTypeKey) => (
                      <div key={devTypeKey} className="mt-1">
                        {getDevTypeName(devTypeKey as DevType)}
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">{t("pricing.included.packages")}</h4>
              {pkg.packages.length > 0 ? (
                <ul className="space-y-2">
                  {pkg.packages.map((packageKey) => (
                    <li key={packageKey} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>
                        {getPackageName(packageKey)}
                        {DATA.packages[packageKey].description && (
                          <span className="text-xs text-muted-foreground block">
                            {getPackageDescription(packageKey)}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                renderConsultationText()
              )}
            </div>

            <Button
              variant="outline"
              className="w-full border-green-500 text-green-500 hover:bg-green-50"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPredefinedPackage(key as PredefinedPackageType)
                setShowOrderDialog(true)
              }}
            >
              {needsConsultation ? t("pricing.request.consultation") : t("pricing.continue")}
            </Button>
          </CustomAccordion>
        </div>
      )
    })
    .filter(Boolean) // Filter out null values (MVP for non-company clients)

  // Helper function to calculate package price
  function calculatePackagePrice(pkg: typeof DATA.predefinedPackages.basic): number {
    const tierData = DATA.tiers[pkg.tier]
    const devTypeData = DATA.devTypes[pkg.devType]

    if (tierData.isConsultation || devTypeData.isConsultation) {
      return 0
    }

    let price = 0

    // Add tier price if available
    if (tierData.price !== null) {
      price += tierData.price
    }

    // Add development type price if available
    if (devTypeData.price !== null) {
      price += devTypeData.price
    }

    // Add one-time package prices
    pkg.packages.forEach((packageKey) => {
      const packageInfo = DATA.packages[packageKey]
      if (!packageInfo.isMonthly) {
        price += packageInfo.price
      }
    })

    return price
  }

  // Helper function to calculate monthly price
  function calculateMonthlyPrice(pkg: typeof DATA.predefinedPackages.basic): number {
    let monthlyPrice = 0

    // Add monthly package prices
    pkg.packages.forEach((packageKey) => {
      const packageInfo = DATA.packages[packageKey]
      if (packageInfo.isMonthly) {
        monthlyPrice += packageInfo.price
      }
    })

    return monthlyPrice
  }

  // Helper function to check if package has monthly fee
  function hasMonthlyFee(pkg: typeof DATA.predefinedPackages.basic): boolean {
    return pkg.packages.some((packageKey) => DATA.packages[packageKey].isMonthly)
  }

  // Tier selection cards
  const tierCards = Object.entries(DATA.tiers).map(([key, tier], index) => (
    <div
      key={key}
      className={`border-2 rounded-lg overflow-hidden transition-all h-full ${
        selectedTier === key ? "border-green-500" : "border-border"
      } ${key === "professional" ? "relative" : ""}`}
    >
      {key === "professional" && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg z-10">
          {t("pricing.popular")}
        </div>
      )}

      <div
        className="p-5 flex items-center justify-between cursor-pointer"
        onClick={() => setSelectedTier(key as TierType)}
      >
        <div>
          <h3 className="font-bold">{getTierName(key as TierType)}</h3>
          <div className="text-xl font-bold mt-1">
            {tier.isConsultation ? renderConsultationText() : `€${tier.price}`}
          </div>
        </div>
      </div>

      <CustomAccordion
        title={t("pricing.view.details")}
        isOpen={isMobile ? mobileTierAccordionOpen : openAccordions[`tier-${index}`]}
        onToggle={(isOpen) => handleTierAccordionToggle(`tier-${index}`, isOpen)}
        titleClassName="py-2 px-4 text-sm"
      >
        <ul className="space-y-2">
          {tier.inclusions.map((inclusion, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>{language === "en" ? inclusion : t(`pricing.tier.${key}.inclusion.${idx}`) || inclusion}</span>
            </li>
          ))}
        </ul>
      </CustomAccordion>
    </div>
  ))

  // Development approach cards
  const devTypeCards = Object.entries(DATA.devTypes).map(([key, devType], index) => (
    <div
      key={key}
      className={`border-2 rounded-lg overflow-hidden transition-all h-full ${
        !isDevTypeCompatible(key as DevType)
          ? "opacity-50 cursor-not-allowed"
          : selectedDevType === key
            ? "border-green-500"
            : "border-border"
      }`}
    >
      <div
        className={`p-5 flex items-center justify-between ${isDevTypeCompatible(key as DevType) ? "cursor-pointer" : ""}`}
        onClick={() => isDevTypeCompatible(key as DevType) && setSelectedDevType(key as DevType)}
      >
        <div>
          <h3 className="font-bold">{getDevTypeName(key as DevType)}</h3>
          <div className="text-lg font-bold mt-1">
            {devType.isConsultation ? renderConsultationText() : `€${devType.price}`}
          </div>
        </div>
      </div>

      <CustomAccordion
        title={t("pricing.view.details")}
        isOpen={isMobile ? mobileDevTypeAccordionOpen : openAccordions[`dev-${index}`]}
        onToggle={(isOpen) => handleDevTypeAccordionToggle(`dev-${index}`, isOpen)}
        titleClassName="py-2 px-4 text-sm"
      >
        <div>
          <p className="text-sm text-muted-foreground">{t("pricing.compatible.with")}</p>
          <ul className="space-y-1 mb-4">
            {devType.compatibleTiers.map((tierKey) => (
              <li key={tierKey} className="text-sm">
                • {getTierName(tierKey as TierType)}
              </li>
            ))}
          </ul>
          {language === "nl" && (
            <p className="text-sm text-muted-foreground mt-2">{t(`pricing.tech.${key}.details`) || ""}</p>
          )}
        </div>
      </CustomAccordion>
    </div>
  ))

  // Order summary content for dialog
  const RequestSummary = () => (
    <div className="space-y-4">
      {activeTab === "predefined-packages" ? (
        <>
          <div className="flex justify-between">
            <span>{t("pricing.package")}</span>
            <span className="font-medium">
              {selectedPredefinedPackage
                ? selectedPredefinedPackage === "mvp"
                  ? t("pricing.mvp.bundle")
                  : selectedPredefinedPackage === "basic"
                    ? t("pricing.simple.bundle")
                    : selectedPredefinedPackage === "business"
                      ? t("pricing.plus.bundle")
                      : t("pricing.premium.bundle")
                : "None selected"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("pricing.client.type")}</span>
            <span className="font-medium">
              {predefinedPackageClientType === "company"
                ? t("pricing.company")
                : predefinedPackageClientType === "student"
                  ? t("pricing.student")
                  : t("pricing.nonprofit")}
            </span>
          </div>
          {getDiscountPercentage(predefinedPackageClientType) > 0 && (
            <div className="flex justify-between text-green-500">
              <span>{t("pricing.discount")}</span>
              <span className="font-medium">{getDiscountMessage(predefinedPackageClientType)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>{t("pricing.total")}</span>
            <span>
              {predefinedPackagePrice !== null ? `€${predefinedPackagePrice}` : t("pricing.consultation.needed")}
              {predefinedPackageMonthly !== null &&
                ` + €${predefinedPackageMonthly}${language === "en" ? "/month" : "/maand"}`}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <span>{t("pricing.client.type")}</span>
            <span className="font-medium">
              {clientType === "company"
                ? t("pricing.company")
                : clientType === "student"
                  ? t("pricing.student")
                  : t("pricing.nonprofit")}
            </span>
          </div>

          {selectedTier && (
            <div className="flex justify-between">
              <span>{t("pricing.tier")}</span>
              <span className="font-medium">
                {getTierName(selectedTier)}
                {DATA.tiers[selectedTier].price !== null && ` (€${DATA.tiers[selectedTier].price})`}
              </span>
            </div>
          )}

          {selectedDevType && (
            <div className="flex justify-between">
              <span>{t("pricing.technology")}</span>
              <span className="font-medium">
                {getDevTypeName(selectedDevType)}
                {DATA.devTypes[selectedDevType].price !== null && ` (€${DATA.devTypes[selectedDevType].price})`}
              </span>
            </div>
          )}

          {selectedPackages.length > 0 && (
            <>
              <div className="flex justify-between">
                <span>{t("pricing.packages")}</span>
                <div className="text-right">
                  {selectedPackages.map((pkg) => (
                    <div key={pkg} className="font-medium">
                      {getPackageName(pkg)} (€{DATA.packages[pkg].price}
                      {DATA.packages[pkg].isMonthly ? (language === "en" ? "/month" : "/maand") : ""})
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {getDiscountPercentage(clientType) > 0 && (
            <div className="flex justify-between text-green-500">
              <span>{t("pricing.discount")}</span>
              <span className="font-medium">{getDiscountMessage(clientType)}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>{t("pricing.total")}</span>
            <span>
              {needsConsultation ? t("pricing.consultation.needed") : totalPrice !== null ? `€${totalPrice}` : ""}
              {monthlyPrice !== null && ` + €${monthlyPrice}${language === "en" ? "/month" : "/maand"}`}
            </span>
          </div>
        </>
      )}
    </div>
  )

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24 lg:px-4">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">{t("pricing.title")}</h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">{t("pricing.subtitle")}</p>
        </div>
      </div>

      <div className="container py-12">
        <Tabs
          defaultValue="predefined-packages"
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-5xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="predefined-packages">{t("pricing.predefined.packages")}</TabsTrigger>
            <TabsTrigger value="calculate">{t("pricing.custom.calculator")}</TabsTrigger>
          </TabsList>

          {/* Predefined Packages Tab */}
          <TabsContent value="predefined-packages">
            {/* Client type selector for predefined packages */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t("pricing.select.client.type")}</h2>
              {isMobile ? (
                <Carousel
                  className="h-min mb-4"
                  onSlideChange={(index) => {
                    setClientTypeSlide(index)
                    // Automatically select the client type based on the slide index
                    const clientTypes = Object.keys(CLIENT_TYPE_INFO) as ClientType[]
                    setPredefinedPackageClientType(clientTypes[index])
                  }}
                >
                  {clientTypeCards}
                </Carousel>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">{clientTypeCards}</div>
              )}
            </section>

            {/* Predefined packages */}
            {isMobile ? (
              <>
                <div className="mb-4">
                  <Carousel
                    className="flex-shrink-0 h-min"
                    buttonPosition="higher"
                    onSlideChange={(index) => {
                      setPredefinedPackageSlide(index)
                      // Get visible packages based on client type
                      const visiblePackages = Object.entries(DATA.predefinedPackages)
                        .filter(([key]) => {
                          // Filter out MVP for non-company clients
                          return !(key === "mvp" && predefinedPackageClientType !== "company")
                        })
                        .sort(([key1], [key2]) => {
                          // Put MVP last
                          if (key1 === "mvp") return 1
                          if (key2 === "mvp") return -1
                          return 0
                        })

                      // Automatically select the package based on the slide index
                      if (visiblePackages[index]) {
                        setSelectedPredefinedPackage(visiblePackages[index][0] as PredefinedPackageType)
                      }
                    }}
                  >
                    {predefinedPackageCards.map((card, index) => (
                      <div key={index} className="h-min overflow-hidden">
                        {card}
                      </div>
                    ))}
                  </Carousel>
                </div>

                {/* Single continue button for mobile - positioned outside the carousel */}
                {selectedPredefinedPackage && (
                  <div className="flex justify-center mt-4">
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white px-8"
                      onClick={() => {
                        // For MVP bundle, redirect to the MVP page
                        if (selectedPredefinedPackage === "mvp") {
                          window.location.href = DATA.predefinedPackages.mvp.redirectTo
                        } else {
                          // For other packages, show the order dialog
                          setShowOrderDialog(true)
                        }
                      }}
                    >
                      {t("pricing.continue")}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">{predefinedPackageCards}</div>
            )}

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">{t("pricing.need.custom")}</p>
              <Button
                variant="outline"
                onClick={() => setActiveTab("calculate")}
                className="hover:text-green-500 hover:border-green-500"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {t("pricing.build.custom")}
              </Button>
            </div>
          </TabsContent>

          {/* Calculate Tab */}
          <TabsContent value="calculate">
            {/* Error messages */}
            {errors.length > 0 && (
              <div className="mb-6">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {errors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Stepper */}
            <section className="mb-8">
              <div className="flex justify-between items-center max-w-3xl mx-auto">
                <div
                  className={`flex flex-col items-center ${step >= 1 ? "text-green-500" : "text-muted-foreground"} cursor-pointer`}
                  onClick={() => setStep(1)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-green-500 bg-green-50" : "border-muted-foreground"}`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-1">{t("pricing.step.type")}</span>
                </div>
                <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-green-500" : "bg-muted-foreground"}`}></div>
                <div
                  className={`flex flex-col items-center ${step >= 2 ? "text-green-500" : "text-muted-foreground"} cursor-pointer`}
                  onClick={() => (clientType ? setStep(2) : setErrors(["Please select a client type first"]))}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-green-500 bg-green-50" : "border-muted-foreground"}`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-1">{t("pricing.step.tier")}</span>
                </div>
                <div className={`flex-1 h-0.5 ${step >= 3 ? "bg-green-500" : "bg-muted-foreground"}`}></div>
                <div
                  className={`flex flex-col items-center ${step >= 3 ? "text-green-500" : "text-muted-foreground"} cursor-pointer`}
                  onClick={() => (selectedTier ? setStep(3) : setErrors(["Please select a tier first"]))}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-green-500 bg-green-50" : "border-muted-foreground"}`}
                  >
                    3
                  </div>
                  <span className="text-sm mt-1">{t("pricing.step.technology")}</span>
                </div>
                <div className={`flex-1 h-0.5 ${step >= 4 ? "bg-green-500" : "bg-muted-foreground"}`}></div>
                <div
                  className={`flex flex-col items-center ${step >= 4 ? "text-green-500" : "text-muted-foreground"} cursor-pointer`}
                  onClick={() =>
                    selectedDevType ? setStep(4) : setErrors(["Please select a technology approach first"])
                  }
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 4 ? "border-green-500 bg-green-50" : "border-muted-foreground"}`}
                  >
                    4
                  </div>
                  <span className="text-sm mt-1">{t("pricing.step.extras")}</span>
                </div>
              </div>
            </section>

            {/* Step 1: Client Type */}
            {step === 1 && (
              <section className="mb-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold mb-4">{t("pricing.select.client.type")}</h2>
                  {isMobile ? (
                    <Carousel
                      className="h-24 mb-4"
                      onSlideChange={(index) => {
                        setClientTypeSlideCalculator(index)
                        // Automatically select the client type based on the slide index
                        const clientTypes = Object.keys(CLIENT_TYPE_INFO) as ClientType[]
                        setClientType(clientTypes[index])
                      }}
                    >
                      {calculatorClientTypeCards}
                    </Carousel>
                  ) : (
                    <div className="grid md:grid-cols-3 gap-4">{calculatorClientTypeCards}</div>
                  )}
                </div>
              </section>
            )}

            {/* Step 2: Tier Selection */}
            {step === 2 && (
              <section className="mb-12">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold mb-6">{t("pricing.select.tier")}</h2>
                  {isMobile ? (
                    <Carousel
                      className="mb-4 flex-shrink-0"
                      buttonPosition="higher"
                      onSlideChange={(index) => {
                        setTierSlide(index)
                        // Automatically select the tier based on the slide index
                        const tierTypes = Object.keys(DATA.tiers) as TierType[]
                        setSelectedTier(tierTypes[index])
                      }}
                    >
                      {tierCards.map((card, index) => (
                        <div key={index} className="h-auto">
                          {card}
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <div className="space-y-4">{tierCards}</div>
                  )}
                </div>
              </section>
            )}

            {/* Step 3: Development Approach */}
            {step === 3 && (
              <section className="mb-12">
                <div className="max-w-4xl mx-auto">
                  {selectedTier === "customMade" ? (
                    <div className="text-center p-6 border-2 rounded-lg">
                      <h2 className="text-2xl font-bold mb-4">{t("pricing.select.technology")}</h2>
                      <div className="flex items-center justify-center gap-2 text-lg">
                        <HelpCircle className="h-5 w-5 text-green-500" />
                        <p>{t("pricing.tech.consultation")}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setStep(4)}
                        className="mt-6 border-green-500 text-green-500 hover:bg-green-50"
                      >
                        {t("pricing.continue")} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">{t("pricing.select.technology")}</h2>
                      {isMobile ? (
                        <Carousel
                          className="mb-4 flex-shrink-0"
                          buttonPosition="higher"
                          onSlideChange={(index) => {
                            setDevTypeSlide(index)
                            // Automatically select the dev type based on the slide index, but only if compatible
                            const devTypes = Object.keys(DATA.devTypes) as DevType[]
                            const devType = devTypes[index]
                            // Only set the dev type if it's compatible with the selected tier
                            if (selectedTier && DATA.devTypes[devType].compatibleTiers.includes(selectedTier)) {
                              setSelectedDevType(devType)
                            }
                          }}
                        >
                          {devTypeCards.map((card, index) => (
                            <div key={index} className="h-auto">
                              {card}
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        <div className="space-y-4">{devTypeCards}</div>
                      )}
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Step 4: Packages */}
            {step === 4 && (
              <section className="mb-12">
                <div className="max-w-4xl mx-auto">
                  {selectedTier === "customMade" ? (
                    <div className="text-center p-6 border-2 rounded-lg">
                      <h2 className="text-2xl font-bold mb-4">{t("pricing.select.packages")}</h2>
                      <div className="flex items-center justify-center gap-2 text-lg">
                        <HelpCircle className="h-5 w-5 text-green-500" />
                        <p>{t("pricing.consultation.text")}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowOrderDialog(true)}
                        className="mt-6 border-green-500 text-green-500 hover:bg-green-50"
                      >
                        {t("pricing.request.consultation")}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">{t("pricing.select.packages")}</h2>
                      <div className="space-y-4">
                        {Object.entries(DATA.packages).map(([key, pkg]) => (
                          <div
                            key={key}
                            className={`p-4 border-2 rounded-lg ${!isPackageCompatible(key as PackageType) ? "opacity-50" : ""}`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold">{getPackageName(key as PackageType)}</h3>
                                  <span className="text-base font-bold">
                                    €{pkg.price}
                                    {pkg.isMonthly ? (language === "en" ? "/month" : "/maand") : ""}
                                  </span>
                                </div>
                                {pkg.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {getPackageDescription(key as PackageType)}
                                  </p>
                                )}
                              </div>
                              <Checkbox
                                checked={selectedPackages.includes(key as PackageType)}
                                onCheckedChange={() =>
                                  isPackageCompatible(key as PackageType) && togglePackage(key as PackageType)
                                }
                                disabled={!isPackageCompatible(key as PackageType)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>
            )}

            {/* Navigation buttons */}
            <section className="mb-8">
              <div className="max-w-3xl mx-auto flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> {t("pricing.back")}
                  </Button>
                ) : (
                  <div></div> // Empty div to maintain flex spacing
                )}

                <Button onClick={handleContinue} className="bg-green-500 hover:bg-green-600">
                  {step < 4 ? (
                    <>
                      {t("pricing.continue")} <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : needsConsultation ? (
                    t("pricing.request.consultation")
                  ) : (
                    t("pricing.continue")
                  )}
                </Button>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Summary Dialog with proper scrolling */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{t("pricing.summary")}</DialogTitle>
            <DialogDescription>{t("pricing.review.details")}</DialogDescription>
          </DialogHeader>

          {/* Scrollable content area */}
          <div className="overflow-y-auto flex-grow py-4 pr-2" style={{ maxHeight: "calc(90vh - 180px)" }}>
            <RequestSummary />

            <Separator className="my-4" />

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    {t("pricing.form.firstname")}
                  </label>
                  <input id="firstName" className="w-full p-2 border rounded-md" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    {t("pricing.form.lastname")}
                  </label>
                  <input id="lastName" className="w-full p-2 border rounded-md" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("pricing.form.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  {t("pricing.form.phone")}
                </label>
                <input id="phone" type="tel" className="w-full p-2 border rounded-md" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t("pricing.form.message")}
                </label>
                <textarea
                  id="message"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  placeholder={t("pricing.form.message.placeholder")}
                />
              </div>
            </form>
          </div>

          <DialogFooter className="sm:justify-between flex-shrink-0 mt-4 pt-2 border-t">
            <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
              {t("pricing.back")}
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={async () => {
                // Get form values
                const firstName = (document.getElementById("firstName") as HTMLInputElement)?.value
                const lastName = (document.getElementById("lastName") as HTMLInputElement)?.value
                const email = (document.getElementById("email") as HTMLInputElement)?.value
                const phone = (document.getElementById("phone") as HTMLInputElement)?.value
                const message = (document.getElementById("message") as HTMLTextAreaElement)?.value

                // Validate required fields
                if (!firstName || !lastName || !email) {
                  alert(t("pricing.fill.required"))
                  return
                }

                // Set loading state
                setIsSubmitting(true)

                try {
                  // Prepare package details based on active tab
                  const packageDetails =
                    activeTab === "predefined-packages"
                      ? {
                          package: selectedPredefinedPackage,
                          clientType: predefinedPackageClientType,
                          price: predefinedPackagePrice,
                          monthlyPrice: predefinedPackageMonthly,
                        }
                      : {
                          clientType,
                          tier: selectedTier,
                          technology: selectedDevType,
                          packages: selectedPackages,
                          price: totalPrice,
                          monthlyPrice: monthlyPrice,
                        }

                  // Send the form data to our API
                  const response = await fetch("/api/form-submission", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      formType: "pricing",
                      formData: {
                        firstName,
                        lastName,
                        email,
                        phone,
                        message,
                        packageDetails,
                        language, // Add the current language
                      },
                    }),
                  })

                  const data = await response.json()

                  if (response.ok) {
                    // Show success message
                    alert(t("pricing.request.submitted"))
                    setShowOrderDialog(false)
                  } else {
                    // Show error message
                    alert(
                      `${language === "en" ? "Error" : "Fout"}: ${data.error || (language === "en" ? "Failed to submit request" : "Aanvraag indienen mislukt")}`,
                    )
                  }
                } catch (error) {
                  // Show error message
                  alert(
                    language === "en"
                      ? "An unexpected error occurred. Please try again later."
                      : "Er is een onverwachte fout opgetreden. Probeer het later opnieuw.",
                  )
                } finally {
                  setIsSubmitting(false)
                }
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
              ) : (activeTab === "predefined-packages" &&
                  selectedPredefinedPackage &&
                  selectedPredefinedPackage !== "mvp" &&
                  (DATA.predefinedPackages[selectedPredefinedPackage] as any).tier &&
                  (DATA.tiers[(DATA.predefinedPackages[selectedPredefinedPackage] as any).tier].isConsultation ||
                    DATA.devTypes[(DATA.predefinedPackages[selectedPredefinedPackage] as any).devType]
                      .isConsultation)) ||
                (activeTab === "calculate" && needsConsultation) ? (
                t("pricing.request.consultation")
              ) : (
                t("pricing.form.submit")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}

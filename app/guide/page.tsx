"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, Zap, Target, Users, Settings, Lightbulb, Rocket, BarChart3, Shield, Clock, Globe, ChevronRight, Play, X } from "lucide-react"
import Link from "next/link"
import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"

export default function GuidePage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectDetails: '',
    url: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  const steps = [
    {
      id: "discover",
      title: t("guide.step1.title"),
      subtitle: t("guide.step1.subtitle")
    },
    {
      id: "choose",
      title: t("guide.step2.startup.title"), 
      subtitle: t("guide.step2.startup.subtitle")
    },
    {
      id: "start",
      title: t("guide.step3.title"),
      subtitle: t("guide.step3.subtitle")
    }
  ]

  const handlePathSelection = (path: string) => {
    setSelectedPath(path)
    // Automatically advance to step 2 when a path is selected
    setCurrentStep(2)
    // Scroll to step 2 after a short delay to allow state update
    setTimeout(() => {
      if (step2Ref.current) {
        const elementTop = step2Ref.current.offsetTop
        const offset = 120
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const handleSolutionSelection = (solution: string) => {
    setSelectedSolution(solution)
    setCurrentStep(3)
    // Scroll to step 3 after a short delay to allow state update
    setTimeout(() => {
      if (step3Ref.current) {
        const elementTop = step3Ref.current.offsetTop
        const offset = 100
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const handleStartOver = () => {
    setCurrentStep(0)
    setSelectedPath(null)
    setSelectedSolution(null)
  }

  const getSelectedPathLabel = () => {
    return selectedPath === 'startup' ? t("guide.path.startup.label") : t("guide.path.scale.label")
  }

  const getSelectedSolutionLabel = () => {
    const solutionLabels: { [key: string]: string } = {
      'mvp': t("guide.solution.mvp.label"),
      'validation': t("guide.solution.validation.label"),
      'website': t("guide.solution.website.label"),
      'marketing': t("guide.solution.marketing.label"),
      'ai': t("guide.solution.ai.label"),
      'process': t("guide.solution.process.label"),
      'other': t("guide.solution.other.label")
    }
    return solutionLabels[selectedSolution || ''] || t("guide.solution.notSelected")
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Guide Request: ${getSelectedSolutionLabel()}`,
          message: `Guide Submission Details:

Selected Path: ${getSelectedPathLabel()}
Selected Solution: ${getSelectedSolutionLabel()}

Project Description:
${formData.message}

Additional Details:
${formData.projectDetails || 'None provided'}

Website URL:
${formData.url || 'None provided'}

Source: Guide Form`,
          language: 'en'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          projectDetails: '',
          url: ''
        })
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    // Only allow going to previous steps or current step
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
      
      // Scroll to the appropriate step
      setTimeout(() => {
        let targetRef = null
        let offset = 100
        
        if (stepIndex === 1) {
          targetRef = step1Ref.current
          offset = 120
        } else if (stepIndex === 2) {
          targetRef = step2Ref.current
          offset = 120
        } else if (stepIndex === 3) {
          targetRef = step3Ref.current
          offset = 100
        }
        
        if (targetRef) {
          const elementTop = targetRef.offsetTop
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleStartJourney = () => {
    setCurrentStep(1)
    // Scroll to step 1 after a short delay to allow state update
    setTimeout(() => {
      if (step1Ref.current) {
        const elementTop = step1Ref.current.offsetTop
        const offset = 120
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {t("guide.hero.title")}
          </h1>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto mb-8">
            {t("guide.hero.subtitle")}
          </p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={handleStartJourney}
            >
              <Play className="mr-2 h-5 w-5" />
              {t("guide.hero.startButton")}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Steps - Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => {
                const stepNumber = index + 1
                const isClickable = stepNumber <= currentStep
                const isCompleted = currentStep > index
                const isCurrent = currentStep === index
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                        isCompleted
                          ? 'bg-green-500 text-white' 
                          : isCurrent
                          ? 'bg-green-300 text-green-800'
                          : 'bg-gray-200 text-gray-500'
                      } ${
                        isClickable 
                          ? 'cursor-pointer hover:scale-105 hover:shadow-md' 
                          : 'cursor-default'
                      }`}
                      onClick={() => handleStepClick(stepNumber)}
                    >
                      {stepNumber}
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="h-5 w-5 text-gray-300 mx-4" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-16">
        {/* Step 1: Discover Your Path */}
        {currentStep >= 1 && (
          <section ref={step1Ref} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Step 1: {t("guide.step1.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("guide.step1.description")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedPath === 'startup' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => handlePathSelection('startup')}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Rocket className="h-6 w-6 text-green-500" />
                      {t("guide.path.startup.title")}
                    </CardTitle>
                    <CardDescription>
                      {t("guide.path.startup.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("guide.path.startup.details")}
                    </p>
                    <div className="flex items-center text-green-600 font-medium">
                      <span>{t("guide.path.startup.badge")}</span>
                      {selectedPath === 'startup' && <CheckCircle2 className="h-4 w-4 ml-2" />}
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedPath === 'scale' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => handlePathSelection('scale')}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <BarChart3 className="h-6 w-6 text-green-500" />
                      {t("guide.path.scale.title")}
                    </CardTitle>
                    <CardDescription>
                      {t("guide.path.scale.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("guide.path.scale.details")}
                    </p>
                    <div className="flex items-center text-green-600 font-medium">
                      <span>{t("guide.path.scale.badge")}</span>
                      {selectedPath === 'scale' && <CheckCircle2 className="h-4 w-4 ml-2" />}
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </section>
        )}

        {/* Step 2: Personalized Recommendations */}
        {currentStep >= 2 && (
          <section ref={step2Ref} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {selectedPath === 'startup' 
                  ? t("guide.step2.startup.title")
                  : t("guide.step2.scale.title")
                }
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {selectedPath === 'startup' 
                  ? t("guide.step2.startup.subtitle")
                  : t("guide.step2.scale.subtitle")
                }
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {selectedPath === 'startup' ? (
                <div className="space-y-6 mb-8">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'mvp' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('mvp')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Rocket className="h-6 w-6 text-green-600" />
                        {t("guide.solution.mvp.title")}
                        {selectedSolution === 'mvp' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.mvp.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.mvp.what")}</strong> {t("guide.solution.mvp.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.mvp.perfect")}</strong> {t("guide.solution.mvp.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.mvp.investment")}</strong> {t("guide.solution.mvp.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'validation' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('validation')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-blue-600" />
                        {t("guide.solution.validation.title")}
                        {selectedSolution === 'validation' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.validation.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.validation.what")}</strong> {t("guide.solution.validation.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.validation.perfect")}</strong> {t("guide.solution.validation.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.validation.investment")}</strong> {t("guide.solution.validation.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'website' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('website')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Globe className="h-6 w-6 text-purple-600" />
                        {t("guide.solution.website.title")}
                        {selectedSolution === 'website' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.website.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.website.what")}</strong> {t("guide.solution.website.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.website.perfect")}</strong> {t("guide.solution.website.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.website.investment")}</strong> {t("guide.solution.website.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'other' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('other')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Settings className="h-6 w-6 text-gray-600" />
                        {t("guide.solution.other.title")}
                        {selectedSolution === 'other' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.other.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.other.what")}</strong> {t("guide.solution.other.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.other.perfect")}</strong> {t("guide.solution.other.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.other.investment")}</strong> {t("guide.solution.other.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6 mb-8">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'marketing' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('marketing')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                        {t("guide.solution.marketing.title")}
                        {selectedSolution === 'marketing' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.marketing.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.marketing.what")}</strong> {t("guide.solution.marketing.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.marketing.perfect")}</strong> {t("guide.solution.marketing.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.marketing.investment")}</strong> {t("guide.solution.marketing.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'ai' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('ai')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Zap className="h-6 w-6 text-blue-600" />
                        {t("guide.solution.ai.title")}
                        {selectedSolution === 'ai' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.ai.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.ai.what")}</strong> {t("guide.solution.ai.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.ai.perfect")}</strong> {t("guide.solution.ai.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.ai.investment")}</strong> {t("guide.solution.ai.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'process' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('process')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Settings className="h-6 w-6 text-purple-600" />
                        {t("guide.solution.process.title")}
                        {selectedSolution === 'process' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.process.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.process.what")}</strong> {t("guide.solution.process.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.process.perfect")}</strong> {t("guide.solution.process.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.process.investment")}</strong> {t("guide.solution.process.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedSolution === 'other' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSolutionSelection('other')}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Lightbulb className="h-6 w-6 text-gray-600" />
                        {t("guide.solution.other.title")}
                        {selectedSolution === 'other' && <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />}
                      </CardTitle>
                      <CardDescription>
                        {t("guide.solution.other.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>{t("guide.solution.other.what")}</strong> {t("guide.solution.other.whatValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.other.perfect")}</strong> {t("guide.solution.other.perfectValue")}</p>
                        <p className="text-sm"><strong>{t("guide.solution.other.investment")}</strong> {t("guide.solution.other.investmentValue")}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Step 3: Start Your Journey */}
        {currentStep >= 3 && (
          <section ref={step3Ref} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Step 3: {t("guide.step3.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("guide.step3.subtitle")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">☕</span>
                      {t("guide.action.discovery.title")}
                    </CardTitle>
                    <CardDescription>
                      {t("guide.action.discovery.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <p>{t("guide.action.discovery.bullet1")}</p>
                      <p>{t("guide.action.discovery.bullet2")}</p>
                      <p>{t("guide.action.discovery.bullet3")}</p>
                      <p>{t("guide.action.discovery.bullet4")}</p>
                    </div>
                    <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                      <Link href="/contact">{t("guide.action.discovery.button")}</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">📝</span>
                      {t("guide.action.submit.title")}
                    </CardTitle>
                    <CardDescription>
                      {t("guide.action.submit.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <p>{t("guide.action.submit.bullet1")}</p>
                      <p>{t("guide.action.submit.bullet2")}</p>
                      <p>{t("guide.action.submit.bullet3")}</p>
                      <p>{t("guide.action.submit.bullet4")}</p>
                    </div>
                    <Button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      {t("guide.action.submit.button")}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Why This Works */}
              <div className="bg-muted/50 p-8 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4 text-center">{t("guide.why.title")}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{t("guide.why.fast.title")}</h4>
                    <p className="text-sm text-muted-foreground">{t("guide.why.fast.description")}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{t("guide.why.fit.title")}</h4>
                    <p className="text-sm text-muted-foreground">{t("guide.why.fit.description")}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{t("guide.why.risk.title")}</h4>
                    <p className="text-sm text-muted-foreground">{t("guide.why.risk.description")}</p>
                  </div>
                </div>
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">{t("guide.final.title")}</h3>
                  <p className="text-lg mb-6 opacity-90">
                    {t("guide.final.subtitle")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-green-600 hover:bg-gray-100 px-8"
                      onClick={handleStartOver}
                    >
                      {t("guide.final.startOver")}
                    </Button>
                    <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 text-white px-8">
                      <Link href="/contact">{t("guide.final.getStarted")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Submission Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("guide.modal.title")}</DialogTitle>
            <DialogDescription>
              {t("guide.modal.description")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Selected Information Summary */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">{t("guide.modal.selections")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("guide.modal.path")}</span>
                  <span className="font-medium">{getSelectedPathLabel()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("guide.modal.solution")}</span>
                  <span className="font-medium">{getSelectedSolutionLabel()}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t("guide.modal.form.name")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("guide.modal.form.name.placeholder")}
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t("guide.modal.form.email")} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("guide.modal.form.email.placeholder")}
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t("guide.modal.form.message")} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("guide.modal.form.message.placeholder")}
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="projectDetails" className="text-sm font-medium">
                  {t("guide.modal.form.details")}
                </label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  placeholder={t("guide.modal.form.details.placeholder")}
                  value={formData.projectDetails}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium">
                  {t("guide.modal.form.url")}
                </label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder={t("guide.modal.form.url.placeholder")}
                  value={formData.url}
                  onChange={handleFormChange}
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-lg text-sm">
                  {t("guide.modal.success")}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-sm">
                  {t("guide.modal.error")}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  {t("guide.modal.form.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("guide.modal.form.submitting")}
                    </span>
                  ) : (
                    t("guide.modal.form.submit")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import MarkdownPreview from '@uiw/react-markdown-preview'

const resourceContent = {
  "automations-quickstart": {
    title: "Automations Quickstart Guide",
    description: "Learn how to set up powerful automations that save you time and boost your productivity.",
    content: `## GitHub Repository

You can access the Automations Quickstart resource on GitHub here:

**[https://github.com/8leaps/guide-automations-quickstart](https://github.com/8leaps/guide-automations-quickstart)**

---

# Automations Quickstart (n8n - Postiz)

Welcome to the n8n + Postiz Quick Start Guide!

## About n8n 🔄

n8n is a powerful opensource workflow automation tool that allows you to connect all kinds services and create automated workflows without coding. It supports hundreds of integrations (including your own code) and can trigger actions based on various conditions.

## About Postiz 📅

Postiz gives you the flexibility to schedule your posts in advance across almost ALL social media platforms. You can either self-host or use their cloud service.

This guide applies to both options, but our focus here will be on the self-hosted setup integrated with n8n automation.

## n8n + Postiz 🔥

When combined, n8n and Postiz create a powerful social media automation system:

- **Automated Content Creation**: Generate posts based on triggers, schedules, or external data
- **Multi-Platform Publishing**: Automatically post to multiple social networks simultaneously
- **Smart Scheduling**: Create complex scheduling logic based on your business needs
- **Data-Driven Posts**: Pull content from APIs, databases, or external services
- **Workflow Integration**: Connect your social media strategy with your entire business workflow

## 📹 Video Tutorial

**Watch the complete setup process in action!** 

<img src="https://raw.githubusercontent.com/8leaps/guide-automations-quickstart/main/media/guide-automations-quickstart-demo.gif" alt="Guide Automations Quickstart Demo" width="800" style="max-width: 100%; height: auto;">

> **📺 [Watch on Google Drive](https://drive.google.com/file/d/1qVWlAMbCSYjj2rhHB4cYZFaKBbquN0A2/view?usp=sharing)** - For better control (pause, rewind, full screen) if the GIF is too fast to follow!  
> *💡 Tip: Right-click the link and select "Open in new tab" to keep this page open while watching*

Follow along with the video tutorial above, or use the step-by-step instructions below to get everything up and running in just 5-10 minutes or less!

## Let's get started

Follow the steps below (Get started now) to get everything up and running in just 10-15 minutes or less!

## Prerequisites

- Docker and Docker Compose installed

## Get started now

### 1. X.com Developer App Settings

Before you are able to post on X, you will need to create an X app so that you can connect to the X API later on.

### Step 1: Create X Developer Account

1. Go to [developer.x.com](https://developer.x.com)
2. Sign up for a developer account
3. Create a new app

### Step 2: Configure App Settings

**User authentication settings:**

- **App permissions**: Read and write
- **Type of App**: Web App, Automated App or Bot (Confidential client)

**App info:**

- **Callback URL**: \`http://localhost:5000/integrations/social/x\`
- **Website URL**: \`https://example.com\`

### Step 3: Get API Credentials

1. Go to "Keys and tokens" tab
2. Copy your **API Key** and **API Secret**
3. Generate **Access Token** and **Access Token Secret**
4. Copy your **Bearer Token**

### 2. Container Setup

### Step 1: Configure Environment Variables

Before starting the services, you need to create a \`.env\` file with your configuration:

1. Copy the environment template:

   **Windows:**

   \`\`\`cmd
   copy env.template .env
   \`\`\`

   **macOS/Linux:**

   \`\`\`bash
   cp env.template .env
   \`\`\`

2. Edit the \`.env\` file and fill in your values:
   - **Required**: Update the X API credentials (X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_BEARER_TOKEN)
   - **Required**: Set a secure JWT_SECRET (generate a random string)
   - **Optional**: Configure other social media APIs if needed
   - **Optional**: Set up Cloudflare R2 for file storage (or leave as-is for local storage)

### Step 2: Start Both Services

\`\`\`bash
docker-compose up -d
\`\`\`

This will start both Postiz and n8n services.

### 3. Postiz Setup

### Step 1: Access Postiz and Sign Up

1. Go to \`http://localhost:5000\`
2. **Sign up** for a new account (email/password)
3. **Log in** to your new account

### Step 2: Connect X Integration

1. On the Postiz dashboard, you should see an option to **"Add X Integration"** or **"Connect X"**
2. The X API credentials should already be configured from your \`.env\` file
3. **Test the connection** - it should show "Connected" or similar
4. You should now see your X account in the integrations list

### Step 3: Get Public API Key

1. In Postiz, go to **Settings** → **API**
2. Copy your **Public API Key** (you'll need this for n8n)

### 4. n8n Setup

### Step 1: Access n8n

**_Login_**

1. Go to \`http://localhost:5678\`
2. Login with: \`admin\` / \`Admin123\` (or else)

**_Signup_**

1. Go to \`http://localhost:5678\`
2. "Set up a owner account": \`<your-email>\` (admin@example.com), \`<firstname>\` (admin), \`<lastname>\` (admin) & \`<password>\` (Admin123) (or else)
3. "Customize n8n to you": Get started (in other words skip)
4. "Get paid features for free (forever)": Skip (left bottom button)

### Step 2: Install Postiz Node

1. Click on **Account icon** → **Settings** (account icon) → **Install a community node**
2. Enter: \`n8n-nodes-postiz\` (npm package)
3. Select the terms and click **"Install"**
4. Wait for installation to complete

### Step 3: Import Workflow

1. Click "Create Workflow" (top right button). Alternatively click "Start from scratch"
2. Click "Import from file" (3 dots in menu)
3. Select the provided \`n8n-import_postiz.json\` from this repository
4. Click "Import"

### Step 4: Configure Postiz Credentials

1. Double click on a Postiz node in the workflow
2. Click "Create New" for credentials
3. **API Key**: Paste your Postiz Public API Key (from Step 4 in Postiz Setup)
4. **Host**: \`http://postiz:5000/api\`
5. Make sure all Postiz nodes are using the correct credentials
6. **Test connection** and save

### Step 5: Test the Workflow

1. Click "Execute Workflow"
2. Check the output for success
3. Verify if your post appears on X

## 5. Workflow Overview

The imported workflow should include the following nodes:

| Node                      | Description                                       |
| ------------------------- | ------------------------------------------------- |
| **Manual Trigger**        | Start the workflow manually                       |
| **Postiz - Get Channels** | Retrieve connected social media channels          |
| **Code - Datetime now**   | Generate current timestamp and extract channel ID |
| **Postiz - Create Post**  | Create and publish content to X                   |

## 6. Customization

### Adding More Content

Edit the "Content" field in the Postiz Schedule node to change your post text.

### Scheduling Posts

Change the "Type" from "Now" to "Specific Date" and set a future date/time.

### Adding More Social Platforms

Connect additional platforms in Postiz and update the channel ID in the workflow.

## 7. Troubleshooting

### Common Issues

- **"Could not connect to platform"**: Check X Developer Portal settings
- **"Invalid website url"**: Use \`https://example.com\` instead of localhost
- **Cookie issues**: Use localhost instead of ngrok for development

### Getting Help

- Check Postiz logs: \`docker-compose logs postiz\`
- Check n8n logs: \`docker-compose logs n8n\`
- Verify X API credentials are correct

### Getting Additional Help

If you encounter issues not covered in the troubleshooting section:

- **Documentation**: Check the [Postiz documentation](https://docs.postiz.com) for detailed guides
- **Community Support**: Join our community forum for peer support
- **Professional Support**: Contact us at [https://8leaps.com/contact](https://8leaps.com/contact) for personalized assistance
- **GitHub Issues**: Report bugs or feature requests on our GitHub repository`,
    image: "/resources/automations-quickstart.png"
  },
  "10-hour-x-growth-strategy": {
    title: "10-Hour X Growth Strategy",
    description: "A comprehensive guide to growing your presence on X (Twitter) with just 10 hours of focused effort per week.",
    content: "Coming soon...",
    image: "/resources/automations-quickstart.png"
  },
  "no-bs-ai-marketing-guide": {
    title: "No-BS AI Marketing Guide",
    description: "Cut through the AI marketing hype and learn practical strategies that actually work.",
    content: "Coming soon...",
    image: "/resources/automations-quickstart.png"
  }
}

export default function ResourceSrcPage() {
  const { t } = useLanguage()
  const params = useParams()
  const searchParams = useSearchParams()
  const resourceId = params.id as string
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  const resource = resourceContent[resourceId as keyof typeof resourceContent]

  useEffect(() => {
    // Check if user has valid access using ref parameter
    const checkAccess = async () => {
      const ref = searchParams.get('ref')
      
      if (!ref) {
        setError(t("resource.invalid-link"))
        setIsLoading(false)
        return
      }
      
      // Check if this is automations-quickstart and validate accordingly
      if (resourceId === 'automations-quickstart') {
        const expectedRef = process.env.NEXT_PUBLIC_RESOURCE_QUICKSTART_REF
        
        // Handle URL decoding - convert spaces back to + if needed
        const normalizedRef = ref.replace(/ /g, '+')
        
        if (normalizedRef !== expectedRef) {
          setError(t("resource.invalid-reference"))
          setIsLoading(false)
          return
        }
      } else {
        // For other resources, you can add more validation logic here
        setError(t("resource.not-found"))
        setIsLoading(false)
        return
      }
      
      setIsAuthorized(true)
      setIsLoading(false)
    }
    
    checkAccess()
  }, [searchParams, resourceId, resource])

  if (!resource) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("resource.not-found")}</h1>
          <p className="text-muted-foreground mb-6">{t("resource.not-found-desc")}</p>
          <Button asChild>
            <Link href="/resources">{t("resource.go-to-resources")}</Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4">{t("resource.loading")}</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Back Button */}
      <div className="container py-4">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("resource.back-to-resources")}
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {!isAuthorized ? (
            /* Access Denied */
            <Card className="border-2 border-red-200 bg-red-50/50">
              <CardContent className="p-8 text-center">
                <X className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">{t("resource.access-denied")}</h1>
                <p className="text-xl text-muted-foreground mb-6">{error}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("resource.email-instruction")}
                </p>
                <Button asChild>
                  <Link href="/resources">{t("resource.go-to-resources")}</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Resource Content - Only visible to authorized users */
            <div className="space-y-8">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
                <p className="text-xl text-muted-foreground">{resource.description}</p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <MarkdownPreview 
                    source={resource.content || ''} 
                    style={{ 
                      padding: 0,
                      backgroundColor: 'transparent'
                    }}
                    wrapperElement={{
                      "data-color-mode": "light"
                    }}
                  />
                </CardContent>
              </Card>

              {resource.image && (
                <div className="flex justify-center">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">
            {t("about.title")}
          </h1>
        </div>
      </div>

      <section className="py-12 md:py-32 lg:px-4">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 md:mb-10">
                {language === "en" ? "Mission" : "Missie"}
              </h2>
              {language === "en" ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    At <strong>8Leaps</strong>, we are fully committed to
                    supporting our clients as effectively as possible. We
                    operate both locally (in the Netherlands) and
                    internationally.
                  </p>
                  <p className="text-muted-foreground">
                    With our services, we help accelerate projects, giving them
                    a leap forward. At the same time, we provide the support
                    needed to keep organizations agile, help them grow, and
                    maintain their edge.
                  </p>
                  <p className="text-muted-foreground">
                    Our focus is on growth:
                  </p>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>against competitors</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>towards project goals</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>and in terms of societal impact</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    Ultimately, our goal is to bring valuable projects and
                    people closer together. Thanks to our pragmatic approach, we
                    move quickly, from client need to working end product or
                    MVP, without hassle.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Bij <strong>8Leaps</strong> zetten we ons volledig in om
                    onze klanten zo goed mogelijk te ondersteunen. We doen dit
                    zowel lokaal (in Nederland) als internationaal.
                  </p>
                  <p className="text-muted-foreground">
                    Met onze diensten helpen we projecten versneld vooruit.
                    Tegelijkertijd bieden we ondersteuning om organisaties
                    wendbaar te houden, mee te laten groeien en hun voorsprong
                    te behouden.
                  </p>
                  <p className="text-muted-foreground">
                    Wij richten ons op groei:
                  </p>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>ten opzichte van concurrenten</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>richting projectdoelen</span>
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      <span>én op het gebied van maatschappelijke impact</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    Uiteindelijk is ons doel om waardevolle projecten en mensen
                    dichter bij elkaar te brengen. Door onze pragmatische
                    werkwijze kunnen we snel schakelen, van klantwens naar
                    werkend eindproduct of MVP, zonder gedoe.
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <div className="relative h-64 w-64 md:h-80 md:w-80">
                <Image
                  src="/about.png"
                  alt="Vision and goals illustration"
                  width={320}
                  height={320}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32 bg-muted/50 lg:px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 md:mb-16 text-center">
            {language === "en" ? "Vision & Values" : "Visie & Waarden"}
          </h2>
          <div className="max-w-3xl mx-auto mb-12">
            {language === "en" ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We feel a strong sense of social responsibility and are deeply
                  connected to themes around people, nature, and the economy.
                  These lie at the heart of our thinking.
                </p>
                <p className="text-muted-foreground">
                  That's why we carefully choose who we work with: we don't take
                  on just any project. Instead, we focus primarily on
                  initiatives that contribute to a better world, with a clear
                  preference for the <strong>non-profit sector</strong>, both
                  nationally and internationally.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We voelen een sterke maatschappelijke verantwoordelijkheid en
                  zijn diep verbonden met thema's rond mens, natuur en economie.
                  Deze vormen het hart van onze denkwijze.
                </p>
                <p className="text-muted-foreground">
                  We kiezen onze samenwerkingen daarom zorgvuldig: we nemen niet
                  elk project aan. In plaats daarvan richten we ons grotendeels
                  op initiatieven die bijdragen aan een betere wereld, met een
                  duidelijke voorkeur voor de <strong>non-profitsector</strong>,
                  zowel op nationaal als internationaal niveau.
                </p>
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">
            {language === "en" ? "What We Stand For" : "Waar Wij Voor Staan"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">
                {language === "en" ? "Innovation" : "Innovatie"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Always seeking smarter and more sustainable solutions"
                  : "Altijd op zoek naar slimmere en duurzamere oplossingen"}
              </p>
            </div>
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">
                {language === "en" ? "Speed" : "Snelheid"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "From idea to execution in a short timeframe"
                  : "Van idee naar realisatie in korte tijd"}
              </p>
            </div>
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">
                {language === "en" ? "Collaboration" : "Samenwerking"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Our clients are not just customers, they are partners"
                  : "De klant is bij ons geen opdrachtgever, maar een partner"}
              </p>
            </div>
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">
                {language === "en" ? "Accessibility" : "Toegankelijkheid"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Making technology understandable and approachable"
                  : "Technologie begrijpelijk en bereikbaar maken"}
              </p>
            </div>
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">
                {language === "en" ? "Impact" : "Impact"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "We don't just build projects, we build change"
                  : "We bouwen niet zomaar projecten, we bouwen aan verandering"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32 lg:px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 md:mb-16 text-center">
            {language === "en" ? "Our Approach" : "Onze Aanpak"}
          </h2>
          <div className="max-w-3xl mx-auto">
            {language === "en" ? (
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  We take a strategic and client-driven approach. Every project
                  starts with a deep understanding of our client's goals, needs,
                  and challenges.
                </p>
                <p className="text-muted-foreground">
                  Then we develop a tailored solution, using the most suitable
                  technologies, methods, and tools. Whether it's a clear MVP,
                  technical validation, or a complex development track, we
                  deliver with focus and flair.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Wij hanteren een strategische en klantgerichte aanpak. Elk
                  project start met het grondig begrijpen van de doelstellingen,
                  behoeften en uitdagingen van onze klant.
                </p>
                <p className="text-muted-foreground">
                  Daarna ontwikkelen we een oplossing op maat, met behulp van de
                  meest passende technologieën, methodieken en tools. Of het nu
                  gaat om een heldere MVP, technische validatie of een complex
                  ontwikkeltraject, we leveren met focus en flair.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

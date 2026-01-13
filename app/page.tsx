import { Navbar } from "@shared/components/ui/navbar"
import { HeroSection } from "@shared/components/sections/hero-section"
import { ImpactSection } from "@shared/components/sections/impact-section"
import { FeaturesSection } from "@shared/components/sections/features-section"
import { TestimonialsSection } from "@shared/components/sections/testimonials-section"
import { PricingSection } from "@shared/components/sections/pricing-section"
import { CtaSection } from "@shared/components/sections/cta-section"
import { FooterSection } from "@shared/components/sections/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-hidden">
      <Navbar />
      <HeroSection />
      <ImpactSection />
      {/* <FeaturesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}
      {/* <CtaSection /> */}
      {/* <FooterSection /> */}
    </main>
  )
}

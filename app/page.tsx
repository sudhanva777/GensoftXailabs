import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import ProgramHighlights from "@/components/ProgramHighlights";
import ToolsSection from "@/components/ToolsSection";
import StudentJourney from "@/components/StudentJourney";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ProgramHighlights />
      <ToolsSection />
      <StudentJourney />
      <Testimonials />
      <FinalCTA />
    </>
  );
}


import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

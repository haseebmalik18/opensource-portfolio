import Hero from "./components/Hero";
import ContributionFilter from "./components/ContributionFilter";
import ParticleBackground from "./components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Hero />
        <ContributionFilter />

        <footer className="footer">
          Built with Next.js • 2026
        </footer>
      </main>
    </>
  );
}

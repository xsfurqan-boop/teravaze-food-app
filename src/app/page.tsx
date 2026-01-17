import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar"
import { HeroBanner } from "@/components/home/HeroBanner"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner />

      <section className="container py-12 px-4">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Quick Cards Placeholder */}
          {['Fastest Delivery', 'Open Now', 'Top Rated', 'Free Shipping'].map((cat) => (
            <div key={cat} className="p-4 rounded-xl border bg-card hover:bg-accent cursor-pointer transition-colors">
              <p className="font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

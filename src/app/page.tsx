import { Navbar } from "@/components/layout/Navbar"
import HeroCarousel from "@/components/home/HeroCarousel"
import CategoryNav from "@/components/home/CategoryNav"
import SectionHeader from "@/components/home/SectionHeader"
import { MenuItem } from "@/components/menu/MenuItem"
import { MOCK_MENU } from "@/lib/mock-data"

export default function Home() {
  const categories = MOCK_MENU.restaurant.categories;

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-orange-500/30">
      <Navbar />
      <HeroCarousel />
      <CategoryNav />

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {categories.map((category) => {
          // Filter items for this category
          const categoryItems = MOCK_MENU.items.filter(item => item.category === category);

          if (categoryItems.length === 0) return null;

          return (
            <section key={category} id={category} className="pt-8 scroll-mt-32">
              <SectionHeader title={category} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

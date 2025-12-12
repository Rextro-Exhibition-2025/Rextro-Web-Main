import MobileApp from "@/components/Homepage/MobileApp";
import Footer from "@/components/Homepage/Footer";

export default function MobileAppPage() {
  return (
    <div className="font-[family-name:var(--font-instrument-sans)] pt-28 min-h-screen flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        <MobileApp />
      </div>
      <Footer />
    </div>
  );
}

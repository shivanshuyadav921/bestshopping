import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MachineShowcase = dynamic(() => import("@/components/MachineShowcase"), {
    ssr: true,
});

export default function MachinesPage() {
    return (
        <div className="min-h-screen bg-[#0c0c0e] text-white">
            <Header />
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <MachineShowcase />
            </main>
            <Footer />
        </div>
    );
}
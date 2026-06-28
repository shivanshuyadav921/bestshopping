import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ManufacturingGallery = dynamic(() => import('@/components/ManufacturingGallery'), {
  ssr: true,
});

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <ManufacturingGallery />
      </main>
      <Footer />
    </div>
  );
}
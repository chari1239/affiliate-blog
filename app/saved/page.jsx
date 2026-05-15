import { SavedProducts } from "@/components/saved-products";

export const metadata = {
  title: "Saved Picks"
};

export default function SavedPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Guest-friendly list</div>
        <h1 className="page-title">Save products now, add accounts later.</h1>
        <p className="page-intro">
          This page demonstrates the planned guest save flow: no login required for local saves,
          with a future path to Supabase-backed accounts for reviewing saved products across devices.
        </p>
      </header>
      <SavedProducts />
    </main>
  );
}

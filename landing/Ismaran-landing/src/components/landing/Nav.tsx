import logoAsset from "@/assets/ismaran.png.asset.json";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Ismaran" className="h-10 w-10 object-contain" />
        </a>
        <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#flashcards" className="transition hover:text-foreground">Flashcards</a>
          <a href="#quiz" className="transition hover:text-foreground">Quiz</a>
          <a href="#highlight" className="transition hover:text-foreground">Highlights</a>
        </div>
        <button className="rounded-full px-5 py-2 text-sm btn-glow hover:[--tw:0] hover:translate-y-[-2px] transition">
          Sign in
        </button>
      </div>
    </nav>
  );
}

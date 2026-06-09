import logoImg from "@/assets/ismaran.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 pb-12 pt-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <img src={logoImg} alt="Ismaran" className="h-14 w-14 object-contain opacity-90" />
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition">Product</a>
          <a href="#" className="hover:text-foreground transition">Pricing</a>
          <a href="#" className="hover:text-foreground transition">Research</a>
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © 2026 Ismaran. Elevate your learning.
        </p>
      </div>
    </footer>
  );
}

import logoAsset from "@/assets/ismaran.png";

export function Logo() {
  return (
    <a
      href="#hero"
      className="fixed left-6 top-6 z-50 flex items-center gap-2"
      aria-label="Ismaran"
    >
      <img src={logoAsset} alt="Ismaran" className="h-9 w-9 object-contain" />
    </a>
  );
}

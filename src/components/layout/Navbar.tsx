import IdentitySwitcher from '../ui/IdentitySwitcher';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-40 px-8 py-6 flex justify-between items-center pointer-events-none">
      <div className="font-heading font-black text-xl tracking-tighter text-primary uppercase pointer-events-auto mix-blend-difference">
        DSV.
      </div>
      <div className="pointer-events-auto">
        <IdentitySwitcher />
      </div>
    </nav>
  );
}

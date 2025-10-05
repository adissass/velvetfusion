import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
        <ul className="flex gap-6">
            <li><Link href="/">VelvetFusion</Link></li>
            <li><Link href="/personas">Personas</Link></li>
        </ul>
      
    </nav>
  );
}
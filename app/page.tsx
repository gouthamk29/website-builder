import { HomePage } from "@/components/HomePage/HomePage";
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-black home-scroll">
      <nav className=" h-10 hazard-bg  text-red-600 border-2 border-amber-50 flex items-center">
        <Link href='/editor' className="m-4 text-xl">Editor</Link>
      </nav>
      <HomePage/>
    </div>
  );
}

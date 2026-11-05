import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid grid-cols-2 gap-px py-0 sm:grid-cols-4">
        {[
          ["Drawn by", profile.name],
          ["Built with", "Next.js · TypeScript · Tailwind"],
          ["Revision", "A · Nov 2026"],
        ].map(([k, v]) => (
          <div key={k} className="py-5 pr-4">
            <p className="label !text-[10px]">{k}</p>
            <p className="mt-1 text-[13px] text-ink-2">{v}</p>
          </div>
        ))}
        <div className="flex items-end justify-start py-5 sm:justify-end">
          <Link href="/" className="label hover:!text-ink">
            © {new Date().getFullYear()} {profile.name}
          </Link>
        </div>
      </div>
    </footer>
  );
}

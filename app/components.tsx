"use client";
import Link from "next/link";
import { useState } from "react";

export function Logo() { return <Link href="/" className="logo" aria-label="Whimbr Studio home"><span className="logo-mark" aria-hidden="true">w</span><span>whimbr<span className="logo-dot">.</span></span></Link>; }
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell header-inner"><Logo/><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav"><span className="sr-only">Toggle menu</span><span/><span/></button><nav id="main-nav" className={open ? "nav open" : "nav"} aria-label="Main navigation"><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/blog">Blog</Link><Link href="/support" className="button small">Support</Link></nav></div></header>;
}
export function Footer() { return <footer><div className="shell footer-grid"><div><Logo/><p>Independent experiments in software, electronics, data and learning.</p></div><div><strong>Explore</strong><Link href="/projects">Projects</Link><Link href="/blog">Notes</Link><Link href="/support">Support</Link></div><div><strong>Studio</strong><Link href="/about">About</Link><a href="mailto:hello@whimbr.studio">hello@whimbr.studio</a></div></div><div className="shell fineprint"><span>© {new Date().getFullYear()} Whimbr Studio</span><span>Made with curiosity in Australia.</span></div></footer>; }
export function Page({ children }: { children: React.ReactNode }) { return <><Header/><main>{children}</main><Footer/></>; }
export function Arrow() { return <span aria-hidden="true">↗</span>; }

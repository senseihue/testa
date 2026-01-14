"use client"

import Link from "next/link"
import {Button} from "./button"
import {useAuthService} from "@features/auth";

const navLinks = [
  { href: "#@features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
]
import axios from 'axios'

type Post = {
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
}
export function Navbar() {

  const authService = useAuthService()
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-12 px-6 rounded-full bg-zinc-900/70 border border-zinc-800/50 backdrop-blur-md">
        <Link href="/public" className="font-display text-lg font-semibold text-zinc-100">
          <img src="/logo-white.svg" alt="" />
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-sm rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
          <Button
            // href="#pricing"
              onClick={authService.signIn}
            className="ml-2 px-4 py-1.5 text-sm rounded-full bg-zinc-100 text-zinc-900 font-medium hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}

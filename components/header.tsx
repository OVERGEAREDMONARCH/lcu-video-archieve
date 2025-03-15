import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Lead City University Logo"
            width={40}
            height={40}
            className="rounded-full bg-white p-1"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">Lead City University</span>
            <span className="text-xs text-primary-foreground">Video Archives</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium text-primary-foreground hover:text-white">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium text-primary-foreground hover:text-white">
            Categories
          </Link>
          <Link href="#" className="text-sm font-medium text-primary-foreground hover:text-white">
            About
          </Link>
          <Link href="#" className="text-sm font-medium text-primary-foreground hover:text-white">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  )
}


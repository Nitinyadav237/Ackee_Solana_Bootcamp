'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Coins } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'
import clsx from 'clsx'

type LinkItem = { label: string; path: string }

function NavLink({ label, path, onClick }: LinkItem & { onClick?: () => void }) {
  const pathname = usePathname()
  const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)

  return (
    <Link
      href={path}
      onClick={onClick}
      className={clsx(
        'transition-colors block',
        isActive
          ? 'text-primary font-medium'
          : 'text-muted-foreground hover:text-primary'
      )}
    >
      {label}
    </Link>
  )
}

export function AppHeader({ links = [] }: { links: LinkItem[] }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <header className="z-50 py-4 shadow-lg">
        <div className="flex justify-between items-center mr-6">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2 group" href="/">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 
                              flex items-center justify-center shadow-lg 
                              group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                               dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 
                               bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                FundCycle
              </span>
            </Link>

            <nav className="hidden md:flex items-center">
              <ul className="flex gap-6 items-center">
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink {...link} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Mobile menu button (Menu/X + ThemeSelect) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground relative z-60"
            onClick={() => setShowMenu((v) => !v)}
          >
            <div className="flex justify-center items-center gap-2">
              {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <ThemeSelect />
            </div>
          </Button>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <WalletButton size="sm" />
            <ClusterButton size="sm" />
            <ThemeSelect />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute top-[73px] left-0 right-0 bottom-0 bg-background">
            <div className="flex flex-col p-6 gap-6 h-full">
              {/* Navigation Links */}
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.path}>
                    <NavLink {...link} onClick={() => setShowMenu(false)} />
                  </li>
                ))}
              </ul>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3">
                <WalletButton />
                <ClusterButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  PlusCircle,
  Wallet,
  TrendingUp,
  UserCircle,
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'New Transaction',
    href: '/transactions/new',
    icon: PlusCircle,
  },
  {
    name: 'Accounts',
    href: '/accounts',
    icon: Wallet,
  },
  {
    name: 'Investments',
    href: '/investments',
    icon: TrendingUp,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: UserCircle,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold">
              ExpenseTracker
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.name}
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-2',
                        pathname === item.href
                          ? 'text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
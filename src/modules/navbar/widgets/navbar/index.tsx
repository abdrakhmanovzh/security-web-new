import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '@/shared/utils'
import { Button } from '@/shared/ui'
import { links } from '@/modules/navbar/lib'
import { isLinkActive } from '@/modules/navbar/utils'

export const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="absolute top-0 flex h-20 w-full items-center justify-between bg-white px-48 py-0 shadow-md">
      <ul className="hidden h-full items-center gap-8 lg:flex">
        {links.map((link) => (
          <li className="h-full" key={link.label}>
            <Link
              href={link.href}
              className={cn(
                'flex h-full items-center justify-center text-base text-black',
                isLinkActive(link.href, router) && 'border-b-2 border-black font-medium'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button text="ВЫЙТИ" className="w-fit px-3" />
    </nav>
  )
}

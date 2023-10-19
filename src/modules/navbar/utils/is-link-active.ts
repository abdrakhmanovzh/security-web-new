import { NextRouter } from 'next/router'

export const isLinkActive = (href: string, router: NextRouter) => {
  return router.pathname === href
}

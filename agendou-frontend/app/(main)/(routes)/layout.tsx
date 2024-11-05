import { getServerSession } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <div>
      {children}
    </div>
  )
}
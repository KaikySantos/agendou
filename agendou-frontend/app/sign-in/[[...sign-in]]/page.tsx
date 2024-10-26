import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            logoBox: 'justify-start',
            headerTitle: 'text-left',
            headerSubtitle: 'text-left',
            cardBox: 'my-4',
          },
        }}
      />
    </div>
  )
}

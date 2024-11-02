'use client'

import { useState } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { ArrowRightIcon } from '@radix-ui/react-icons'
import { ArrowLeft } from 'lucide-react'

const formSchema = zod
  .object({
    email: zod.string().email('Email inválido'),
    password: zod.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Indica que o erro está no campo confirmPassword
    message: 'As senhas precisam ser iguais',
  })

export function SignUpForm() {
  const [step, setStep] = useState<'email' | 'password'>('email')

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: zod.infer<typeof formSchema>) {
    console.log(data)
  }

  async function nextStep() {
    const emailIsValid = await form.trigger('email')
    if (emailIsValid) {
      setStep('password')
    }
  }

  function backStep() {
    form.setValue('password', '')
    form.setValue('confirmPassword', '')
    setStep('email')
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter' && step === 'email') {
      event.preventDefault()
      nextStep()
    }
  }

  return (
    <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          {step === 'email' && (
            <span>Enter your email below to create your account</span>
          )}

          {step === 'password' && (
            <span>Enter your password below to create your account</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
          >
            <div className="grid gap-4">
              {step === 'email' && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" className="w-full" onClick={nextStep}>
                    Next
                    <ArrowRightIcon />
                  </Button>
                </>
              )}

              {step === 'password' && (
                <>
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <Button type="button" variant="ghost" onClick={backStep}>
                        <ArrowLeft />
                        Return
                      </Button>
                      <Button type="submit" className="w-full">
                        Sign Up
                      </Button>
                    </div>
                  </>
                </>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
              .
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

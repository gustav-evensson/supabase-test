'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getServerClient } from '@/lib/supabase/server'
import { sign } from 'crypto'

export async function login(formData: FormData) {
  const supabase = getServerClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = getServerClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signout() {

  console.log('signout')

  const supabase = getServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log("error", error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/sign-in')
}
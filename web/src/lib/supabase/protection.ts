import { getServerClient } from '@/lib/supabase/server'

type serverArgs = {
  role: 'user' | 'admin' | 'moderator';
  blockAuth: boolean;
}

export const protectServer = async ({ role = 'user', blockAuth = false } : serverArgs) => {
  const supabase = getServerClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if(error) {
    return {
      props: {},
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    }
  }

  if(blockAuth && user) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
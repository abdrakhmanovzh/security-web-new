import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { AuthLayout } from '@/layouts'
import { Button, Header } from '@/shared/ui'
import { LoginForm } from '@/modules/auth/widgets'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const accessToken = req.cookies['access_token']

  if (accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <AuthLayout>
        <Header text="Вход" />
        <LoginForm />
      </AuthLayout>
    </>
  )
}

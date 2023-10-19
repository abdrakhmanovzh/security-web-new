import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Header } from '@/shared/ui'
import { AuthLayout } from '@/layouts'
import { RegisterForm } from '@/modules/auth/widgets'

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

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <AuthLayout>
        <Header text="Регистрация" />
        <RegisterForm />
      </AuthLayout>
    </>
  )
}

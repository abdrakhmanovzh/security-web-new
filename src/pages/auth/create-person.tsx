import { AuthLayout } from '@/layouts'
import { CreatePersonForm } from '@/modules/auth/widgets'
import { Header } from '@/shared/ui'
import Head from 'next/head'

export default function CreatePersonPage() {
  return (
    <>
      <Head>
        <title>Добавить пользователя</title>
      </Head>
      <AuthLayout className="py-12">
        <Header text="Добавить пользователя" />
        <CreatePersonForm />
      </AuthLayout>
    </>
  )
}

import { MainLayout } from '@/layouts'
import { ViolationDetails } from '@/modules/violation/widgets'
import { Header } from '@/shared/ui'
import Head from 'next/head'

export default function ViolationPage() {
  return (
    <>
      <Head>
        <title>Предмет</title>
      </Head>
      <MainLayout className="items-start justify-start pt-20">
        <main className="flex w-full flex-1 flex-col gap-6 px-4 pt-8 lg:px-48">
          <Header text="Нарушение" className="text-center text-3xl lg:text-start" />
          <div className="scrollbar-hide flex w-full flex-1 justify-between overflow-x-scroll">
            <ViolationDetails />
          </div>
        </main>
      </MainLayout>
    </>
  )
}

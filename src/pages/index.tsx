import Head from 'next/head'
import { Header } from '@/shared/ui'
import { MainLayout } from '@/layouts'
import { ViolationTable } from '@/modules/violation/widgets'

export default function Home() {
  return (
    <>
      <Head>
        <title>Запрещенные предметы</title>
      </Head>
      <MainLayout className="items-start justify-start pt-20">
        <main className="flex w-full flex-1 flex-col gap-6 px-4 py-8 lg:px-48">
          <Header
            text="Учет и контроль запрещенных предметов"
            className="text-center text-2xl lg:text-start"
          />
          <div className="scrollbar-hide w-full flex-1 overflow-x-scroll pb-20">
            <ViolationTable />
          </div>
        </main>
      </MainLayout>
    </>
  )
}

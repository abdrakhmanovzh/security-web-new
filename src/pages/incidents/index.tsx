import Head from 'next/head'
import { IncidentsTable } from '@/modules/incident/widgets'
import { MainLayout } from '@/layouts'
import { Header } from '@/shared/ui'

export default function IncidentsPage() {
  return (
    <>
      <Head>
        <title>Происшествия</title>
      </Head>
      <MainLayout className="items-start justify-start pt-20">
        <main className="flex w-full flex-1 flex-col gap-6 px-4 py-8 lg:px-48">
          <Header
            text="Учет, контроль и анализ происшествий"
            className="text-center text-2xl lg:text-start"
          />
          <div className="scrollbar-hide w-full flex-1 overflow-x-scroll">
            <IncidentsTable />
          </div>
        </main>
      </MainLayout>
    </>
  )
}

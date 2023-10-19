import Head from 'next/head'
import { CheckpointsTable } from '@/modules/checkpoint/widgets'
import { MainLayout } from '@/layouts'
import { Header } from '@/shared/ui'

export default function CheckpointsPage() {
  return (
    <>
      <Head>
        <title>КПП</title>
      </Head>
      <MainLayout className="items-start justify-start pt-20">
        <main className="flex w-full flex-1 flex-col gap-6 px-4 pt-8 lg:px-48">
          <Header
            text="Учет и контроль заступления сотрудников охранной службы на КПП"
            className="text-center text-2xl lg:text-start"
          />
          <div className="scrollbar-hide w-full flex-1 overflow-x-scroll">
            <CheckpointsTable />
          </div>
        </main>
      </MainLayout>
    </>
  )
}

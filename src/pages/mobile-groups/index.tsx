import { MainLayout } from '@/layouts'
import { MobileGroupsTable } from '@/modules/mobile-group/widgets'
import { Header } from '@/shared/ui'
import Head from 'next/head'

export default function MobileGroupsPage() {
  return (
    <>
      <Head>
        <title>Мобильные группы</title>
      </Head>
      <MainLayout className="items-start justify-start pt-20">
        <main className="flex w-full flex-1 flex-col gap-6 px-4 pt-8 lg:px-48">
          <Header
            text="Учет, контроль и анализ работы мобильных групп"
            className="text-center text-2xl lg:text-start"
          />
          <div className="scrollbar-hide w-full flex-1 overflow-x-scroll">
            <MobileGroupsTable />
          </div>
        </main>
      </MainLayout>
    </>
  )
}

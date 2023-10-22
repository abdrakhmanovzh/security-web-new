import { MainLayout } from '@/layouts'
import { MobileGroupDetails } from '@/modules/mobile-group/widgets'
import { Header } from '@/shared/ui'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Map = dynamic(
  () => import('@/modules/mobile-group/widgets/mobile-group-details/mobile-group-map'),
  { ssr: false }
)

export default function MobileGroupPage() {
  const router = useRouter()

  const { id } = router.query
  return (
    <>
      <Head>
        <title>Мобильная группа</title>
      </Head>
      <MainLayout className="items-start justify-start py-20">
        <main className="flex w-full flex-1 flex-col gap-6 px-4 pt-8 lg:px-48">
          <Header text="Мобильная группа" className="text-center text-3xl lg:text-start" />
          <div className="scrollbar-hide flex w-full flex-1 justify-between overflow-x-scroll">
            <MobileGroupDetails />
          </div>
          <div className="h-[500px] w-full">
            <Header text="Карта" className="text-әxl text-center lg:text-start" />
            <Map tripId={id as string} />
          </div>
        </main>
      </MainLayout>
    </>
  )
}

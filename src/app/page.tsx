import CaseDisplay from '@/components/CaseDisplay'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CaseDisplay />
      </main>
    </div>
  )
}

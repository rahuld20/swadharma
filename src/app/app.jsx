import { MainLayout } from '@/components/layouts'
import { AppProvider } from './provider'
import { AppRouter } from './router'

export default function App() {
  return (
    <AppProvider>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </AppProvider>
  )
}

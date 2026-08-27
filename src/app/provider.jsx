import { StoreProvider } from '@/stores/app-store'

/** Everything the whole tree needs — one place to add future providers. */
export function AppProvider({ children }) {
  return <StoreProvider>{children}</StoreProvider>
}

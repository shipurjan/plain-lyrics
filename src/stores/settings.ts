import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SettingsStore {
  apiKey: string
  setApiKey: (key: string) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (key) => {
        set({ apiKey: key })
      },
    }),
    {
      name: 'plain-lyrics-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

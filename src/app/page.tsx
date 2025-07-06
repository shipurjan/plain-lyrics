'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/input/input'
import { findSongFromUrl } from '@/lib/genius'
import { useSettingsStore } from '@/stores/settings'

export default function Home() {
  const router = useRouter()
  const { apiKey } = useSettingsStore()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError('')

    try {
      const result = await findSongFromUrl(url, apiKey)
      if (result) {
        // Navigate to lyrics page with query params
        const params = new URLSearchParams({
          id: result.id.toString(),
          title: result.title,
          artist: result.artist,
        })
        router.push(`/lyrics?${params.toString()}`)
      } else {
        setError(
          'Could not find song from this URL. Please check the URL format.',
        )
        setLoading(false)
      }
    } catch (err) {
      setError(
        'Error fetching song information. Please check your API key and try again.',
      )
      console.error('Error:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Plain Lyrics
        </h1>

        <form
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
          className="mb-8"
        >
          <div className="mb-4">
            <label
              htmlFor="url"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Genius.com URL
            </label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
              }}
              disabled={!apiKey || loading}
              className={`
                w-full rounded-md border border-gray-300 px-3 py-2
                focus:border-transparent focus:ring-2 focus:ring-blue-500
                focus:outline-none
                disabled:cursor-not-allowed disabled:bg-gray-100
              `}
              placeholder="https://genius.com/artist-song-title-lyrics"
            />
          </div>

          {!apiKey && (
            <div
              className={`
                mb-4 rounded-md border border-yellow-200 bg-yellow-50 p-4
              `}
            >
              <p className="text-sm text-yellow-800">
                Please set your Genius API key first.{' '}
                <Link
                  href="/settings"
                  className={`
                    font-medium text-blue-600
                    hover:text-blue-800
                  `}
                >
                  Go to Settings
                </Link>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!apiKey || !url.trim() || loading}
            className={`
              w-full rounded-md bg-blue-600 px-4 py-2 text-white
              hover:bg-blue-700
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              disabled:cursor-not-allowed disabled:bg-gray-400
            `}
          >
            {loading ? 'Loading...' : 'Get Lyrics'}
          </button>
        </form>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {apiKey && (
          <div className="text-center">
            <Link
              href="/settings"
              className={`
                text-sm text-gray-600
                hover:text-gray-800
              `}
            >
              Settings
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Genius.com URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
              }}
              disabled={!apiKey || loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="https://genius.com/artist-song-title-lyrics"
            />
          </div>

          {!apiKey && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                Please set your Genius API key first.{' '}
                <Link
                  href="/settings"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Go to Settings
                </Link>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={!apiKey || !url.trim() || loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Get Lyrics'}
          </button>
        </form>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {apiKey && (
          <div className="text-center">
            <Link
              href="/settings"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Settings
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

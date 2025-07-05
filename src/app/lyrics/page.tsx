'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQueryState } from 'nuqs'
import { getSong } from '@/lib/genius'
import { useSettingsStore } from '@/stores/settings'

interface SongDetails {
  id: number
  title: string
  artist: string
  url: string
  description?: string
}

export default function Lyrics() {
  const { apiKey } = useSettingsStore()
  const [songDetails, setSongDetails] = useState<SongDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Use nuqs to read query params
  const [songId] = useQueryState('id')
  const [fallbackTitle] = useQueryState('title')
  const [fallbackArtist] = useQueryState('artist')

  useEffect(() => {
    const fetchSongDetails = async () => {
      if (!songId || !apiKey) {
        setError('Missing song ID or API key')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await getSong(parseInt(songId), apiKey)

        setSongDetails({
          id: response.response.song.id,
          title: response.response.song.title,
          artist: response.response.song.primary_artist.name,
          url: response.response.song.url,
        })
      } catch (err) {
        console.error('Error fetching song details:', err)
        setError('Failed to fetch song details')

        // Use fallback data if available
        if (fallbackTitle && fallbackArtist) {
          setSongDetails({
            id: parseInt(songId),
            title: fallbackTitle,
            artist: fallbackArtist,
            url: `https://genius.com/songs/${songId}`,
          })
          setError('Using cached song data - some details may be unavailable')
        }
      } finally {
        setLoading(false)
      }
    }

    void fetchSongDetails()
  }, [songId, apiKey, fallbackTitle, fallbackArtist])

  if (!songId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Invalid Request
          </h1>
          <p className="text-gray-700 mb-4">No song ID provided.</p>
          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Search
          </Link>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">Loading song details...</div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {songDetails && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {songDetails.title}
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">
                by {songDetails.artist}
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Note:</strong> The Genius API provides song metadata
                  but not the full lyrics text.
                </p>
                <p className="text-sm text-blue-700">
                  For the complete lyrics, visit the original Genius page:
                </p>
                <a
                  href={songDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  View on Genius.com →
                </a>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Lyrics display functionality can be enhanced by implementing
                additional scraping or using other lyrics APIs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

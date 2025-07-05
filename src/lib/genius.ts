import {
  GeniusSearchResponse,
  GeniusSongResponse,
  ParsedGeniusUrl,
} from '@/types/genius'

export function parseGeniusUrl(url: string): ParsedGeniusUrl | null {
  try {
    const urlObj = new URL(url)

    if (!urlObj.hostname.includes('genius.com')) {
      return null
    }

    const pathParts = urlObj.pathname.split('/')
    const slug = pathParts[pathParts.length - 1]

    if (!slug.includes('-lyrics')) {
      return null
    }

    const parts = slug.replace('-lyrics', '').split('-')

    if (parts.length < 2) {
      return null
    }

    const artist = parts[0].replace(/([A-Z])/g, ' $1').trim()
    const title = parts
      .slice(1)
      .join(' ')
      .replace(/([A-Z])/g, ' $1')
      .trim()

    return {
      artist,
      title,
      slug: slug.replace('-lyrics', ''),
    }
  } catch {
    return null
  }
}

export async function searchGenius(
  query: string,
  apiKey: string,
): Promise<GeniusSearchResponse> {
  const geniusUrl = `https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=${apiKey}`

  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(geniusUrl)}`,
  )

  if (!response.ok) {
    throw new Error(`CORS proxy error: ${response.status.toString()}`)
  }

  const proxyData = (await response.json()) as {
    contents: string
    status: { http_code: number }
  }

  // Check if the proxy request was successful
  if (proxyData.status.http_code !== 200) {
    throw new Error(
      `Genius API error: ${proxyData.status.http_code.toString()}`,
    )
  }

  const geniusResponse = JSON.parse(proxyData.contents) as GeniusSearchResponse
  return geniusResponse
}

export async function getSong(
  songId: number,
  apiKey: string,
): Promise<GeniusSongResponse> {
  const geniusUrl = `https://api.genius.com/songs/${songId.toString()}?access_token=${apiKey}`

  const response = await fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(geniusUrl)}`,
  )

  if (!response.ok) {
    throw new Error(`CORS proxy error: ${response.status.toString()}`)
  }

  const proxyData = (await response.json()) as {
    contents: string
    status: { http_code: number }
  }

  // Check if the proxy request was successful
  if (proxyData.status.http_code !== 200) {
    throw new Error(
      `Genius API error: ${proxyData.status.http_code.toString()}`,
    )
  }

  const geniusResponse = JSON.parse(proxyData.contents) as GeniusSongResponse
  return geniusResponse
}

export async function findSongFromUrl(
  url: string,
  apiKey: string,
): Promise<{ id: number; title: string; artist: string } | null> {
  const parsed = parseGeniusUrl(url)

  if (!parsed) {
    return null
  }

  try {
    const searchQuery = `${parsed.artist} ${parsed.title}`
    const searchResult = await searchGenius(searchQuery, apiKey)

    if (searchResult.response.hits.length === 0) {
      return null
    }

    const song = searchResult.response.hits[0].result

    return {
      id: song.id,
      title: song.title,
      artist: song.primary_artist.name,
    }
  } catch (error) {
    console.error('Error finding song:', error)
    return null
  }
}

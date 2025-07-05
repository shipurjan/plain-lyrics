export interface GeniusSearchResponse {
  meta: {
    status: number
  }
  response: {
    hits: {
      result: {
        id: number
        title: string
        primary_artist: {
          name: string
        }
        url: string
      }
    }[]
  }
}

export interface GeniusSongResponse {
  meta: {
    status: number
  }
  response: {
    song: {
      id: number
      title: string
      primary_artist: {
        name: string
      }
      url: string
    }
  }
}

export interface ParsedGeniusUrl {
  artist: string
  title: string
  slug: string
}

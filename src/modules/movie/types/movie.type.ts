type ImdbId = string

export interface Movie {
  title: string
  rating: number
  releaseYear: number
  image: string
  description: string
  trailer: string
  genres: string[]
  authors: string[]
  writers: string[]
  id: ImdbId
  actors: string[]
  duration: number
  countries: string[]
}

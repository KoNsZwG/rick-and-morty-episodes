export interface IApiResponse {
  results: IApiResults[]
  info: IPageInfo
}

export interface IPageInfo {
  count: number
  pages: number
  next: string
  previous: null | string
}

export interface IApiResults {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface IEpisode extends IApiResults {
  characterImage: string | undefined
  isFavorite: boolean
  status: EpisodeStatus
}

export interface IEpisodeCharacterResponse {
  episode: string[]
  gender: string
  id: number
  image: string
  location: {
    name: string
    url: string
  }
  name: string
  origin: {
    name: string
    url: string
  }
  species: string
  status: string
  type: string
  url: string
}

export enum EpisodeStatus {
  Watched = 'watched',
  Unwatched = 'unwatched',
  Watching = 'watching'
}

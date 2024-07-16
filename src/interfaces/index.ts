export interface CharacterResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Answer {
  success: boolean;
  data: {
    results: CharacterResult[];
    info?:{
      count: number,
      pages: number,
      next: null | string,
      prev: null | string

    }
  } | null;
  message: string;
}

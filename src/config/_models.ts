export interface IResults {
  name: string;
  url: string;
}

export interface IPokedexRes {
  count: number;
  next: string;
  previous: string;
  results: IResults[];
}

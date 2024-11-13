export const getPokemonIndex = (url: string) => {
  return parseInt(url.split("/")[6]);
};

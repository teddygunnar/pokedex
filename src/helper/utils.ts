export const getPokemonIndex = (url: string) => {
  return parseInt(url.split("/")[6]);
};

export const color = {
  normal: "bg-gray-400 text-white",
  fighting: "bg-red-400 text-white",
  flying: "bg-sky-300 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-stone-500 text-white",
  rock: "bg-gray-600 text-white",
  bug: "bg-green-300 text-black",
  ghost: "bg-gray-800 text-white",
  steel: "bg-slate-500 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-400 text-white",
  grass: "bg-green-600 text-white",
  electric: "bg-yellow-500 text-white",
  physic: "bg-violet-400 text-white",
  ice: "bg-blue-300 text-black",
  dragon: "bg-red-700 text-white",
  dark: "bg-slate-800 text-white",
  fairy: "bg-green-200 text-black",
  stellar: "bg-yellow-200 text-black",
  unknown: "bg-gray-200 text-black",
};

export const typeColor = (val: string = "normal") => {
  return color[val as keyof typeof color] || color.normal;
};

export const statsTypography = (val: string) => {
  const statsTypology = {
    Hp: "HP",
    "Special-attack": "Special Attack",
    "Special-defense": "Special Defense",
  };

  return statsTypology[val as keyof typeof statsTypology] || val;
};

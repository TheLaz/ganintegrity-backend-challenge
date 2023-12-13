import { Address } from "./addresses.types";

export type CityMapProgress = 'init' | 'in-progress' | 'done';

export type CitiesAreaMap = Record<string, {
  status: CityMapProgress,
  cities: Address[]
}>;
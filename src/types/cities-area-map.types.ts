import { Address } from "./addresses.types";

export type CityMapProgress = 'init' | 'in-progress' | 'done';

export type CitiesAreaMap = Record<string, {
  distance: number;
  cities: Address[];
  status: CityMapProgress;
}>;
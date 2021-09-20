import { PaginatedRestaurants } from '.';

export type TCollection = {
  _id: string;
  description: string;
  name: string;
  sellers: PaginatedRestaurants;
};

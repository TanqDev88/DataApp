export interface Nationalize {
  count: number;
  name: string;
  country: Country[];
}

export interface Country {
  country_id: string;
  probability: number;
}

// types vehicules

export type APICars = {
  status: boolean;
  error: null;
  data: Datum[];
};

export type Datum = {
  id: number;
  name: string;
  price: string;
  location: Location;
  miles: number;
  fuelType: FuelType;
  transmission: Transmission;
  imageUrl: string;
  available: boolean;
  description: string;
  brand: string;
  imageGallery: ImageGallery[];
};

export enum FuelType {
  Bencina = "Bencina",
  Diesel = "Diesel",
}

export type ImageGallery = {
  imageUrl: string;
};

export enum Location {
  LasCondes = "Las Condes",
}

export enum Transmission {
  Automático = "Automático",
  Manual = "Manual",
  Mecánico = "Mecánico",
}

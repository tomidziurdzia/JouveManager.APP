export enum TypeSemiTrailer {
  Sider = "Sider",
  DropSide = "DropSide",
}

export interface CreateSemiTrailer {
  licensePlate?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  type?: TypeSemiTrailer;
}

export interface UpdateSemiTrailer {
  id: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  type?: TypeSemiTrailer;
}

export interface SemiTrailer {
  id: string;
  licensePlate?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  type?: TypeSemiTrailer;
}

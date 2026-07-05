export type WooCommerceTerm = {
  id: number;
  name: string;
  slug: string;
};

export type WooCommerceImage = {
  id: number;
  src: string;
  alt?: string;
};

export type WooCommerceProduct = {
  id: number;
  slug: string;
  name: string;
  permalink: string;
  short_description?: string;
  description?: string;
  prices: {
    price: string;
    currency_code?: string;
    currency_minor_unit?: number;
  };
  categories?: WooCommerceTerm[];
  tags?: WooCommerceTerm[];
  images?: WooCommerceImage[];
};

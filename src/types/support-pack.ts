export type SupportPackType = "donation" | "product" | "ticket" | "sponsor";

export type SupportPack = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: "EUR";
  type: SupportPackType;
  features: string[];
  isHighlighted: boolean;
  relatedFilmSlug?: string;
  wooProductId?: number;
  stripePriceId?: string;
  paypalPlanId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SupportPackInput = Omit<
  SupportPack,
  "id" | "createdAt" | "updatedAt"
>;

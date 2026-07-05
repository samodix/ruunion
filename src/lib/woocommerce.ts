import "server-only";
import { stripHtml, toNumber } from "@/lib/content-utils";
import { fetchLocalJson } from "@/lib/local-api";
import { getMockSupportPacks } from "@/lib/public-content";
import type { SupportPack, SupportPackType } from "@/types/support-pack";
import type { WooCommerceProduct } from "@/types/woocommerce";

const wooCommerceStoreApiUrl =
  process.env.WOOCOMMERCE_STORE_API_URL?.trim().replace(/\/$/, "");

export type WooSupportPacksResult = {
  packs: SupportPack[];
  source: "woocommerce" | "mock";
};

function packType(product: WooCommerceProduct): SupportPackType {
  const categories = (product.categories ?? []).map(
    (category) => category.slug,
  );
  if (categories.includes("billetterie")) return "ticket";
  if (categories.includes("mecenat")) return "sponsor";
  if (categories.includes("film")) return "product";
  return "donation";
}

export function normalizeWooProduct(product: WooCommerceProduct): SupportPack {
  const minorUnit = toNumber(product.prices.currency_minor_unit, 2);
  const divisor = 10 ** minorUnit;
  const categoryFeatures = (product.categories ?? []).map(
    (category) => `Catégorie : ${category.name}`,
  );
  const tagFeatures = (product.tags ?? []).map((tag) => tag.name);
  const markerSlugs = new Set(
    [...(product.categories ?? []), ...(product.tags ?? [])].map(
      (term) => term.slug,
    ),
  );

  return {
    id: String(product.id),
    slug: product.slug,
    title: stripHtml(product.name),
    description:
      stripHtml(product.short_description || product.description) ||
      "Pack de soutien RU Union.",
    price: toNumber(product.prices.price) / divisor,
    currency: "EUR",
    type: packType(product),
    features: [...categoryFeatures, ...tagFeatures],
    isHighlighted:
      markerSlugs.has("populaire") ||
      markerSlugs.has("mis-en-avant") ||
      product.slug === "soutien-solidaire",
    wooProductId: product.id,
  };
}

export async function getWooStoreProducts(): Promise<WooCommerceProduct[]> {
  if (!wooCommerceStoreApiUrl) return [];
  return fetchLocalJson<WooCommerceProduct[]>(
    `${wooCommerceStoreApiUrl}/products?per_page=100`,
  );
}

async function mockPacksResult(): Promise<WooSupportPacksResult> {
  return { packs: await getMockSupportPacks(), source: "mock" };
}

export async function getWooSupportPacksWithSource(): Promise<WooSupportPacksResult> {
  if (!wooCommerceStoreApiUrl) return mockPacksResult();
  try {
    return {
      packs: (await getWooStoreProducts()).map(normalizeWooProduct),
      source: "woocommerce",
    };
  } catch {
    return mockPacksResult();
  }
}

export async function getWooSupportPacks(): Promise<SupportPack[]> {
  return (await getWooSupportPacksWithSource()).packs;
}

export async function getWooProductBySlug(
  slug: string,
): Promise<SupportPack | null> {
  return (
    (await getWooSupportPacks()).find((product) => product.slug === slug) ??
    null
  );
}

export async function createWooCheckoutUrl(
  productIdOrSlug: number | string,
): Promise<string | null> {
  void productIdOrSlug;
  // Aucun checkout n'est actif : les paiements réels restent hors périmètre.
  return null;
}

export const getWooProducts = getWooStoreProducts;
export const getWooCommerceProducts = getWooStoreProducts;

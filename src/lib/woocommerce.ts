import "server-only";
import { getMockSupportPacks } from "@/lib/public-content";
import type { SupportPack } from "@/types/support-pack";
import type { WooCommerceProduct } from "@/types/woocommerce";

const wooCommerceStoreApiUrl = process.env.WOOCOMMERCE_STORE_API_URL?.trim();
const wooCommerceApiUrl = process.env.WOOCOMMERCE_API_URL?.trim();
const wooCommerceConfigured = Boolean(
  wooCommerceStoreApiUrl || wooCommerceApiUrl,
);

function toWooProduct(pack: SupportPack, index: number): WooCommerceProduct {
  return {
    id: pack.wooProductId ?? index + 1,
    slug: pack.slug,
    name: pack.title,
    price: String(pack.price),
    permalink: `/boutique#${pack.slug}`,
  };
}

/** Adaptateur mock : aucun appel WooCommerce réel n'est exécuté pour l'instant. */
export async function getWooProducts(): Promise<WooCommerceProduct[]> {
  const packs = await getMockSupportPacks();
  if (!wooCommerceConfigured) return packs.map(toWooProduct);
  // TODO : lire /wc/store/products côté serveur, sans clé, pour le catalogue public.
  return packs.map(toWooProduct);
}

export async function getWooProductBySlug(
  slug: string,
): Promise<WooCommerceProduct | null> {
  return (
    (await getWooProducts()).find((product) => product.slug === slug) ?? null
  );
}

export async function getWooSupportPacks(): Promise<SupportPack[]> {
  if (!wooCommerceConfigured) return getMockSupportPacks();
  // TODO : mapper les produits des catégories Soutien, Film et Mécénat.
  return getMockSupportPacks();
}

export async function createWooCheckoutUrl(
  productIdOrSlug: number | string,
): Promise<string | null> {
  void productIdOrSlug;
  // TODO : créer une URL de panier/checkout WooCommerce côté serveur.
  return null;
}

export const getWooCommerceProducts = getWooProducts;

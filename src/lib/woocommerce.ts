import "server-only";
import { getMockSupportPacks } from "@/lib/public-content";
import type { SupportPack } from "@/types/support-pack";
import type { WooCommerceProduct } from "@/types/woocommerce";

const wooCommerceApiUrl = process.env.WOOCOMMERCE_API_URL?.trim();

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
  if (!wooCommerceApiUrl) return packs.map(toWooProduct);
  // TODO : appeler /products côté serveur après configuration des identifiants.
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
  if (!wooCommerceApiUrl) return getMockSupportPacks();
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

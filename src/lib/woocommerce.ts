import type { WooCommerceProduct } from "@/types/woocommerce";

// LOT 8 : aucune requête WooCommerce n'est exécutée dans le socle initial.
export async function getWooCommerceProducts(): Promise<WooCommerceProduct[]> {
  return [];
}

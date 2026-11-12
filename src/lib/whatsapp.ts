import { siteConfig } from "@/config/site";
import type { Design } from "@/data/types";

export function whatsappLink(message: string = siteConfig.whatsappDefaultMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function designEnquiryMessage(design: Pick<Design, "ref" | "name">) {
  return `Hello Ruhaniat Studio, I liked design ${design.ref} (${design.name}) and would like to know more about custom stitching.`;
}

export function categoryEnquiryMessage(categoryName: string) {
  return `Hello Ruhaniat Studio, I am interested in your ${categoryName} and would like to discuss custom stitching.`;
}

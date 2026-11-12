import type { Metadata } from "next";
import { ButtonLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      title="This page has slipped off the hanger"
      intro="The page you are looking for doesn't exist. Let's get you back to our designs."
    >
      <div className="mt-9 flex justify-center">
        <ButtonLink href="/collections">Browse Collections</ButtonLink>
      </div>
    </PageHero>
  );
}

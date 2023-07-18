import React from "react";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import Eye from "@strapi/icons/Eye";
import { LinkButton } from "@strapi/design-system/LinkButton";

const PreviewLink = () => {
  const { initialData } = useCMEditViewDataManager();
  if (!initialData.slug) return null;

  const previewUrl = `${process.env.STRAPI_ADMIN_CLIENT_FRONTEND_URL}/api/preview?secret=${process.env.STRAPI_ADMIN_CLIENT_PREVIEW_SECRET}&slug=${initialData.slug}`;

  return (
    <LinkButton
      size="S"
      startIcon={<Eye />}
      style={{ width: "100%" }}
      href={previewUrl}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      title="page preview"
    >
      Preview
    </LinkButton>
  );
};

export default PreviewLink;

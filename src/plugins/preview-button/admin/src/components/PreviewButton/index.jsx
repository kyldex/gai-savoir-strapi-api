import React, { useEffect, useState } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import Eye from '@strapi/icons/Eye';
import { LinkButton } from '@strapi/design-system/LinkButton';

const PreviewLink = () => {
  const { modifiedData } = useCMEditViewDataManager();
  const subcategoryId = modifiedData.subcategory?.[0]?.id;
  const [slugs, setSlugs] = useState({
    post: modifiedData.slug,
    category: null,
    subcategory: null,
  });

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      if (subcategoryId === undefined) return;

      try {
        const subcategoryResponse = await fetch(
          `${process.env.STRAPI_ADMIN_CLIENT_API_URL}/subcategories/${subcategoryId}?populate=category`
        );
        const subcategoryData = await subcategoryResponse.json();
        setSlugs((slugs) => ({
          ...slugs,
          category:
            subcategoryData.data.attributes.category.data.attributes.slug,
          subcategory: subcategoryData.data.attributes.slug,
        }));
      } catch (error) {
        console.error('Error fetching subcategory data:', error);
      }
    };

    fetchSubcategoryData();
  }, [subcategoryId]);

  if (!slugs.post || !slugs.category || !slugs.subcategory) {
    return (
      <LinkButton
        disabled
        size="S"
        startIcon={<Eye />}
        style={{ width: '100%', textDecoration: 'none' }}
        href=""
        variant="secondary"
        title="page preview"
      >
        Missing Preview Info
      </LinkButton>
    );
  }

  const previewUrl =
    `${process.env.STRAPI_ADMIN_CLIENT_FRONTEND_URL}/api/preview?` +
    `secret=${process.env.STRAPI_ADMIN_CLIENT_PREVIEW_SECRET}` +
    `&post-slug=${slugs.post}` +
    `&category-slug=${slugs.category}` +
    `&subcategory-slug=${slugs.subcategory}`;

  return (
    <LinkButton
      size="S"
      startIcon={<Eye />}
      style={{ width: '100%', textDecoration: 'none' }}
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

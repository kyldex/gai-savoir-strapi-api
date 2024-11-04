type Args = {
  contentTypeItemId: number;
  contentTypeItemSlug: string;
  contentTypeItemPublishedAt: string;
  contentTypeItemDatabaseQuery: string;
  contentTypeItemDefaultCategory: string;
};

// Enbale Next.js ISR for a given published content type.
// Make a request to Next.js app revalidate API endpoint.
const revalidateFrontEndPage = async ({
  contentTypeItemId,
  contentTypeItemSlug,
  contentTypeItemPublishedAt,
  contentTypeItemDatabaseQuery,
  contentTypeItemDefaultCategory,
}: Args): Promise<void> => {
  // Next.js ISR only works if the content type item has already been published.
  if (!contentTypeItemPublishedAt) {
    console.log(
      `Skipping Next.js ISR for unpublished content type item: ${contentTypeItemSlug}`
    );
    return;
  }

  // Fetch the content type item with subcategory populated.
  const contentTypeItem = await strapi.db
    .query(contentTypeItemDatabaseQuery)
    .findOne({
      where: { id: contentTypeItemId },
      // Only populate the subcategory, as category is directly in the content type item.
      populate: ['subcategory'],
    });

  const slug = contentTypeItem.slug;
  const categorySlug = contentTypeItem.category || contentTypeItemDefaultCategory;
  const subcategorySlug = contentTypeItem.subcategory?.slug;

  const webhookUrl =
    `${process.env.STRAPI_ADMIN_CLIENT_FRONTEND_URL}/api` +
    `/revalidate?slug=${slug}&category=${categorySlug}&subcategory=${subcategorySlug}` +
    `&secret=${encodeURIComponent(process.env.REVALIDATE_SECRET)}`;

  // Trigger the webhook.
  try {
    const response = await global.fetch(webhookUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to trigger webhook:', response.statusText);
    } else {
      console.log('Webhook triggered successfully:', webhookUrl);
    }
  } catch (error) {
    console.error('Failed to trigger webhook:', error);
  }
};

export default revalidateFrontEndPage;

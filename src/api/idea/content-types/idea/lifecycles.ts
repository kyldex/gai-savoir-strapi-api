const ARTICLE_DEFAULT_CATEGORY = 'articles';

export default {
  async afterUpdate(event) {
    const { result } = event;

    // Fetch the idea with subcategory populated.
    const idea = await strapi.db.query('api::idea.idea').findOne({
      where: { id: result.id },
      // Only populate the subcategory, as category is directly in idea.
      populate: ['subcategory'],
    });

    const ideaSlug = idea.slug;
    const categorySlug = idea.category || ARTICLE_DEFAULT_CATEGORY;
    const subcategorySlug = idea.subcategory?.slug;

    const webhookUrl =
      `${process.env.STRAPI_ADMIN_CLIENT_FRONTEND_URL}/api` +
      `/revalidate?slug=${ideaSlug}&category=${categorySlug}&subcategory=${subcategorySlug}` +
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
  },
};

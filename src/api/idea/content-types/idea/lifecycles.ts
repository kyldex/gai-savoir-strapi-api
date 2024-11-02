const fetch = require('node-fetch');

// Remove fetch polyfill dependency after upgrading to Node 18.
global.fetch = fetch;

const ARTICLE_DEFAULT_CATEGORY = 'articles';

export default {
  // Enbale Next.js ISR for a given published article.
  // Make a request to Next.js app revalidate API endpoint after being updated.
  async afterUpdate(event) {
    const { result } = event;

    // Next.js ISR only works if the article has already been published.
    if (!result.publishedAt) {
      console.log(`Skipping Next.js ISR for unpublished article: ${result.slug}`);
      return;
    }

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

import revalidateFrontEndPage from '../../../../shared/services/revalidateFrontEndPage';

const ARTICLE_DEFAULT_CATEGORY = 'articles';

export default {
  async afterUpdate(event) {
    const { result } = event;
    revalidateFrontEndPage({
      contentTypeItemId: result.id,
      contentTypeItemSlug: result.slug,
      contentTypeItemPublishedAt: result.publishedAt,
      contentTypeItemDatabaseQuery: 'api::idea.idea',
      contentTypeItemDefaultCategory: ARTICLE_DEFAULT_CATEGORY
    });
  }
};

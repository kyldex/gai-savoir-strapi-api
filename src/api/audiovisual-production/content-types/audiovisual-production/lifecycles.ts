import revalidateFrontEndPage from '../../../../shared/services/revalidateFrontEndPage';

const ARTICLE_DEFAULT_CATEGORY = 'production-audiovisuelle';

export default {
  async afterUpdate(event) {
    const { result } = event;
    revalidateFrontEndPage({
      contentTypeItemId: result.id,
      contentTypeItemSlug: result.slug,
      contentTypeItemPublishedAt: result.publishedAt,
      contentTypeItemDatabaseQuery:
        'api::audiovisual-production.audiovisual-production',
      contentTypeItemDefaultCategory: ARTICLE_DEFAULT_CATEGORY
    });
  }
};

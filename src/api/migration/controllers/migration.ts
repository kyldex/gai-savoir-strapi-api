const find = async (ctx) => {
  try {
    // Fetch migration history, ordered by the execution date.
    const migrations = await strapi.db
      .query('api::migration.migration')
      .findMany({
        orderBy: { executed_at: 'desc' },
      });

    ctx.send(migrations);
  } catch (error) {
    ctx.throw(500, 'Error fetching migrations');
  }
};

export default {
  find,
};

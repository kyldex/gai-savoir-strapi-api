export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Migration script.
    // Add the `category` field to ideas, with a default value set to `articles`.
    async function setDefaultCategoryForIdeas() {
      // Check if the migration has already been executed.
      const migrationExists = await strapi.db
        .query('api::migration.migration')
        .findOne({
          where: { name: 'setDefaultCategoryForIdeas' },
        });

      if (migrationExists) {
        console.log('Migration "setDefaultCategoryForIdeas" already done.');
        return;
      }

      // Start migration
      const ideas = await strapi.db.query('api::idea.idea').findMany();
      for (const idea of ideas) {
        if (!idea.category) {
          await strapi.db.query('api::idea.idea').update({
            where: { id: idea.id },
            data: { category: 'articles' },
          });
        }
      }

      // Add a flag to indicate that the migration has been executed
      await strapi.db.query('api::migration.migration').create({
        data: {
          name: 'setDefaultCategoryForIdeas',
          executed_at: new Date(),
        },
      });

      console.log(
        'Migration done : category field added to ideas.'
      );
    }

    await setDefaultCategoryForIdeas();
  },
};

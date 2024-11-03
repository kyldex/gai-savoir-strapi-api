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
    // Add the `category` field to AV productions, with a default value set to `production-audiovisuelle`.
    async function setDefaultCategoryForAVProductions() {
      // Check if the migration has already been executed.
      const migrationExists = await strapi.db
        .query('api::migration.migration')
        .findOne({
          where: { name: 'setDefaultCategoryForAVProductions' },
        });

      if (migrationExists) {
        console.log('Migration "setDefaultCategoryForAVProductions" already done.');
        return;
      }

      // Start migration
      const audiovisualProductions = await strapi.db.query('api::audiovisual-production.audiovisual-production').findMany();
      for (const audiovisualProduction of audiovisualProductions) {
        if (!audiovisualProduction.category) {
          await strapi.db.query('api::audiovisual-production.audiovisual-production').update({
            where: { id: audiovisualProduction.id },
            data: { category: 'production-audiovisuelle' },
          });
        }
      }

      // Add a flag to indicate that the migration has been executed
      await strapi.db.query('api::migration.migration').create({
        data: {
          name: 'setDefaultCategoryForAVProductions',
          executed_at: new Date(),
        },
      });

      console.log(
        'Migration done : category field added to audiovisual productions.'
      );
    }

    await setDefaultCategoryForAVProductions();
  },
};

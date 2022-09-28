const CommonResponses = require('./common/commonResponses');

/**
 * Service Controller
 */
class ServiceController {
    constructor() {
        this.common = new CommonResponses();
    }

    /**
     * runs migration for available migration files
     * @params request, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    async migrateUp(request, response) {
        const execSync = require('child_process').execSync;

        const migrate = () => {
            return new Promise((resolve, reject) => {
                try {
                    execSync('node_modules/.bin/sequelize db:migrate', {
                        stdio: 'inherit',
                    });
                    resolve('OK');
                } catch (e) {
                    reject(e);
                }
            });
        };

        migrate()
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }
}

module.exports = ServiceController;

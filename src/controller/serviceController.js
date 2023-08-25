const CommonResponses = require('./common/commonResponses');
const { User } = require('../database/models');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');

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
    async initialize(request, response) {
        const execSync = require('child_process').execSync;

        const install = () => {
            return new Promise((resolve, reject) => {
                try {
                    execSync('node_modules/.bin/sequelize db:migrate', {
                        stdio: 'inherit',
                    });

                    execSync('node_modules/.bin/sequelize db:seed:all', {
                        stdio: 'inherit',
                    });

                    User.create({
                        name: 'admin',
                        email: 'fake@admin.mail',
                        password_hash: bcrypt.hashSync('admin', 10),
                    });

                    return () =>
                        response
                            .status(200)
                            .json(User.findOne({ where: { name: 'admin' } }));
                } catch (e) {
                    reject(e);
                }
            });
        };

        User.findAndCountAll()
            .then(
                this.common.customSuccess(
                    response,
                    'Application already initialized'
                )
            )
            .catch(install());
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

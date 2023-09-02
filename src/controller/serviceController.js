const CommonResponses = require('./common/commonResponses');
const { User } = require('../database/models');
const bcrypt = require('bcrypt');

/**
 * Service Controller
 */
class ServiceController {
    constructor() {
        this.common = new CommonResponses();
    }

    /**
     * runs migration for available migration files
     * @params request, response
     * @return response
     */
    async install(request, response) {
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

        const installedModules = require('../config/checkModules');
        if (installedModules.includes('user')) {
            const { Sequelize } = require('sequelize');
            const dbconfig = require('../config/database');
            let sequelize = new Sequelize(dbconfig.development);

            sequelize
                .authenticate()
                .then(() => {
                    User.findAndCountAll()
                        .then(
                            this.common.customSuccess(
                                response,
                                'Application already initialized'
                            )
                        )
                        .catch(install());
                })
                .catch(this.common.serverError(response));
        } else {
            response.status(200).json({
                message: 'Application requires manual database setup.',
            });
        }
    }

    /**
     * runs migration for available migration files
     * @params request, response
     * @return response
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

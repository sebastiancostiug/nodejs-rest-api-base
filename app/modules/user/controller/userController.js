const ControllerCommon = require('../../../controller/common/controllerCommon');
const { User } = require('../../../database/models');
const bcrypt = require('bcrypt');

/**
 * User Controller
 */
class UserController {
    constructor() {
        this.common = new ControllerCommon();
    }

    /**
     * Creates the given entity in the database
     * @params request, res
     * returns database insertion status
     */
    async create(request, response) {
        const { name, email, password } = request.body;

        let password_hash, token;

        if (password) {
            password_hash = bcrypt.hashSync(password, 10);
        } else {
            token = '';
        }

        await User.create({
            name: name,
            email: email,
            password_hash: password_hash || null,
            token: token || null,
        })
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    async findAll(response) {
        await User.findAll()
            .then(this.common.findSuccess(response))
            .catch(this.common.findError(response));
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params request, res
     * @return entity
     */
    async findById(request, response) {
        let id = request.params.id;

        await User.findOne({ where: { id: id } })
            .then(this.common.findSuccess(response))
            .catch(this.common.findError(response));
    }

    /**
     * Updates the given entity in the database
     * @params request, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    async update(request, response) {
        await User.update(
            {
                name: request.body.name,
            },
            {
                where: {
                    id: request.params.id,
                },
            }
        )
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }

    /**
     * Deletes an entity using its Id / Primary Key
     * @params request, res
     * returns database deletion status
     */
    async deleteById(request, response) {
        await User.destroy({
            where: {
                id: request.params.id,
            },
        })
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }
}

module.exports = UserController;

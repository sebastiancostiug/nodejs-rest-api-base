/* Load User Data Access Object */
const UserDao = require('../dao/userDao');

/* Load Controller Common function */
const ControllerCommon = require('../../../controller/common/controllerCommon');

/* Load User entity */
const User = require('../model/user');

/**
 * User Controller
 */
class UserController {
    constructor() {
        this.userDao = new UserDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params request, res
     * @return entity
     */
    findById(request, response) {
        let id = request.params.id;

        this.userDao
            .findById(id)
            .then(this.common.findSuccess(response))
            .catch(this.common.findError(response));
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(response) {
        this.userDao
            .findAll()
            .then(this.common.findSuccess(response))
            .catch(this.common.findError(response));
    }

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(response) {
        this.userDao
            .countAll()
            .then(this.common.findSuccess(response))
            .catch(this.common.serverError(response));
    }

    /**
     * Updates the given entity in the database
     * @params request, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(request, response) {
        let user = new User();
        user.id = request.body.id;
        user.name = request.body.name;
        user.email = request.body.email;
        user.password = request.body.password;
        user.progress = request.body.progress;
        user.instances = request.body.instances;

        return this.userDao
            .update(user)
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }

    /**
     * Creates the given entity in the database
     * @params request, res
     * returns database insertion status
     */
    create(request, response) {
        let user = new User();
        if (request.body.id) {
            user.id = request.body.id;
        }
        user.name = request.body.name;
        user.email = request.body.email;
        user.password = request.body.password;
        user.progress = request.body.progress;
        user.instances = request.body.instances;

        if (request.body.id) {
            return this.userDao
                .createWithId(user)
                .then(this.common.editSuccess(response))
                .catch(this.common.serverError(response));
        } else {
            return this.userDao
                .create(user)
                .then(this.common.editSuccess(response))
                .catch(this.common.serverError(response));
        }
    }

    /**
     * Deletes an entity using its Id / Primary Key
     * @params request, res
     * returns database deletion status
     */
    deleteById(request, response) {
        let id = request.params.id;

        this.userDao
            .deleteById(id)
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params request, res
     * @return
     */
    exists(request, response) {
        let id = request.params.id;

        this.userDao
            .exists(id)
            .then(this.common.existsSuccess(response))
            .catch(this.common.findError(response));
    }
}

module.exports = UserController;

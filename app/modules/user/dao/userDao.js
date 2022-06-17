/* Load User entity */
const User = require('../model/user');

/* Load DAO Common functions */
const daoCommon = require('../../../dao/common/daoCommon');

/**
 * User Data Access Object
 */
class UserDao {
    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByCredentials(params) {
        let sqlRequest = '';
        let sqlParams = {};
        if (params.token) {
            sqlRequest =
                'SELECT id, name, email, pass_hash, pass_reset_token, token, role, progress, instances FROM user WHERE token=$token';
            sqlParams = { $token: params.token };
        } else if (params.email && params.password) {
            sqlRequest =
                'SELECT id, name, email, pass_hash, pass_reset_token, token, role, progress, instances FROM user WHERE email=$email AND pass_hash=$passwordHash';
            sqlParams = {
                $email: params.email,
                $passwordHash: params.password,
            };
        }
        return {
            request: sqlRequest,
            params: sqlParams,
            req: params,
        };
        // return this.common
        //     .findOne(sqlRequest, sqlParams)
        //     .then(
        //         (row) =>
        //             new User(
        //                 row.id,
        //                 row.name,
        //                 row.email,
        //                 row.pass_hash,
        //                 row.pass_reset_token,
        //                 row.token,
        //                 row.role,
        //                 row.progress,
        //                 row.instances
        //             )
        //     );
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest =
            'SELECT id, name, email, password, progress, instances FROM user WHERE id=$id';
        let sqlParams = { $id: id };
        return this.common
            .findOne(sqlRequest, sqlParams)
            .then(
                (row) =>
                    new User(
                        row.id,
                        row.name,
                        row.email,
                        row.password,
                        row.progress,
                        row.instances
                    )
            );
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = 'SELECT * FROM user';
        return this.common.findAll(sqlRequest).then((rows) => {
            let users = [];
            for (const row of rows) {
                users.push(
                    new User(
                        row.id,
                        row.name,
                        row.email,
                        row.password,
                        row.progress,
                        row.instances
                    )
                );
            }
            return users;
        });
    }

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = 'SELECT COUNT(*) AS count FROM user';
        return this.common.findOne(sqlRequest);
    }

    /**
     * Updates the given entity in the database
     * @params user
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(User) {
        let sqlRequest =
            'UPDATE user SET ' +
            'name=$name, ' +
            'email=$email, ' +
            'password=$password, ' +
            'progress=$progress' +
            'instances=$instances' +
            'WHERE id=$id';

        let sqlParams = {
            $name: User.name,
            $email: User.email,
            $password: User.password,
            $progress: User.progress,
            $instances: User.instances,
            $id: User.id,
        };
        return this.common.run(sqlRequest, sqlParams);
    }

    /**
     * Creates the given entity in the database
     * @params User
     * returns database insertion status
     */
    create(User) {
        let sqlRequest =
            'INSERT into user (name, email, password, progress, instances) ' +
            'VALUES ($name, $email, $password, $progress, $instances)';
        let sqlParams = {
            $name: User.name,
            $email: User.email,
            $password: User.password,
            $progress: User.progress,
            $instances: User.instances,
        };
        return this.common.run(sqlRequest, sqlParams);
    }

    /**
     * Creates the given entity with a provided id in the database
     * @params User
     * returns database insertion status
     */
    createWithId(User) {
        let sqlRequest =
            'INSERT into user (id, name, email, password, progress, instances) ' +
            'VALUES ($id, $name, $email, $password, $progress, $instances)';
        let sqlParams = {
            $id: User.id,
            $name: User.name,
            $email: User.email,
            $password: User.password,
            $progress: User.progress,
            $instances: User.instances,
        };
        return this.common.run(sqlRequest, sqlParams);
    }

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = 'DELETE FROM user WHERE id=$id';
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    }

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest =
            'SELECT (count(*) > 0) as found FROM user WHERE id=$id';
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    }
}

module.exports = UserDao;

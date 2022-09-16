const CommonResponses = require('../../../controller/common/commonResponses');
const { User, Token } = require('../../../database/models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth/authentication');
const jwt = require('jsonwebtoken');

/**
 * User Controller
 */
class UserController {
    constructor() {
        this.common = new CommonResponses();
    }

    /**
     * create
     * Creates the given entity in the database
     * @params request, response
     * @return database insertion status
     */
    async create(request, response) {
        const { name, email, password } = request.body;

        let password_hash = bcrypt.hashSync(password, 10);

        await User.create({
            name: name,
            email: email,
            password_hash: password_hash,
        })
            .then(this.common.editSuccess(response))
            .catch(this.common.serverError(response));
    }

    /**
     * login
     * Logs the user in
     * @params request, response
     * @return json {accessToken, refreshToken, expiresIn}
     */
    async login(request, response) {
        const { email, password } = request.body;
        if ((email, password)) {
            await User.findOne({ where: { email: email } })
                .then((user) => {
                    if (bcrypt.compareSync(password, user.password_hash)) {
                        const accessToken = generateToken({ user: user.id });
                        const refreshToken = generateToken(
                            { user: user.id },
                            true
                        );

                        Token.create({
                            value: refreshToken,
                            user_id: user.id,
                        });

                        return response.status(200).json({
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            secondsValid: process.env.ACCESS_TOKEN_EXPIRATION,
                        });
                    }

                    return response.status(403).json({ message: 'Forbbiden' });
                })
                .catch(this.common.serverError(response));
        } else {
            return response.status(401).json({ message: 'Unauthorized' });
        }
    }

    /**
     * refresh
     * refreses access token
     * @params request, response
     * @return json {accessToken, refreshToken, expiresIn}
     */
    async refresh(request, response) {
        const authHeader = request.headers['authorization'];
        const refreshToken = authHeader && authHeader.split(' ')[1];
        console.log(refreshToken);
        if (!refreshToken)
            return response.status(401).json({ message: 'Unauthorized' });

        await Token.findOne({ where: { value: refreshToken } }).then(
            (token) => {
                jwt.verify(
                    token.value,
                    process.env.REFRESH_TOKEN_SECRET,
                    (error, user) => {
                        if (error)
                            return response
                                .status(403)
                                .json({ message: 'Forbbiden' });

                        const accessToken = generateToken({ user: user.id });

                        return response.status(200).json({
                            accessToken: accessToken,
                            secondsValid: process.env.ACCESS_TOKEN_EXPIRATION,
                        });
                    }
                );
            }
        );
    }

    /**
     * logout
     * deletes the current user's refresh token
     */
    async logout(request, response) {
        await Token.destroy({
            where: {
                value: request.params.token,
            },
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

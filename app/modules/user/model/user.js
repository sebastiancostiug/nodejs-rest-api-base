/**
 * User Entity (ES6 Class)
 */

class User {
    constructor(
        id,
        name,
        email,
        pass_hash,
        pass_reset_token,
        token,
        role,
        progress,
        instances
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pass_hash = pass_hash;
        this.pass_reset_token = pass_reset_token;
        this.token = token;
        this.role = role;
        this.progress = progress;
        this.instances = instances;
    }
}

module.exports = User;

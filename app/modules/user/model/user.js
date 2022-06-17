/**
 * User Entity (ES6 Class)
 */

class User {
    constructor(id, name, email, password, progress, instances) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.progress = progress;
        this.instances = instances;
    }
}

module.exports = User;

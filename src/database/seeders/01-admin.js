const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: uuidv4(),
                    name: 'admin',
                    email: 'fake@admin.mail',
                    password_hash: bcrypt.hashSync('admin', 10),
                    role: 'admin',
                    active: 1,
                    createdAt: Sequelize.fn('NOW'),
                    updatedAt: Sequelize.fn('NOW'),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};

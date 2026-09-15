const registerUserSchema = {
    name: {
        required: true,
        maxLength: 100,
        minLength: 3,
        type: 'string'
    },

    email: {
        required: true,
        maxLength: 100,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    password: {
        required: true
    }
};

module.exports = {
    registerUserSchema
};
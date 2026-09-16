class UserValidator {
    validateRegister(data) {
        const {
            email,
            first_name,
            last_name,
            password
        } = data;

        const errors = [];

        if (
            typeof email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            errors.push({field: 'email', error: 'Email format is invalid.'});
        }

        if (
            typeof first_name !== 'string' ||
            !/^[A-Za-zÀ-ÿ' -]+$/.test(first_name.trim())
        ) {
            errors.push({field: 'first_name', error: 'First name format is invalid.'});
        }

        if (
            typeof last_name !== 'string' ||
            !/^[A-Za-zÀ-ÿ' -]+$/.test(last_name.trim())
        ) {
            errors.push({field: 'last_name', error: 'Last name format is invalid.'});
        }

        if (
            typeof password !== 'string' ||
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
        ) {
            errors.push({
                field: 'password', 
                error: 'Password must be at least 8 characters and include uppercase, lowercase, and a number.'
            });
        }

        return errors;
    }

    validateLogin(data) {
        const errors = [];
        
        if (
            typeof data.email !== 'string' ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
        ) {
            errors.push({
                field: 'email',
                error: 'Email format is invalid.'
            });
        }

        if (
            typeof data.password !== 'string' ||
            data.password.length < 8
        ) {
            errors.push({
                field: 'password',
                error: 'Password must be at least 8 characters.'
            });
        }

        return errors;
    }
}

module.exports = new UserValidator();
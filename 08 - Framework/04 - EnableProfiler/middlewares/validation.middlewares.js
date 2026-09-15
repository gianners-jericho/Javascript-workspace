// middleware/validate.js

function validate(schema, data) {
    const errors = {};

    for (const field in schema) {
        const rules = schema[field];
        const value = data[field];

        if (rules.required && (value === undefined || value === null || value === '')) {
            errors[field] = 'This field is required.';
            continue;
        }

        if (value === undefined || value === null) {
            continue;
        }

        if (rules.type) {
            const actualType = Array.isArray(value) ? 'array' : typeof value;

            if (actualType !== rules.type) {
                errors[field] = `Expected ${rules.type}.`;
                continue;
            }
        }

        if (rules.minLength && value.length < rules.minLength) {
            errors[field] = `Must be at least ${rules.minLength} characters.`;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            errors[field] = `Must be at most ${rules.maxLength} characters.`;
        }

        if (rules.min !== undefined && value < rules.min) {
            errors[field] = `Must be at least ${rules.min}.`;
        }

        if (rules.max !== undefined && value > rules.max) {
            errors[field] = `Must be at most ${rules.max}.`;
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            errors[field] = rules.message || 'Invalid format.';
        }

        if (rules.validate && !rules.validate(value)) {
            errors[field] = rules.message || 'Invalid value.';
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

function validationMiddleware(schema, source = 'body') {
    return (req, res, next) => {
        const result = validate(schema, req[source]);

        if (!result.valid) {
            return res.status(400).json({
                message: 'Validation failed.',
                errors: result.errors
            });
        }

        next();
    };
}

module.exports = {
    validate,
    validationMiddleware
};
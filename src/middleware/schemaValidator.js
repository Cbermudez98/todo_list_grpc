const validateSchema = schema => {
    return (request) => {
        const { error } = schema.validate(request);
        if (error) {
            return false;
        }
        return true;
    };
};

module.exports = validateSchema;
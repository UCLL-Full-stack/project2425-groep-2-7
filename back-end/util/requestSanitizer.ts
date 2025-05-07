// utils/sanitizeRequest.ts

export const sanitizeRequestBody = (reqBody: any): any => {
    const sanitizedBody = { ...reqBody };

    // List of sensitive fields you want to redact or remove
    const sensitiveFields = ['email', 'password'];

    sensitiveFields.forEach(field => {
        if (sanitizedBody[field]) {
            sanitizedBody[field] = '[REDACTED]';
        }
    });

    return sanitizedBody;
};

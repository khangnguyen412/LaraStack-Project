/* eslint-disable */

/**
 * Parse a object containing field -> array/string to Record<string, string>
 * 
 * @param obj - Object with field name as key and message as value.
 * @returns Object with field name as key and message as value.
 */
const parseFieldObject = (obj: Record<string, any>): Record<string, string> => {
    const result: Record<string, string> = {};
    Object.entries(obj).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
            result[field] = messages.join(', ');
        } else if (typeof messages === 'string') {
            result[field] = messages;
        } else {
            result[field] = String(messages);
        }
    });
    return result;
};

/**
 * Convert API error to an object with per-field error messages.
 * Supports multiple error formats:
 * - String error
 * - Object with `errors` key: `{ errors: { field: ["msg"] } }`
 * - Object with direct field keys: `{ field: ["msg"] }`
 * - Object with `message` key: `{ message: "..." }`
 *
 * @param error - Error object from API or string.
 * @returns Object with key as field name, value as message string. A special key "general" is used for non-field-specific errors.
 *
 * @example
 * // Format 1: Nested errors object
 * // Input: { errors: { email: ["User not found"] } }
 * // Output: { email: "User not found" }
 *
 * @example
 * // Format 2: Direct field errors (no 'errors' wrapper)
 * // Input: { username: ["User not found"] }
 * // Output: { username: "User not found" }
 *
 * @example
 * // Format 3: Message string
 * // Input: { message: "Invalid password" }
 * // Output: { general: "Invalid password" }
 *
 * @example
 * // Format 4: Plain string
 * // Input: "Network Error"
 * // Output: { general: "Network Error" }
 */
export const ErrorHandler = (error: any): Record<string, string> => {
    if (!error) return {};

    if (typeof error === 'string') {
        return { general: error };
    }

    if (error.errors) {
        if (typeof error.errors === 'object' && !Array.isArray(error.errors)) {
            return parseFieldObject(error.errors);
        }

        // If errors is a string or array of strings, return a general error
        if (typeof error.errors === 'string') {
            return { general: error.errors };
        }
        if (Array.isArray(error.errors)) {
            return { general: error.errors.join(', ') };
        }
    }

    if (typeof error === 'object' && !Array.isArray(error)) {
        const hasFieldError = Object.values(error).some(
            v => (Array.isArray(v) && v.length > 0 && typeof v[0] === 'string') || typeof v === 'string'
        );
        if (hasFieldError) {
            return parseFieldObject(error);
        }
    }

    // If API returns { message: "..." }
    if (error.message && typeof error.message === 'string') {
        return { general: error.message };
    }

    // Fallback: convert object to string error
    try {
        return { general: JSON.stringify(error) };
    } catch {
        return { general: 'Đã xảy ra lỗi không xác định' };
    }
}

/**
 * Format error message to a simple string for display (for Alert component)
 */
export const formatErrorMessage = (error: any): string => {
    const fieldErrors = ErrorHandler(error);
    if (fieldErrors.general) return fieldErrors.general;
    // If no general error, return all field errors as a single string
    return Object.values(fieldErrors).join('; ') || 'Lỗi không xác định';
};
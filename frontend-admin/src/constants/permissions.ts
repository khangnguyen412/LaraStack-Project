export const PERMISSIONS = {
    USER: {
        CREATE: 'CREATE_USER',
        READ: 'READ_USER',
        UPDATE: 'UPDATE_USER',
        DELETE: 'DELETE_USER',
    }, 
    ROLE: {
        CREATE: 'CREATE_ROLE',
        READ: 'READ_ROLE',
        UPDATE: 'UPDATE_ROLE',
        DELETE: 'DELETE_ROLE',
    },
    PERMISSION: {
        CREATE: 'CREATE_PERMISSION',
        READ: 'READ_PERMISSION',
        UPDATE: 'UPDATE_PERMISSION',
        DELETE: 'DELETE_PERMISSION',
    },
} as const;
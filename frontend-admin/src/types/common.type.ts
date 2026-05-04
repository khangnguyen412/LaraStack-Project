/**
 * Type
 */
export type PaginationAntType = {
    current: number;
    perPage: number;
    total?: number;
}

/**
 * Request Type
 * Send form react to laravel controller
 */
export type PaginationRequestType = {
    currentPage?: number;
    perPage?: number;
}

/**
 * Pagination Meta Type
 * Receive from laravel controller
 */
export type PaginationResponseType = {
    current_page?: number;
    per_page?: number;
    total?: number;
}


/**
 * Axios Mock Adapter
 */
import AxiosMockAdapter from 'axios-mock-adapter';
import { API } from '@/api/axios';

/**
 * Mock API
 */
// import { faker } from '@faker-js/faker';

/**
 * Mock Permission API
 */
import { mockGetPermissionByID } from './permission/permission.mocks';

export const setupMockServer = () => {
    const mock = new AxiosMockAdapter(API, { delayResponse: 400 });

    /**
     * Mock API
     */
    mockGetPermissionByID(mock);

    mock.onAny().passThrough();
}
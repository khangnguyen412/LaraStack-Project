/**
 * Faker
 */
import { faker } from '@faker-js/faker';

/**
 * Axios
 */
import type MockAdapter from 'axios-mock-adapter';
import type { AxiosRequestConfig } from 'axios';

export const mockGetPermissionByID = (mock: MockAdapter) => {
    mock.onGet(new RegExp('/admin/permissions/\\d+')).reply((config: AxiosRequestConfig) => {
        const id = config.url?.split('/').pop() || faker.string.uuid();
        const res = {
            data: {
                id,
                name: faker.person.fullName(),
                description: faker.lorem.sentence(),
                description_editor: `
                    <h1>${faker.lorem.sentence()}</h1>
                    <p>${faker.lorem.sentence()}</p>
                `,
            },
        }
        return [200, res];
    });
}
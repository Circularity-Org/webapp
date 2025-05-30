/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommonService {
    /**
     * Healthcheck
     * @returns string Successful Response
     * @throws ApiError
     */
    public static healthcheckHealthcheckGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/healthcheck',
        });
    }
}

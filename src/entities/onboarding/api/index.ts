import { ApiClient } from "../../../core/api/apiClient";

export function startMollieOAuth2Api(apiClient: ApiClient = new ApiClient()) {
    return async () => {
        const res = await apiClient.get<{ authorizationUri: string }>("/mollie/auth/url");
        console.log(res);
        return res;
    };
}
export function getMollieOAuth2AccessTokenApi(apiClient: ApiClient = new ApiClient()) {
    return async (code: string) => {
        const res = await apiClient.get<unknown>("/mollie/auth/token", { code });
        console.log(res);
        return res;
    };
}

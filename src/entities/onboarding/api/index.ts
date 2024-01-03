import { ApiClient } from "../../../core/api/apiClient";

export function startMollieAuthApi(apiClient: ApiClient = new ApiClient()) {
    return async () => {
        const res = await apiClient.get<any>("/auth");
        console.log(res);
        return res;
    };
}

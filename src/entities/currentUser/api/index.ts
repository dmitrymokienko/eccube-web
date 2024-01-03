import { ApiClient } from "../../../core/api/apiClient";
import { IUser } from "../types";
import { IUpdateUserDto } from "../types/dto";

// TODO: update path
export async function getUserInfoApi() {
    const apiClient = new ApiClient();
    const res = await apiClient.get<IUser>("/v0/user/info");
    return res;
}

export async function updateUserApi(data: IUpdateUserDto) {
    const apiClient = new ApiClient();
    const res = await apiClient.put<IUpdateUserDto, IUser>("/v1/user/update", data);
    return res;
}

export async function deleteUserApi() {
    const apiClient = new ApiClient();
    const res = await apiClient.delete("/v0/user/delete");
    return res;
}

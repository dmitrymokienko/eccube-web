import { defaultApiClient } from "../../../core/api/apiClient";
import { IUser } from "../types";
import { IUpdateUserDto } from "../types/dto";

// TODO: update path
export async function getUserInfoApi() {
    const res = await defaultApiClient.get<IUser>("/v0/user/info");
    return res;
}

export async function updateUserApi(data: IUpdateUserDto) {
    const res = await defaultApiClient.put<IUpdateUserDto, IUser>("/v1/user/update", data);
    return res;
}

export async function deleteUserApi() {
    const res = await defaultApiClient.delete("/v0/user/delete");
    return res;
}

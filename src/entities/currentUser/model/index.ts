import { combine, createEffect, createEvent, createStore } from "effector";
import { IUser } from "../types";
import { deleteUserApi, getUserInfoApi, updateUserApi } from "../api";
import { Nullable } from "../../../shared/types";

const $info = createStore<Nullable<IUser>>(null);
const setInfo = createEvent<Nullable<IUser>>();
const fetchInfoFx = createEffect(getUserInfoApi);
$info.on(setInfo, (_, v) => v).on(fetchInfoFx.doneData, (_, v) => v);

const updateFx = createEffect(updateUserApi);
const deleteFx = createEffect(deleteUserApi);

const $isLoading = combine(
    fetchInfoFx.pending,
    updateFx.pending,
    deleteFx.pending,
    (fetch, update, _delete) => fetch || update || _delete
);

// TODO: add snackbar notifications
// sample({
//   clock: updateFx.doneData,
//   target: showNotificationFx({
//     uiMessage: 'Your profile has been update',
//     type: 'success',
//   }),
// })

export const currentUser = {
    $info,
    setInfo,
    fetchInfoFx,
    updateFx,
    $isLoading,
};

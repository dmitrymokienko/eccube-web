import { useEffect } from "react";
import { ApiClient } from "./apiClient";

// stub
const session = {};

export function useApiClient() {
    const apiClient = new ApiClient();

    useEffect(() => {
        const requestInterceptor = apiClient.instance.interceptors.request.use(
            (config) => {
                const accessToken = session?.data?.backendTokens?.accessToken ?? "";
                if (!config.headers.Authorization && accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseInterceptor = apiClient.instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response?.status === 401 && !prevRequest.send) {
                    prevRequest.send = true;
                    await fetch(`${process.env.VITE_APP_BACKEND_BASE_URL}/v1/auth/refresh`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Refresh ${session?.data?.backendTokens?.refreshToken}`,
                        },
                    });
                    prevRequest.headers.Authorization = `Bearer ${session?.data?.backendTokens?.accessToken}`;
                    return apiClient.instance(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            apiClient.instance.interceptors.request.eject(requestInterceptor);
            apiClient.instance.interceptors.response.eject(responseInterceptor);
        };
    }, [session]);

    return apiClient;
}

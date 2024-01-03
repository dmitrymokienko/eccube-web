import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";

export const backendBaseURL = (): string => import.meta.env.REACT_APP_BACKEND_BASE_URL;

type ApiConfig = CreateAxiosDefaults<any>;

export class ApiClient {
    public instance: AxiosInstance;

    protected createClient(apiConfiguration: ApiConfig): AxiosInstance {
        const { baseURL, responseType, headers } = apiConfiguration;
        return axios.create({
            baseURL: baseURL ?? backendBaseURL(), // process.env.REACT_APP_BACKEND_BASE_URL,
            responseType: responseType ?? ("json" as const),
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            //   timeout: 10 * 1000,
        });
    }

    constructor(apiConfiguration: ApiConfig = {}) {
        this.instance = this.createClient(apiConfiguration);
    }

    public async get<TResponse>(path: string): Promise<TResponse> {
        try {
            const response = await this.instance.get<TResponse>(path);
            return response.data;
        } catch (err) {
            this.handleError(err as AxiosError);
        }
        return {} as TResponse;
    }

    public async post<TRequest, TResponse>(
        path: string,
        payload: TRequest,
        config?: AxiosRequestConfig<any>
    ): Promise<TResponse> {
        try {
            const response = await this.instance.post<TResponse>(path, payload, config);
            return response.data;
        } catch (err) {
            this.handleError(err as AxiosError);
        }
        return {} as TResponse;
    }

    public async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
        try {
            const response = await this.instance.put<TResponse>(path, payload);
            return response.data;
        } catch (err) {
            this.handleError(err as AxiosError);
        }
        return {} as TResponse;
    }

    public async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
        try {
            const response = await this.instance.patch<TResponse>(path, payload);
            return response.data;
        } catch (err) {
            this.handleError(err as AxiosError);
        }
        return {} as TResponse;
    }

    public async delete<TResponse>(path: string): Promise<TResponse> {
        try {
            const response = await this.instance.delete<TResponse>(path);
            return response.data;
        } catch (err) {
            this.handleError(err as AxiosError);
        }
        return {} as TResponse;
    }

    protected handleError(error: AxiosError): void {
        if (error.response) {
            // Request made and server responded
            const { data, status } = error.response;
            console.error(`Error status:: ${status}, data:: ${data}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(`Error request:: ${error.request}`);
        }
        // Something happened in setting up the request that triggered an Error
        console.error(`Error message:: ${error.message}`);
    }
}

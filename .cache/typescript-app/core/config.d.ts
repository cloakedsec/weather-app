export type EnvName = "prod" | "test" | "local";
export type Config = {
    app: {
        env: EnvName;
        name: string;
        origin: string;
        hostname: string;
    };
    firebase: {
        projectId: string;
        appId: string;
        apiKey: string;
        authDomain: string;
        measurementId: string;
    };
};
export declare const configs: any;
export declare const config: Config;

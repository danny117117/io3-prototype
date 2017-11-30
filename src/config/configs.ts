import {InjectionToken} from "@angular/core";

export interface AppConfig {
    apiAddress: string
}

export const rony: AppConfig = {
    apiAddress: 'http://192.168.12.28/WebAPIProtoType/Api/Polcom'
};
export const qaEnv: AppConfig = {
    apiAddress: ''
};

export let APP_CONFIG = new InjectionToken<AppConfig>('configs');
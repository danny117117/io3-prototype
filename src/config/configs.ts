import {InjectionToken} from "@angular/core";
export interface AppConfig {
    apiAddress: string
    apiNode: string
}
export const rony: AppConfig = {
    apiAddress: 'http://192.168.12.28/WebAPIProtoType/Api/Polcom',
    apiNode: 'http://localhost:8080/'
};
export const danny: AppConfig = {
    apiAddress: 'http://192.168.12.74/WebAPIProtoType/Api/Polcom',
    apiNode: 'http://192.168.12.155:8080/'

};

export let APP_CONFIG = new InjectionToken<AppConfig>('configs');
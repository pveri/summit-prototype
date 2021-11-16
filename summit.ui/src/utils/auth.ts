import axios, { AxiosInstance } from 'axios' // REV1 remove axios?
import { AuthDTO } from '@/dto' // eslint-disable-line
import { UserManager } from 'oidc-client'
import { CookieStorage } from 'cookie-storage';

export const httpInstance = axios.create();

export class SummitAuth {
    // the authObj will be stored in state storage as well as
    // a cookie for single-signon
    // private authObj: AuthDTO;
    // private settings: Oidc.UserManagerSettings;
    private userManager: UserManager;
    private cookieStorage: CookieStorage;

    constructor (config: Oidc.UserManagerSettings, storage: CookieStorage) {
        this.userManager = new UserManager(config);
        this.cookieStorage = storage;
    }

    async getUser() {
        return await this.userManager.getUser()
    }

    async GetToken(): Promise<string> {
        let token: string = null;

        token = this.cookieStorage.getItem("access_token");
        // TODO: This can be removed/refactored
        if (token==null) { // REV1
            const user = await this.userManager.getUser().catch( 
                                (err) => {
                                            console.log(`put redirect logic here ${err}`)
                                        } ); // REV1

            if (user) {
                token = user.access_token;
                this.cookieStorage.setItem("access_token", token);
            }
            else {
                throw new Error("Failed to fetch token")
            } 
        }
        if (this.IsTokenValid(token)) { //REV1 this needs to do something
            return token;
        }
        return null;
    }

    public SetAxiosAuth(bearer: string, instance: AxiosInstance): void {
        instance.interceptors.request.use(
            config => {
                config.headers.common['Authorization'] = `Bearer ${bearer}`;
                return config;
            },
            error => Promise.reject(`Error in Axios config ${error}`)
        );

        instance.interceptors.response.use(
            response => response,
            error => Promise.reject(error)
          )
    }

    public get UserManager(): UserManager {
        return this.userManager;
    }


    private IsTokenValid (token: string): boolean {
        //throw new Error(`Must Implement ${token}`);
        return true;
    } 


}

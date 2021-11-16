import { UserManagerSettings, WebStorageStateStore } from 'oidc-client'
import { AuthDTO } from '@/dto' // eslint-disable-line
import { CookieStorage } from 'cookie-storage'
import axios from 'axios'

export const SummitStorage = new CookieStorage();

export class ConfigHelper {

    private configPath: string;
    
    constructor () {
        this.configPath = `${window.location.origin}/config/configuration.json`; //REV1
    }
    /* eslint-disable */
    async GetAuthConfig (): Promise<UserManagerSettings> {
        const data = await this.GetConfig();

        const userManagerSetting = {
            
            userStore: new WebStorageStateStore({ store: SummitStorage}),
            authority: data["OIDC_AUTHORITY"],
            client_id: data["OIDC_CLIENT"],
            redirect_uri: data["OIDC_SIGNIN"],
            post_logout_redirect_uri: data["OIDC_SIGNIN"],
            scope: data["OIDC_SCOPE"],
            response_type: "code",
        }
        return userManagerSetting;
    }
    /* eslint-enable */
    async GetConfig(): Promise<object> {
        const headers = {
            'Accept': 'application/json',
            'ResponseType': 'application/json',
            'Cache-Control': 'no-store'
          }

        const response = await axios.get(this.configPath, { headers }).catch(() => {
            return Promise.reject(new Error("Failure fetching configuration"));
        });
        return response.data;
    }

}

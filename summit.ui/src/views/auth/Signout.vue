
<script lang="ts">

import {
	Component,
	Vue
} from "vue-property-decorator";
import { Action, Getter } from 'vuex-class'
import { CookieStorage } from 'cookie-storage'
import { ConfigHelper, SummitAuth } from '@/utils'
import { SummitStorage } from '@/utils'
@Component({})
export default class Signout extends Vue {
   @Getter getIdentityToken
   @Getter getCurrentUser
   private config: ConfigHelper = new ConfigHelper();
   private userManager: SummitAuth;
   // private cookieStorage =  new CookieStorage();
   /* eslint-disable*/
   /*private userManager = new UserManager({ userStore: new WebStorageStateStore({ store: this.cookieStorage }), 
                                            response_mode: "query"}); 
    /*eslint-enable*/
   async mounted (): Promise<void> {
       let settings = await this.config.GetAuthConfig();
       settings = {...{response_mode: "query"}, ...settings};
       this.userManager = new SummitAuth(settings, SummitStorage);
       debugger
       SummitStorage.removeItem('access_token'); //REV1 revoke first
       await this.userManager.UserManager.signoutRedirect({ 'id_token_hint': this.getCurrentUser.id_token });

   }
}

</script>
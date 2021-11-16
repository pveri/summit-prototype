
<script lang="ts">

import {
	Component,
	Vue
} from "vue-property-decorator";

import { CookieStorage } from 'cookie-storage'
import { ConfigHelper, SummitAuth } from '@/utils'
import { SummitStorage } from '@/utils'
@Component({})
export default class Signin extends Vue {
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
       await this.userManager.UserManager.signinCallback().then( async (res) => {
           await this.userManager.GetToken();
           this.$root.$emit('successfulLogin');
           this.$router.push('/'); //REV1
       }).catch(() => {
           this.userManager.UserManager.signinRedirect();
       })
   }
}

</script>
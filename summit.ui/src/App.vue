<template>
	<v-app id="app">
		<Header />
		<v-main v-if="(this.isSignIn || this.isLoggedIn) && !this.isLoadingData">
			<!-- <v-breadcrumbs style="display:block" :items="testItems"></v-breadcrumbs> -->

			<v-fade-transition>
				<div class="loading-container" v-show="showLoadingContainer">
					<div class="loading__content">
						<v-progress-circular color="primary" size="50" indeterminate />
						<div class="loading-msg" v-if="!isSignoutRoute">Loading Dashboard</div>
					</div>
				</div>
			</v-fade-transition>
			<router-view/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import {
	Component,
	Vue,
	Mixins
} from "vue-property-decorator";

import { Action, Getter } from 'vuex-class'

import { RunsMixin } from '@/mixins'
import Header from "@/components/Header.vue";
import { SummitAuth, ConfigHelper, SummitStorage } from '@/utils'
import { httpInstance } from '@/utils/auth'
@Component({
	mixins: [RunsMixin],
	components: {
		Header
	}
})
export default class App extends Mixins(Vue, RunsMixin) {

	@Getter getIdentityToken
	@Action setCurrentUser
	@Action setIdentityToken
	@Action setPartItems
	@Action setCalibrationTypes
	@Action setPartTypes
	@Action setProcessStatuses
	@Action setParts

	readonly name: string = "app";
	private currentUser: Oidc.User;
	private isLoadingData = true;
	// Todo: temporary
	private isSignoutRoute = false;
	private get showLoadingContainer(): boolean {
		return false;
	}

	/************************************/

	private authManager!: SummitAuth;
	private configManager = new ConfigHelper();

	created (): void {
		this.$root.$on('successfulLogin', async () => await this.storeToken());
	}

	async mounted () {
		this.isLoadingData = true;
		this.authManager = new SummitAuth(await this.configManager.GetAuthConfig(), SummitStorage);
		
		await this.storeToken();

		if (!this.isLoggedIn && !this.isSignIn) {
			await this.authManager.UserManager.signinRedirect();
		}
		await this.loadData();
	}

	private get isLoggedIn(): boolean {
		return this.getIdentityToken != null;
	}

	private async storeToken() {
		if (!this.isLoggedIn) {
			await this.authManager.GetToken().then( async (res) => {
				this.setIdentityToken(res);
				this.authManager.SetAxiosAuth(res, httpInstance);
				this.currentUser = await this.authManager.getUser();
				this.setCurrentUser(this.currentUser);
			}).catch(err => {
				console.log(err);
			})
		}
	}

	private get isSignIn() {
		return this.$route?.name?.toLowerCase() == 'sign in' //REV1
	}

	// This may seem overkill for now
	private async loadData(): Promise<void> {
		await Promise.all([this.fetchPartItems(),
							this.fetchCalibrationTypes(),
							this.fetchPartTypes(),
							this.fetchProcessStatuses(),
							this.fetchParts()
						])
						.then( () => this.isLoadingData = false);
	}

	private async fetchPartItems (): Promise<void> {
		const items = await this.getAllParts();
		if (items) {
			this.setPartItems(items);
		}
	}

	private async fetchCalibrationTypes () {
		const items = await this.getAllCalibrationTypes();
		this.setCalibrationTypes(items);
	}

	private async fetchPartTypes () {
		const items = await this.getAllPartTypes();
		this.setPartTypes(items);
	}

	private async fetchProcessStatuses () {
		const items = await this.getAllProcessStatuses();
		this.setProcessStatuses(items);
	}

	private async fetchParts() {
		const items = await this.getAllPartNumbers();
		if (items) {
			this.setParts(items);
		}
	}
}
</script>

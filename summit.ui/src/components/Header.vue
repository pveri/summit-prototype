<template>
	<v-app-bar app color="dark-grey" dark height="100px">
		<slot name="extension" />
		<v-row>
			<v-col :cols="2">
				<div class="d-flex align-center">
					<v-img
						alt=" logo"
						class="shrink mr-2"
						contain
						src="@/assets/images/-logo.png"
						transition="scale-transition"
					/>
				</div>
			</v-col>
			<v-col style="padding-bottom:0px" :align-self="'end'">
				<!--Issue 01-->
				<v-tabs left background-color="transparent">
					<v-tab to="/">Home</v-tab>
					<v-tab to='/runs'>Runs</v-tab>
					<!--<v-tab to="/calibrations">Calibrations</v-tab>-->
					<v-tab to="/parts">Parts</v-tab>
					<v-tab to="/visualization">Visualization</v-tab>
				</v-tabs>
			</v-col>
			
			<v-col>
        <v-spacer></v-spacer>
        <div style="float:right;">
				<v-menu bottom left :offset-x="offsetx">
					<template v-slot:activator="{ on, attrs }">
						<v-btn icon bottom v-bind="attrs" v-on="on">
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-card>
						<v-list nav>
							<v-list-item-group v-model="selectedItem">
								<v-list-item v-for="(item, i) in items" :key="i" @click="navigateTo({path: item.to})">
									<v-list-item-icon>
										<v-icon v-text="item.icon"></v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title v-text="item.text"></v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-card>
				</v-menu>
        </div>
			</v-col>
		</v-row>
	</v-app-bar>
</template>
<script lang="ts">

import {
	Component,
	Vue,
	Mixins
} from "vue-property-decorator";

import { WebUtilityMixin } from '@/mixins'

@Component({
	mixins: [WebUtilityMixin]
})
export default class extends Mixins(Vue, WebUtilityMixin) {
	private items: Array<Record<string, any>> = [ // REV1 
		{ text: "Settings", to: "", icon: "mdi-cog" },
		{ text: "Api Docs", to: "",  icon: "mdi-tools" },
		{ text: "Sign out", to: "/signout",  icon: "mdi-account-arrow-right" }
	];
  private offsetx: boolean = true;
	private selectedItem: number = 1;
}
</script>

<style lang="scss" scoped>
header {
	display: block;
}
</style>

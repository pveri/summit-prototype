<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Procedure
            </v-card-title>
            <v-card-text>
                <dl class="row mb-0">
                    <dt class="col-sm-4">Status</dt>
                    <dd class="col-sm-7">
                        <span class="badge badgerun_procedure.status_badge_class "> {{ runProcedureInfo.procedurInfo.status }} </span></dd>

                    <dt class="col-sm-4">Procedure</dt>
                    <dd class="col-sm-7"> {{ runProcedureInfo.procedurInfo.procedure }} </dd>

                    <dt class="col-sm-4">Started</dt>
                    <dd class="col-sm-7"> {{ runProcedureInfo.procedurInfo.createdDate }} </dd>

                    <dt class="col-sm-4">Updated</dt>
                    <dd class="col-sm-7"> {{ runProcedureInfo.procedurInfo.updateDate }} </dd>

                    <dt class="col-sm-4">Completed</dt>
                    <dd class="col-sm-7"> {{ runProcedureInfo.procedurInfo.completed }} </dd>
                </dl>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { ProcedureDto } from '@/dto'

@Component({})

export default class ProcedureInfo extends Vue{

    @Prop({default:null})
    private runProcedureInfo: any;

}

</script>
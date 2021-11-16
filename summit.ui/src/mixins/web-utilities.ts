import { RunStatus, PartTypes } from '@/enums' // eslint-disable-line
import { Component, Vue } from 'vue-property-decorator'
import VueRouter, { Route } from 'vue-router';

@Component({})
export default class WebUtilityMixin extends Vue {

  // TODO: Get from database
    private badgeClasses: object = {
        [RunStatus.INITIALIZED]: 'secondary',
        [RunStatus.RUNNING]: 'success',
        [RunStatus.WAITING]: 'secondary',
        [RunStatus.COMPLETED]: 'primary',
        [RunStatus.FAILED]: 'danger',
        [RunStatus.ABORTED]: 'warning',
        [RunStatus.SKIPPED]: 'info'
    }
    
    public getBadgeClass(status: RunStatus): string {
        return this.badgeClasses[status];
    }

    // REV1
    public friendlyDateString(date: string): string {
        if (!date) return null // safety check
    
        const UTCTime: string = date.slice(0, 19) + 'Z'
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'America/Vancouver'
        }
    
        // locale 'en-CA' is the only one consistent between IE11 and other browsers
        // example output: "2019-12-31 04:00:00 PM"
        let localTime = new Intl.DateTimeFormat('en-CA', options).format(new Date(UTCTime))
    
        // misc cleanup
        localTime = localTime.replace(',', '')
        localTime = localTime.replace('a.m.', 'AM')
        localTime = localTime.replace('p.m.', 'PM')
    
        // fix for Jest (which outputs MM/DD/YYYY no matter which 'en' locale is used)
        if (localTime.indexOf('/') >= 0) {
          const date = localTime.substr(0, 10).split('/')
          const time = localTime.slice(11)
          // set as YYYY-MM-DD HH:MM:SS AM/PM
          localTime = `${date[2]}-${date[0]}-${date[1]} ${time}`
        }
    
        return localTime
      }

      public navigateTo(params: any): void {
        const val = [Object.keys(params)][0];
        if(this.$route[val[0]] != Object.values(params)[0]) {
          this.$router.push(params);
        }
      }
}
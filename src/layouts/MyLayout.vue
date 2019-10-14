<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-primary" reveal>
      <q-toolbar>
        <img src="~assets/petro.svg" style="height: 100px">
        <q-toolbar-title class="text-h2 text-bold">
          PetroBowl
        </q-toolbar-title>
        <q-space></q-space>
        <div>
          <div class="row" @click="logout">
            <div class="text-h5">
              {{
                this['login/dataUser']['rols']
              }}
              <q-avatar
                color="purple-9"
                text-color="blue-grey-2">
                <q-tooltip self="center middle"
                  content-class="bg-purple-1 text-black">
                  {{
                    this['login/dataUser']['name'] }} {{ this['login/dataUser']['lastname']
                  }}
                </q-tooltip>
                  {{
                    this['login/dataUser']['name'].charAt(0).toUpperCase()
                  }}
                </q-avatar>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn flat
              dense
              round
              @click="drawer = !drawer"
              icon="menu"
              aria-label="Menu"
              v-if="route !== '/moderator' && route !== '/generalScreen'"/>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer side="right"
      v-model="drawer"
      bordered
      overlay
      aria-placeholder="20px"
      content-class="bg-blue-1 q-pa-lg"
      :width="600"
      :breakpoint="500"
      :mini-width="20">
      <div v-if="route === '/scoreKeeper'">
        <div class="row bg-primary text-white text-h6 text-center"
          style="height: 30px">
          <div class="col">Regular round #1</div>
        </div>
        <div class="row bg-primary text-grey-1 text-h6 text-center"
          style="height: 40px">
          <div class="col-6">
            {{ translateLabel('timekeeper', 'teamA')}}:
            {{
              (confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'].toUpperCase() : ''
            }}
          </div>
          <div class="col-6">
            {{ translateLabel('timekeeper', 'teamB') }}:
            {{
              (confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'].toUpperCase() : ''
            }}
          </div>
        </div>
        <q-table class="my-sticky-header-table"
          :data="data"
          :columns="columns"
          row-key="name"
          color="info"
          binary-state-sort>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="questionId" :props="props">
                {{ props.row.questionId }}
              </q-td>
              <q-td key="scoreA" :props="props">
                {{ props.row.scoreA }}
                <q-popup-edit v-model="props.row.scoreA">
                  <q-input v-model="props.row.scoreA" type="text" dense autofocus counter/>
                </q-popup-edit>
              </q-td>
              <q-td key="scoreB" :props="props">
                {{ props.row.scoreB }}
                <q-popup-edit v-model="props.row.scoreB">
                  <q-input v-model="props.row.scoreB" type="text" dense autofocus counter/>
                </q-popup-edit>
              </q-td>
              <q-td key="btn" :props="props">
                <q-btn color="primary" icon="check" @click="editPoints(props.row)" />
              </q-td>
              <q-td key="numberUpdate" :props="props">
                {{ props.row.numberUpdate }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div v-if="route === '/timeKeeper'">
        <div v-for="(confrontation, index) in confrontations" :key="confrontation.id">
          <div class="row bg-primary text-white text-h5 text-center"
            style="height: 30px">
            <div class="col">Regular round {{index + 1}}</div>
          </div>
          <div class="row bg-primary text-grey-1 text-h5 text-center"
            style="height: 40px">
            <div class="col-6">
                {{translateLabel('timekeeper', 'teamA')}}:
                {{ (confrontation['TeamA']) ? confrontation['TeamA']['name'].toUpperCase() : '' }}
            </div>
            <div class="col-6">
                {{translateLabel('timekeeper', 'teamB')}}:
                {{ (confrontation['TeamA']) ? confrontation['TeamB']['name'].toUpperCase() : '' }}
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-3">
              <div class="title2 text-h5 text-bold text-left text-center">
                Start time:
              </div>
            </div>
            <div class="col-6">
              <q-input outlined
                style="font-size: 25px"
                :placeholder="dateFormat(confrontation['TimeDurationId']['timeStart'])"
                disable/>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-3">
              <q-toolbar-title class="title2 text-bold text-h5 text-left text-center">
                Stop time:
              </q-toolbar-title>
            </div>
            <div class="col-6">
              <q-input outlined
                style="font-size: 25px"
                :placeholder="dateFormat(confrontation['TimeDurationId']['timeStop'])"
                disable/>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-3">
              <q-toolbar-title class="title2 text-bold text-h5 text-left text-center">
                Duration:
              </q-toolbar-title>
            </div>
            <div class="col-6">
              <q-input outlined
                style="font-size: 25px"
                placeholder="45:05:54"
                disable/>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MyLayout',
  data () {
    return {
      /**
       * Drawer menu
       * @type {Boolean}
       */
      drawer: false,
      /**
       * Name route
       * @type {String}
       */
      route: this.$route.path,
      /**
       * Date table
       * @type {Array}
       */
      data: [],
      /**
       * Column table
       * @type {Array}
       */
      columns: [
        {
          name: 'questionId',
          label: 'QID',
          align: 'center',
          field: 'questionId'
        },
        {
          name: 'scoreA',
          align: 'center',
          label: 'Score team A',
          field: 'scoreA'
        },
        {
          name: 'scoreB',
          align: 'center',
          label: 'Score team B',
          field: 'scoreB'
        },
        {
          name: 'btn',
          align: 'center',
          label: 'Edit',
          field: 'btn'
        },
        {
          name: 'numberUpdate',
          align: 'center',
          label: 'Number Edit',
          field: 'numberUpdate'
        }
      ],
      /**
       * Params confrontation
       * @type {Object}
       */
      params: {
        eventId: 1,
        phaseId: 1,
        query: {
          status: 'playing'
        }
      },
      /**
       * List confrontations
       * @type {Array}
       */
      confrontations: [],
      /**
       * Playing confrontation
       * @type {Array}
       */
      confrontationPlaying: []
    }
  },
  sockets: {
    /**
     * Sets Confrontations
     * @param  {Array} confrontations
     */
    confrontations (confrontations) {
      this['confrontations/getConfrontationsPlaying']({ params: this.params, vm: this })
      this.confrontations = confrontations
    },
    /**
     * Sets confrontation
     * @param  {Array} confrontation
     */
    confrontationsPlaying (confrontation) {
      this.confrontationPlaying = confrontation[0]
    },
    /**
     * Last confrontation
     * @type{Array}
     */
    lastConfrontation (confrontation) {
      this.confrontationPlaying = confrontation[0]
    },
    /**
     * Disabled button
     * @param  {boolean} data
     */
    disabledBonus (data) {
      this.getScoreTeam()
    }
  },
  created () {
    this.$socket.emit('lastConfrontation')
    this.getAllConfrontations()
    setTimeout(() => {
      this.getScoreTeam()
    }, 200)
  },
  computed: {
    ...mapGetters(['login/dataUser'])
  },
  methods: {
    /**
     * Edit score
     * @param  {Object} data
     */
    editPoints (data) {
      data.numberUpdate += 1
      this.$services.putData([
        'confrontation',
        this.confrontationPlaying['id'],
        'question-round',
        data.id
      ], data)
        .then(res => {
          this.getScoreTeam()
        })
    },
    openURL,
    /**
     * Login in the app
     */
    logout () {
      this['login/logout']()
        .then(res => {
          this.$router.push({ path: '/login' })
        })
    },
    /**
     * Gets all Confrontations
     */
    getAllConfrontations () {
      let params = {
        eventId: 1,
        phaseId: 1,
        status: 'played'
      }
      this['confrontations/getConfrontations']({ params: params, vm: this })
    },
    /**
     * Gets Score team
     */
    async getScoreTeam () {
      let params = {
        sort: 'desc',
        sorteField: 'id'
      }
      let { response } = await this.$services.getData(['confrontation', this.confrontationPlaying['id'], 'question-round'], params)
      if (response.status === 200) {
        this.data = response.data
      }
      this.$socket.emit('reloadPoint')
    },
    /**
     * Translates the tags in template
     * @param {String} message tag to translate
     */
    translateLabel (entity, message) {
      return this.$i18n.t(`template.${entity}.${message}.label`)
    },
    /**
     * Date Format
     * @param {String} date formating
     */
    dateFormat (date) {
      date = new Date(date)
      date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      return date
    },
    ...mapActions(
      [
        'login/logout',
        'confrontations/getConfrontations',
        'confrontations/getConfrontationsPlaying'
      ]
    )
  }
}
</script>

<style>
.my-sticky-header-table .q-table__top {
  background-color: rgb(13, 76, 146);
  color: white;
}
.title2 {
  margin-top: 20px;
}
</style>

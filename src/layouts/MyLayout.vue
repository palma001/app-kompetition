<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-primary" reveal>
      <q-toolbar>
        <img src="~assets/kompetition.png" style="
        height: 100px">
        <q-space></q-space>
        <div v-if="route">
          <div class="row" @click="logout">
            <div class="text-h5">
              {{
                translateComponent(this['login/dataUser']['rols'])
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
              v-if="route !== 'moderator' && route !== 'generalScreen' && route !== 'admin'"/>
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
      <div v-if="route === 'scorekeeper'">
        <div class="row bg-primary text-white text-h6 text-center"
          style="height: 30px">
          <div class="col">Regular round #1</div>
        </div>
        <div class="row bg-primary text-grey-1 text-h6 text-center"
          style="height: 40px">
          <div class="col-6">
            {{ translateLabel('timekeeperEntity', 'teamA')}}:
            {{
              (confrontationPlaying) ? confrontationPlaying['TeamA']['name'].toUpperCase() : ''
            }}
          </div>
          <div class="col-6">
            {{ translateLabel('timekeeperEntity', 'teamB') }}:
            {{
              (confrontationPlaying) ? confrontationPlaying['TeamB']['name'].toUpperCase() : ''
            }}
          </div>
        </div>
        <q-table class="my-sticky-header-table"
          :data="data"
          :columns="columns"
          row-key="name"
          color="info"
          :visible-columns="visibleColumns">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td>
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
          <template v-slot:bottom-row>
            <q-tr class="bg-primary text-white">
              <q-td colspan="2">
                Summary:
              </q-td>
              <q-td>
                {{ (points) ? points.teamA : 0 }}
              </q-td>
              <q-td colspan="2">
                {{ (points) ? points.teamB : 0 }}
              </q-td>
              <q-td>
                {{ (numberEdit) ? numberEdit : 0 }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div v-if="route === 'timekeeper'">
        <div v-for="(confrontation, index) in confrontations" :key="confrontation.id">
          <div class="row bg-primary text-white text-h5 text-center"
            style="height: 30px">
            <div class="col">Phase {{ confrontation['phaseId'] }} regular round {{index + 1}}</div>
          </div>
          <div class="row bg-primary text-grey-1 text-h5 text-center"
            style="height: 40px">
            <div class="col-6">
                {{translateLabel('timekeeperEntity', 'teamA')}}:
                {{ (confrontation['TeamA']) ? confrontation['TeamA']['name'].toUpperCase() : '' }}
            </div>
            <div class="col-6">
                {{translateLabel('timekeeperEntity', 'teamB')}}:
                {{ (confrontation['TeamB']) ? confrontation['TeamB']['name'].toUpperCase() : 'To Play' }}
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
                :placeholder="dateFormat(confrontation['timeStart'])"
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
                :placeholder="dateFormat(confrontation['timeStop'])"
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
                :placeholder="(confrontation['duration']) ? confrontation['duration'] : ''"
                disable/>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
      <q-toolbar>
        <img src="~assets/karanta.svg"
          style="height: 80px; position: fixed; bottom: 1px; opacity:.5;">
      </q-toolbar>
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
       * Total points
       * @type {Object}
       */
      points: null,
      /**
       * Columns visible in table
       * @type {Array}
       */
      visibleColumns: ['id', 'questionId', 'scoreA', 'scoreB', 'btn', 'numberUpdate'],
      /**
       * Drawer menu
       * @type {Boolean}
       */
      drawer: false,
      /**
       * Name route
       * @type {String}
       */
      route: this.$store.state.login.rols,
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
          name: 'id',
          label: 'id',
          align: 'center',
          field: 'id',
          sortable: true
        },
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
      paramsConfrontationsPlaying: {
        events: {
          done: false
        },
        pahse: {},
        query: {
          status: 'TOPLAY'
        }
      },
      /**
       * parmas all confrontations
       * @type {Object}
       */
      paramsAllConfrontatios: {
        requestPhases: false,
        events: {
          done: false
        },
        pahse: {},
        query: {}
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
      confrontationPlaying: null
    }
  },
  sockets: {
    /**
     * Sets Confrontations
     * @param  {Array} confrontations
     */
    confrontations (confrontations) {
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
    },
    /**
     * Point teams
     * @param  {Object} point teams
     */
    pointsTeams (point) {
      this.points = point
    },
    /**
     * Refresh time confrontations
     */
    refreshConfrontations () {
      this.getAllConfrontations()
      this.getScoreTeam()
    }
  },
  created () {
    this.$socket.emit('lastConfrontation')
    this.getAllConfrontations()
  },
  computed: {
    ...mapGetters(['login/dataUser']),
    /**
     * Number edit
     * @return {Number} number edit
     */
    numberEdit () {
      let numberEdit = 0
      this.data.forEach((element, index) => {
        numberEdit += Number(element['numberUpdate'])
      })
      return numberEdit
    }
  },
  methods: {
    /**
     * Edit score
     * @param  {Object} data
     */
    async editPoints (data) {
      data.numberUpdate += 1
      try {
        let update = await this.$services.putData(['confrontation', this.confrontationPlaying['id'], 'question-round', data.id], data)
        if (!update.status) throw new Error('Server Error')
        if (update.response.status === 200) {
          this.getScoreTeam()
          this.messageNotify('', 'positive', 'center', 'Update successfull')
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    openURL,
    /**
     * Login in the app
     */
    logout () {
      this['login/logout']()
        .then(res => {
          this.$router.push({ name: 'login' })
        })
    },
    /**
     * Gets all Confrontations
     */
    async getAllConfrontations () {
      try {
        let confrontations = await this['confrontations/getConfrontations'](
          {
            params: this.paramsAllConfrontatios,
            vm: this
          }
        )
        if (!confrontations) throw new Error('No rounds to play')
        this.getConfrontationsPlaying()
        this.$socket.emit('confrontations', confrontations)
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Sets confrontations playing
     */
    async getConfrontationsPlaying () {
      try {
        let { response } = await this.$services.getData(['phase', 0, 'confrontation'], {
          status: 'DEFINITION'
        })
        if (response.data.length > 0) {
          this.$socket.emit('confrontationsPlaying', response['data'])
        } else {
          let confrontationsPlaying = await this['confrontations/getConfrontations']({
            params: this.paramsConfrontationsPlaying,
            vm: this
          })
          if (!confrontationsPlaying) throw new Error('No rounds playing')
          this.$socket.emit('confrontationsPlaying', confrontationsPlaying)
        }
        this.getScoreTeam()
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Gets Score team
     */
    async getScoreTeam () {
      this.data = await this['confrontations/getDetailsRound'](
        {
          vm: this,
          data: this.confrontationPlaying
        }
      )
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
     * Translates the tags in template
     * @param {String} message tag to translate
     */
    translateComponent (message) {
      return this.$i18n.t(`template.${message}.label`)
    },
    /**
     * Date Format
     * @param {String} date formating
     */
    dateFormat (date) {
      if (date) {
        date = new Date(date)
        date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      } else {
        date = ''
      }
      return date
    },
    /**
     * Message notify
     * @param  {String} icon     icon notify
     * @param  {String} color    color notify
     * @param  {String} position postions notify
     * @param  {String} message  message notify
     */
    messageNotify (icon, color, position, message) {
      this.$q.notify({
        position: position,
        color: color,
        icon: icon,
        message: message
      })
    },
    ...mapActions(
      [
        'login/logout',
        'confrontations/getConfrontations',
        'confrontations/getConfrontationsPlaying',
        'confrontations/getDetailsRound'
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

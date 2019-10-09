<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-primary" reveal>
      <q-toolbar>
        <img src="~assets/petro.svg">
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
              aria-label="Menu" />
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
            {{
              translateLabel('timekeeper', 'teamA')
            }}:
            {{
              this['confrontations/confrontationsdGetter']['TeamA']['name']
            }}
          </div>
          <div class="col-6">
            {{
              translateLabel('timekeeper', 'teamB')
            }}:
            {{
              this['confrontations/confrontationsdGetter']['TeamB']['name']
            }}
          </div>
        </div>
        <q-table class="my-sticky-header-table"
          :data="this['score/questionRoundGetter']"
          :columns="columns"
          row-key="name"
          color="info" />
      </div>
      <div v-if="route === '/timeKeeper'">
        <div v-for="(confrontation, index) in this['confrontations/allConfrontationsdGetter']" :key="confrontation.id">
          <div class="row bg-primary text-white text-h5 text-center"
            style="height: 30px">
            <div class="col">Regular round {{index + 1}}</div>
          </div>
          <div class="row bg-primary text-grey-1 text-h5 text-center"
            style="height: 40px">
            <div class="col-6">
              {{
                translateLabel('timekeeper', 'teamA')
              }}:
              {{
                confrontation['TeamA']['name']
              }}
            </div>
            <div class="col-6">
              {{
                translateLabel('timekeeper', 'teamB')
              }}:
              {{
                confrontation['TeamB']['name']
              }}
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
                placeholder="9:30 am"
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
                placeholder="10:15 am"
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
      drawer: false,
      miniState: false,
      route: this.$route.path,
      columns: [
        {
          name: 'QID',
          label: 'QID',
          align: 'center',
          field: 'QID',
          sortable: true
        },
        { name: 'QT', align: 'center', label: 'QT', field: 'QT', sortable: true },
        { name: 'A', align: 'center', label: 'A', field: 'A', sortable: true },
        { name: 'B', align: 'center', label: 'B', field: 'B' }
        // { name: 'Edit', align: 'center', label: 'Edit', field: 'Edit' },
        // { name: 'Record', align: 'center', label: 'Record', field: 'Record' },
        // { name: 'NEdit', align: 'center', label: 'N° Edit', field: 'NEdit', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      params: {
        eventId: 1,
        phaseId: 1,
        query: {
          status: 'playing'
        }
      }
    }
  },
  created () {
    this['confrontations/getConfrontations'](
      {
        params: this.params,
        vm: this
      }
    )
    this.getAllConfrontations()
  },
  computed: {
    ...mapGetters(
      [
        'score/questionRoundGetter',
        'login/dataUser',
        'confrontations/confrontationsdGetter',
        'confrontations/allConfrontationsdGetter'
      ]
    )
  },
  methods: {
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
     * [getAllConfrontations description]
     * @return {[type]} [description]
     */
    getAllConfrontations () {
      let params = {
        eventId: 1,
        phaseId: 1,
        status: 'played'
      }
      this['confrontations/getAllConfrontations'](
        {
          params: params,
          vm: this
        }
      )
    },
    /**
     * Translates the tags in template
     * @param {String} message tag to translate
     */
    translateLabel (entity, message) {
      return this.$i18n.t(`template.${entity}.${message}.label`)
    },
    ...mapActions(
      [
        'login/logout',
        'confrontations/getConfrontations',
        'confrontations/getAllConfrontations'
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

<template>
  <q-layout view="hHh Lpr lff">
    <q-header class="bg-primary" reveal>
      <q-toolbar>
        <img src="~assets/spe.jpg">
        <q-toolbar-title class="text-h2">
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
                  chucenam
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
      :width="800"
      :breakpoint="500"
      :mini-width="20">
      <div>
        <div class="row bg-primary text-white text-h6 text-center"
          style="height: 30px">
          <div class="col">Regular round #1</div>
        </div>
        <div class="row bg-primary text-grey-1 text-h6 text-center"
          style="height: 40px">
          <div class="col-6">A-Team: UDO</div>
          <div class="col-6">B-Team: IUTA</div>
        </div>
        <q-table class="my-sticky-header-table"
          :data="this['score/questionRoundGetter']"
          :columns="columns"
          row-key="name"
          color="info" />
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
        { name: 'B', align: 'center', label: 'B', field: 'B' },
        { name: 'Edit', align: 'center', label: 'Edit', field: 'Edit' },
        { name: 'Record', align: 'center', label: 'Record', field: 'Record' },
        { name: 'NEdit', align: 'center', label: 'N° Edit', field: 'NEdit', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
    }
  },
  computed: {
    ...mapGetters(['score/questionRoundGetter', 'login/dataUser'])
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
    ...mapActions(['login/logout'])
  }
}
</script>

<style>
.my-sticky-header-table .q-table__top {
  background-color: rgb(13, 76, 146);
  color: white;
}
</style>

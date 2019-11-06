<template>
  <q-page class="bg-blue-grey-1">
    <div>
      <q-splitter v-model="splitterModel"
        style="height: 92vh">

        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            dense
            class="text-accent text-h6 bg-blue-grey-1"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
            <q-tab
              name="events"
              label="Register events"/>
            <q-tab
              name="datos"
              label="General data"/>
            <q-tab name="team"
              label="Registration of team" />
            <q-tab name="confrontations"
              label="Assign confrontations" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels v-model="tab"
            animated
            transition-prev="jump-up"
            transition-next="jump-up">
            <!-- EVENTS -->
            <q-tab-panel name="events">
              <div class="q-mb-md">
                <q-toolbar>
                  <q-toolbar-title class="text-h5 text-primary text-bold">
                    Register event
                  </q-toolbar-title>
                </q-toolbar>
                <div>
                  <q-table
                    class="q-mt-md"
                    :data="eventsData"
                    :columns="events['table']['column']"
                    row-key="name"
                    :filter="filter"
                    flat
                    :visible-columns="events['table']['visibleColumns']"
                    bordered>
                    <template v-slot:top-left>
                      <q-input
                        borderless
                        dense debounce="300"
                        v-model="filter"
                        placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:top-right>
                      <div>
                        <q-btn color="primary"
                          label="Add event"
                          @click="modalEvent(true, events['modelsAddEvents'])" />
                      </div>
                    </template>
                     <template v-slot:body="props">
                      <q-tr
                        :props="props">
                        <q-td
                          key="name"
                          :props="props">
                          {{ props.row.name }}
                        </q-td>
                        <q-td
                          key="organizer"
                          :props="props">
                          {{ props.row.organizer }}
                        </q-td>
                        <q-td
                          key="address"
                          :props="props">
                          {{ props.row.address }}
                        </q-td>
                        <q-td
                          key="dateEvent"
                          :props="props">
                          {{ props.row.dateEvent }}
                        </q-td>
                        <q-td
                          key="created_by"
                          :props="props">
                          {{ props.row.created_by }}
                        </q-td>
                        <q-td
                          key="updated_by"
                          :props="props">
                          {{ props.row.updated_by }}
                        </q-td>
                        <q-td
                          key="done"
                          :props="props">
                          <q-badge
                            :color="(props.row.done) ? 'negative' : 'positive'">
                            {{
                              (props.row.done) ? 'N' : 'Y'
                            }}
                          </q-badge>
                        </q-td>
                        <q-td
                          key="edit"
                          :props="props">
                          <q-btn
                            color="primary"
                            icon="edit"
                            size="10px"
                            @click="selected(props.row)" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="datos">
              <div class="q-mb-md"
                style="height: 800px">
                <q-toolbar>
                  <q-toolbar-title class="text-h5 text-primary text-bold">
                    Genaral data
                  </q-toolbar-title>
                </q-toolbar>
                <div>
                  <q-table
                    class="q-mt-md"
                    :data="usersData"
                    :columns="users.table.column"
                    row-key="name"
                    color="primary"
                    flat
                    filter
                    :visible-columns="users.table.visibleColumns"
                    bordered>
                    <template v-slot:top-left>
                      <q-input
                        borderless
                        dense debounce="300"
                        v-model="filterUsers"
                        placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:top-right>
                      <div>
                        <q-btn color="primary"
                          label="Add Users"
                          @click="modalUsers(true, users['modelsUsers'])" />
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr
                        :props="props">
                        <q-td
                          key="name"
                          :props="props">
                          {{ props.row.name }}
                        </q-td>
                        <q-td
                          key="lastname"
                          :props="props">
                          {{ props.row.lastname }}
                        </q-td>
                        <q-td
                          key="rols"
                          :props="props">
                          {{ props.row.rols }}
                        </q-td>
                        <q-td
                          key="email"
                          :props="props">
                          {{ props.row.email }}
                        </q-td>
                        <q-td
                          key="user"
                          :props="props">
                          {{ props.row.user }}
                        </q-td>
                        <q-td
                          key="edit"
                          :props="props">
                          <q-btn
                            color="primary"
                            icon="edit"
                            size="10px"
                            @click="selectedUsers(props.row)" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="team">
              <div class="text-h5 q-mb-md">
                <q-toolbar>
                  <q-toolbar-title class="text-h5 text-primary text-bold">
                    Registration of team
                  </q-toolbar-title>
                  <q-space></q-space>
                  <div>
                    <q-btn color="primary"
                      label="Add team"
                      @click="addTeam = true" />
                  </div>
                </q-toolbar>
                <div>
                  <q-table class="my-sticky-header-table q-mt-md"
                    :data="teamsData"
                    :columns="teams['table']['column']"
                    row-key="name"
                    color="primary"
                    flat
                    :visible-columns="teams['table']['visibleColumns']"
                    bordered>

                  </q-table>
                </div>
                <q-toolbar class="q-mt-md">
                  <q-toolbar-title class="text-h5 text-primary text-bold">
                    Members
                  </q-toolbar-title>
                  <q-space></q-space>
                  <div>
                    <q-btn color="primary"
                      label="Add member"
                      @click="addMember = true" />
                  </div>
                </q-toolbar>
<!--                 <div>
                  <q-table class="my-sticky-header-table q-mt-md"
                    :data="data3"
                    :columns="columns3"
                    row-key="name"
                    color="primary"
                    flat
                    bordered/>
                </div> -->

              </div>
            </q-tab-panel>
<!--             <q-tab-panel name="confrontations">
              <div class="text-h5 q-mb-md"
                style="height: 800px">Assign confrontations
                <q-stepper class="q-mt-md"
                  v-model="step"
                  header-nav
                  ref="stepper"
                  color="primary"
                  animated
                  vertical>
                  <q-step :name="1"
                    title="Regular rounds"
                    icon="add_comment"
                    :done="done1">
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Round 1
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Round 2
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Round 3
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Round 4
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Round 5
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Round 6
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-stepper-navigation>
                      <q-btn @click="() => { done1 = true; step = 2 }"
                        color="primary"
                        label="Continue" />
                    </q-stepper-navigation>
                  </q-step>

                  <q-step :name="2"
                    title="Semifinal rounds"
                    icon="add_comment"
                    :done="done2">
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Semifinal round 1
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Semifinal round 2
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-stepper-navigation>
                      <q-btn @click="() => { done2 = true; step = 3 }"
                        color="primary"
                        label="Continue" />
                      <q-btn flat
                        @click="step = 1"
                        color="primary"
                        label="Back"
                        class="q-ml-sm" />
                    </q-stepper-navigation>
                  </q-step>
                  <q-step :name="3"
                    title="Final round"
                    icon="add_comment"
                    :done="done3">
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Final round
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-toolbar-title class="text-subtitle1 text-primary text-left">
                      Third place
                    </q-toolbar-title>
                    <div class="row">
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                      <div class="col-6">
                        <q-select v-model="model"
                          :options="options1"
                          label="Select team" />
                      </div>
                    </div>
                    <q-stepper-navigation>
                      <q-btn color="primary"
                        @click="done4 = true"
                        label="Finish" />
                      <q-btn flat
                        @click="step = 2"
                        color="primary"
                        label="Back"
                        class="q-ml-sm" />
                    </q-stepper-navigation>
                  </q-step>
                </q-stepper>
              </div>
            </q-tab-panel> -->
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
    <!-- FORMULARIOS DE PARA AÑADIR -->

    <q-dialog
      v-model="addUsers"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">
          Add information
          <div class="row">
            <div class="col-12">
              <q-select
                v-model="users['modelsUsers']['rols']['value']"
                :options="rols"
                ref="rols"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                label="Rol" />
            </div>
            <div class="col-12">
              <q-input
                v-model="users['modelsUsers']['name']['value']"
                label="Name"
                ref="name"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="users['modelsUsers']['lastname']['value']"
                label="Lastname"
                ref="lastname"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="users['modelsUsers']['email']['value']"
                label="Email"
                ref="email"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="users['modelsUsers']['user']['value']"
                label="User"
                ref="user"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="users['modelsUsers']['password']['value']"
                ref="password"
                label="Password"
                type="password"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel"
            color="primary"
            @click="modalUsers(false, users['modelsUsers'])"/>
            <q-btn
              label="delete"
              color="negative"
              @click="deleteData('users')"/>
            <q-btn
              label="Edit"
              color="primary"
              v-if="editForm"
              @click="editDataUsers"/>
            <q-btn
              label="Add"
              color="primary"
              v-if="!editForm"
              @click="addUsersDb"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addEvent">
      <q-card>
        <q-form
          @submit="addEvents"
          @reset="onReset"
          class="q-gutter-md">
          <q-card-section
            class="text-primary text-h6">
              Add information
              <div class="row">
                <div class="col-12">
                  <q-input
                    v-model="events['modelsAddEvents'].name.value"
                    label="Name"
                    lazy-rules
                    ref="name"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    expanded
                    @keyup.enter.native="addEvents"/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="events['modelsAddEvents'].organizer.value"
                    label="Organizar"
                    ref="organizer"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    expanded
                    @keyup.enter.native="addEvents"/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="events['modelsAddEvents'].address.value"
                    label="Address"
                    ref="address"
                    :rules="[  val => val && val.length > 0 || 'Please type something']"
                    expanded
                    @keyup.enter.native="addEvents"/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="events['modelsAddEvents'].dateEvent.value"
                    mask="date"
                    ref="dateEvent"
                    label="Date event"
                    :rules="['date']"
                    @keyup.enter.native="addEvents">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale">
                          <q-date
                            v-model="events['modelsAddEvents'].dateEvent.value"
                            @input="() => $refs.qDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Cancel"
              color="primary"
              @click="modalEvent(false, events['modelsAddEvents'])"/>
            <q-btn
              label="delete"
              color="negative"
              @click="deleteData('events')"/>
              <q-btn
              label="Edit"
              color="primary"
              v-if="editForm"
              @click="editData"/>
            <q-btn
              label="Add"
              color="primary"
              v-if="!editForm"
              @click="addEvents"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addTeam"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">Add information
          <div class="row">
          <div class="col-12">
            <q-select
              v-model="teams['modelTeams']['eventId']['value']"
              ref="eventId"
              label="Event"
              :options="eventData"
              :rules="[ val => val && val.length > 0 || 'Please type something']"/>
            </div>
            <div class="col-12">
              <q-input
                v-model="teams['modelTeams']['name']['value']"
                label="Name team"
                ref="name"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
            <q-select
              v-model="teams['modelTeams']['university']['value']"
              label="University"
              ref="university"
              expanded
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              :options="universityDataSelect"/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="reset"
            label="Cancel"
            color="primary"
            @click="modalteams(false, teams['modelTeams'])"/>
          <q-btn
            type="submit"
            label="Add"
            color="primary"
            @click="addTeams"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addMember"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">Add information
          <div class="row">
          <div class="col-12">
              <q-select
                v-model="model"
                :options="eventData"
                label="Event"
                expanded/>
            </div>
            <div class="col-12">
              <q-input v-model="text"
                label="Name"
                expanded/>
            </div>
            <div class="col-12">
              <q-input v-model="text"
                label="Last name"
                expanded/>
            </div>
            <div class="col-12">
              <q-select v-model="model"
                :options="options4"
                label="Type of competitor"
                expanded/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel"
            color="primary" />
          <q-btn label="Add"
            color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
/* .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
/* /* background-color: #c1f4cd */

.my-sticky-header-table .q-table__top {
  background-color: #0b6420;
}
</style>

<script>
import { mapActions } from 'vuex'
import { config, users, events, teams } from './config'
export default {
  data () {
    return {
      config,
      users,
      events,
      teams,
      filterUsers: '',
      text: '',
      filter: '',
      tab: 'events',
      addUsers: false,
      addEvent: false,
      addTeam: false,
      addMember: false,
      splitterModel: 20,
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      done4: false,
      model: null,
      /**
       * Select university
       * @type {Array}
       */
      universityDataSelect: [],
      options: [
        'UDO', 'UNEFA', 'UCV', 'LUZ', 'PSM'
      ],
      /**
       * List teams
       * @type {Array}
       */
      teamsData: [],
      /**
       * [options1 description]
       * @type {Array}
       */
      options1: [
        'Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8', 'Team 9', 'Team 10', 'Team 11', 'Team 12'
      ],
      /**
       * data select events
       * @type {Array}
       */
      eventData: [],
      /**
       * [rols description]
       * @type {Array}
       */
      rols: ['SCOREKEEPER', 'TIMEKEEPER', 'MODERATOR', 'ADMINISTRADOR'],
      /**
       * [options4 description]
       * @type {Array}
       */
      options4: ['Leader', 'Competitor'],
      /**
       * Data events
       * @type {Array}
       */
      eventsData: [],
      /**
       * Type fromulary
       * @type {Boolean}
       */
      editForm: false,
      /**
       * Entity id
       * @type {Number}
       */
      entityId: 0,
      /**
       * [usersData description]
       * @type {Array}
       */
      usersData: []
    }
  },
  created () {
    this.getAllEvents()
    this.getAllUsers()
    this.selectEvents()
    this.getAllteams()
    this.selectUniversity()
  },
  methods: {
    /**
     * Sets data select events
     */
    async selectEvents () {
      this.eventData = []
      try {
        let res = await this.$services.getData(['events'], { done: false })
        if (!res.status) throw new Error('Error in server')
        if (res.response.status === 204) throw new Error('No events loaded')
        res['response']['data'].map(element => {
          this.eventData.push({
            label: element['name'],
            value: element['id']
          })
        })
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Sets data select university
     */
    async selectUniversity () {
      this.universityDataSelect = []
      try {
        let res = await this.$services.getData(['universities'])
        if (!res.status) throw new Error('Error in server')
        if (res.response.status === 204) throw new Error('No events loaded')
        res['response']['data'].map(element => {
          this.universityDataSelect.push({
            label: element['sortName'],
            value: element['id']
          })
        })
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Modal de events
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalEvent (data, model) {
      this.addEvent = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * Modal de events
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalUsers (data, model) {
      this.addUsers = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * Modal de teams
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalteams (data, model) {
      this.addTeam = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * [reset description]
     * @return {[type]} [description]
     */
    reset () {
      this.done1 = false
      this.done2 = false
      this.done3 = false
      this.done4 = false
      this.step = 1
    },
    /**
     * Select data to edit
     * @param  {Object} data events
     */
    selected (data) {
      this.addEvent = true
      this.editForm = true
      this.entityId = data['id']
      for (let model in data) {
        for (let modelEvents in this.events['modelsAddEvents']) {
          if (modelEvents === model) {
            this.events['modelsAddEvents'][model]['value'] = data[model]
          }
        }
      }
    },
    /**
     * Select data to edit
     * @param  {Object} data events
     */
    selectedUsers (data) {
      this.addUsers = true
      this.editForm = true
      this.entityId = data['id']
      for (let model in data) {
        for (let modelEvents in this.users['modelsUsers']) {
          if (modelEvents === model && modelEvents !== 'password') {
            this.users['modelsUsers'][model]['value'] = data[model]
          }
        }
      }
    },
    /**
     * Gets all Confrontations
     */
    async getAllEvents () {
      try {
        let res = await this.$services.getData(['events'])
        if (!res.status) throw new Error('Error in server')
        if (res.response.status === 204) throw new Error('No events loaded')
        res['response']['data'].map(element => {
          element.dateEvent = `
            ${new Date(element.dateEvent).getFullYear()}-${new Date(element.dateEvent).getMonth() + 1}-${new Date(element.dateEvent).getDate()}
          `
        })
        this.eventsData = res['response']['data']
        this.modalEvent(false, this.events['modelsAddEvents'])
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Gets all Confrontations
     */
    async getAllUsers () {
      try {
        let res = await this.$services.getData(['users'])
        if (!res.status) throw new Error('Error in server')
        if (res.response.status === 204) throw new Error('No events loaded')
        this.usersData = res['response']['data']
        this.modalUsers(false, this.users['modelsUsers'])
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Gets all Confrontations
     */
    async getAllteams () {
      try {
        let res = await this.$services.getData(['phase'])
        if (!res.status) throw new Error('Error in server')
        if (res.response.status === 204) throw new Error('No events loaded')
        this.teamsData = res['response']['data']
        this.modalteams(false, this.teams['modelTeams'])
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Add events
     */
    async addTeams () {
      try {
        this.validateInput(this.teams['modelTeams'])
        if (
          !this.$refs['eventId'].hasError &&
          !this.$refs['name'].hasError &&
          !this.$refs['university'].hasError
        ) {
          let response = await this.$services.postData(
            ['teams'],
            this.modelsObject(this.teams['modelTeams'])
          )
          if (!response.status) throw new Error('Error server')
          this.getAllteams()
          this.messageNotify('', 'positive', 'center', 'Teams add successfull')
          this.onReset(this.teams['modelTeams'])
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Add events
     */
    async addEvents () {
      try {
        this.validateInput(this.events['modelsAddEvents'])
        if (
          !this.$refs['name'].hasError &&
          !this.$refs['organizer'].hasError &&
          !this.$refs['dateEvent'].hasError &&
          !this.$refs['address'].hasError
        ) {
          let response = await this.$services.postData(['events'], this.modelsObject(this.events['modelsAddEvents']))

          if (!response.status) throw new Error('Error server')
          this.getAllEvents()
          this.messageNotify('', 'positive', 'center', 'Event add successfull')
          this.onReset(this.events['modelsAddEvents'])
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Add events
     */
    async addUsersDb () {
      try {
        this.validateInput(this.users['modelsUsers'])
        if (
          !this.$refs['name'].hasError &&
          !this.$refs['lastname'].hasError &&
          !this.$refs['rols'].hasError &&
          !this.$refs['email'].hasError &&
          !this.$refs['user'].hasError &&
          !this.$refs['password'].hasError
        ) {
          let response = await this.$services.postData(['users'], this.modelsObject(this.users['modelsUsers']))

          if (!response.status) throw new Error('Error server')
          this.getAllUsers()
          this.messageNotify('', 'positive', 'center', 'Users add successfull')
          this.onReset(this.events['modelsAddEvents'])
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Edit events
     * @param  {Object} data events
     */
    async editData () {
      try {
        this.validateInput(this.events['modelsAddEvents'])
        if (
          !this.$refs['name'].hasError &&
          !this.$refs['organizer'].hasError &&
          !this.$refs['dateEvent'].hasError &&
          !this.$refs['address'].hasError
        ) {
          let response = await this.$services.putData(
            [
              'events',
              this.entityId
            ],
            this.modelsObject(this.events['modelsAddEvents'])
          )
          if (!response.status) throw new Error('Error server')
          this.getAllEvents()
          this.messageNotify('', 'positive', 'center', 'Event edit successfull')
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Delete data
     * @param {String} name entity
     */
    async deleteData (data) {
      try {
        await this.$services.deleteData([data, this.entityId])
        this.getAllEvents()
        this.getAllUsers()
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Edit events
     * @param  {Object} data events
     */
    editDataUsers () {
      if (
        !this.$refs['name'].hasError &&
          !this.$refs['lastname'].hasError &&
          !this.$refs['rols'].hasError &&
          !this.$refs['email'].hasError &&
          !this.$refs['user'].hasError &&
          !this.$refs['password'].hasError
      ) {
        this.$services.putData(
          [
            'users',
            this.entityId
          ],
          this.modelsObject(this.users['modelsUsers'])
        )
          .then(response => {
            if (!response.status) throw new Error('Error server')
            this.messageNotify('', 'positive', 'center', 'Users edit successfull')
            this.getAllUsers()
          })
          .catch(e => {
            this.messageNotify('report_problem', 'negative', 'center', e.message)
          })
      }
    },
    /**
     * Validate form
     * @param  {Object} data models input
     */
    validateInput (data) {
      console.log(data)
      for (let input in data) {
        if (data[input]['validate']) {
          this.$refs[input].validate()
        }
      }
    },
    /**
     * [modelsObject description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    modelsObject (data) {
      let models = {}
      for (let input in data) {
        if (typeof data[input]['value'] === 'object' && data[input] !== null) {
          console.log(data[input])
          data[input] = data[input]['value']
        }
        models[input] = data[input]['value']
      }
      console.log(models)
      return models
    },
    /**
     * reset
     * @param  {Object} data reset model
     */
    onReset (data) {
      for (let input in data) {
        if (data[input]['value'] === 'boolean') {
          data[input]['value'] = false
        }
        data[input]['value'] = null
      }
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
        'confrontations/getConfrontations'
      ]
    )
  }
}
</script>

<template>
  <q-page class="bg-blue-grey-1">
    <div>
      <q-splitter v-model="splitterModel"
        style="height: 92vh">

        <template v-slot:before>
          <q-tabs v-model="tab"
            vertical
            dense
            class="text-accent text-h6 bg-blue-grey-1"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
            <q-tab name="events"
              label="Register event" />
            <q-tab name="datos"
              label="General data" />
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
                    :columns="eventsColumns"
                    row-key="name"
                    :filter="filter"
                    flat
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
                          @click="modalEvent(true, modelsAddEvents)" />
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
            <!-- Sección General data -->
            <q-tab-panel name="datos">
              <div class="q-mb-md"
                style="height: 800px">
                <q-toolbar>
                  <q-toolbar-title class="text-h5 text-primary text-bold">
                    Genaral data
                  </q-toolbar-title>
                  <q-space></q-space>
                  <div>
                    <q-btn color="primary"
                      label="Add user"
                      @click="add = true" />
                  </div>
                </q-toolbar>
                <div>
                  <q-table class="my-sticky-header-table q-mt-md"
                    :data="data"
                    :columns="columns"
                    row-key="name"
                    color="primary"
                    flat
                    bordered/>
                </div>
              </div>
            </q-tab-panel>
            <!-- Sección team -->
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
                    :data="data2"
                    :columns="columns2"
                    row-key="name"
                    color="primary"
                    flat
                    bordered/>
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
                <div>
                  <q-table class="my-sticky-header-table q-mt-md"
                    :data="data3"
                    :columns="columns3"
                    row-key="name"
                    color="primary"
                    flat
                    bordered/>
                </div>

              </div>
            </q-tab-panel>
            <q-tab-panel name="confrontations">
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
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
    <!-- FORMULARIOS DE PARA AÑADIR -->

    <q-dialog v-model="add"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">
          Add information
          <div class="row">
            <div class="col-6">
              <q-select v-model="model"
                :options="options2"
                label="Event" />
            </div>
            <div class="col-6">
              <q-select v-model="model"
                :options="options3"
                label="Rol" />
            </div>
            <div class="col-6">
              <q-input v-model="text"
                label="Name:"
                expanded/>
            </div>
            <div class="col-6">
              <q-input v-model="text"
                label="Last nam:"
                expanded/>
            </div>
            <div class="col-6">
              <q-input v-model="text"
                label="User"
                expanded/>
            </div>
            <div class="col-6">
              <q-input v-model="text"
                label="Password"
                expanded/>
            </div>
            <div class="col-12">
              <q-input v-model="text"
                label="Email"
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
                    v-model="modelsAddEvents.name.value"
                    label="Name"
                    lazy-rules
                    ref="name"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    expanded
                    @keyup.enter.native="addEvents"/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="modelsAddEvents.organizer.value"
                    label="Organizar"
                    ref="organizer"
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    expanded
                    @keyup.enter.native="addEvents"/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="modelsAddEvents.address.value"
                    label="Address"
                    ref="address"
                    :rules="[  val => val && val.length > 0 || 'Please type something']"
                    expanded
                    @keyup.enter.native="addEvents"/>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="modelsAddEvents.dateEvent.value"
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
                            v-model="modelsAddEvents.dateEvent.value"
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
              @click="modalEvent(false, modelsAddEvents)"/>
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
            <q-select v-model="model"
              :options="options2"
              label="Event"
              expanded/>
            </div>
            <div class="col-12">
              <q-input v-model="text"
                label="Name team"
                expanded/>
            </div>
            <div class="col-12">
              <q-input v-model="text"
                label="University"
                expanded/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="reset"
            label="Cancel"
            color="primary" />
          <q-btn
            type="submit"
            label="Add"
            color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addMember"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">Add information
          <div class="row">
          <div class="col-12">
              <q-select v-model="model"
                :options="options2"
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
export default {
  data () {
    return {
      text: '',
      filter: '',
      tab: 'events',
      add: false,
      addEvent: false,
      addTeam: false,
      addMember: false,
      address: '',
      splitterModel: 20,
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      done4: false,
      model: null,
      options: [
        'UDO', 'UNEFA', 'UCV', 'LUZ', 'PSM'
      ],
      options1: [
        'Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5', 'Team 6', 'Team 7', 'Team 8', 'Team 9', 'Team 10', 'Team 11', 'Team 12'
      ],
      options2: [
        '1', '2', '3'],
      options3: [
        'ScoreKeeper', 'TimeKeeper', 'Moderator', 'Administrator'],
      options4: [
        'Leader', 'Competitor'],
      columns: [
        {
          name: 'event',
          required: true,
          label: 'event',
          align: 'center',
          field: row => row.event,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Name', align: 'center', label: 'Name', field: 'Name', sortable: true },
        { name: 'lastName', align: 'center', label: 'Last Name', field: 'lastName', sortable: true },
        { name: 'rol', align: 'center', label: 'Rol', field: 'rol', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email' },
        { name: 'user', align: 'center', label: 'User', field: 'user' },
        { name: 'password', align: 'center', label: 'Password', field: 'password', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        {
          event: '1',
          rol: 'ScoreKeeper',
          Name: 'Andres',
          lastName: 'Salazar',
          email: 'email@gmail.com',
          user: 'salazara',
          password: 'salazara123'
        },
        {
          event: '1',
          rol: 'ScoreKeeper',
          Name: 'Barbara',
          lastName: 'Rodriguez',
          email: 'email@gmail.com',
          user: 'rodriguezb',
          password: 'rodriguezb123'
        },
        {
          event: '1',
          rol: 'TimeKeeper',
          Name: 'Lucia',
          lastName: 'Goméz',
          email: 'email@gmail.com',
          user: 'gomezl',
          password: 'gomezl123'
        },
        {
          event: '1',
          rol: 'TimeKeeper',
          Name: 'Luis',
          lastName: 'Rivero',
          email: 'email@gmail.com',
          user: 'riverol',
          password: 'riverol123'
        },
        {
          event: '1',
          rol: 'Moderator',
          Name: 'Marcos',
          lastName: 'Arismendi',
          email: 'email@gmail.com',
          user: 'arismendim',
          password: 'arismendim123'
        }
      ],
      /**
       * Columns table event
       * @type {Array}
       */
      eventsColumns: [
        {
          name: 'name',
          align: 'center',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'organizer',
          align: 'center',
          label: 'Organizer',
          field: 'organizer',
          sortable: true
        },
        {
          name: 'address',
          align: 'center',
          label: 'Address',
          field: 'address',
          sortable: true
        },
        {
          name: 'dateEvent',
          align: 'center',
          label: 'Data event',
          field: 'dateEvent'
        },
        {
          name: 'done',
          align: 'center',
          label: 'Active/inactive',
          field: 'done'
        },
        {
          name: 'edit',
          align: 'center',
          label: 'Edit',
          field: 'edit'
        },
        {
          name: 'created_by',
          align: 'center',
          label: 'Created by',
          field: 'created_by'
        },
        {
          name: 'updated_by',
          align: 'center',
          label: 'Updated by',
          field: 'updated_by'
        }
      ],
      /**
       * Data events
       * @type {Array}
       */
      eventsData: [],
      /**
       * Models add events
       * @type {Object}
       */
      modelsAddEvents: {
        name: {
          value: null,
          validate: true
        },
        organizer: {
          value: null,
          validate: true
        },
        address: {
          value: null,
          validate: true
        },
        dateEvent: {
          value: null,
          validate: true
        },
        done: {
          value: false,
          validate: false
        },
        created_by: {
          value: 'luis palma',
          validate: false
        },
        updated_by: {
          value: 'luis palma',
          validate: false
        }
      },
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
      columns2: [
        {
          name: 'event',
          required: true,
          label: 'Event',
          align: 'center',
          field: 'event',
          sortable: true
        },
        { name: 'name', align: 'center', label: 'Name team', field: 'name', sortable: true },
        { name: 'university', align: 'center', label: 'University', field: 'university', sortable: true }
      ],
      data2: [
        {
          event: 1,
          name: 'UDO 25',
          university: 'UDO'
        },
        {
          event: 1,
          name: 'UCV 34',
          university: 'UCV'
        }
      ],
      columns3: [
        { name: 'university', align: 'center', label: 'University', field: 'university', sortable: true },
        { name: 'name', align: 'center', label: 'Name team', field: 'name', sortable: true },
        { name: 'lastName', align: 'center', label: 'Last Name', field: 'lastName', sortable: true },
        { name: 'competitorType', align: 'center', label: 'Type of competitor', field: 'competitorType', sortable: true }
      ],
      data3: [
        {
          university: 'UDO',
          name: 'María',
          lastName: 'Salazar',
          competitorType: 'Leader'
        },
        {
          university: 'UDO',
          name: 'Jesús',
          lastName: 'Ruiz',
          competitorType: 'Competitor'
        },
        {
          university: 'UDO',
          name: 'Karla',
          lastName: 'Cortez',
          competitorType: 'Competitor'
        },
        {
          university: 'UDO',
          name: 'Felipe',
          lastName: 'Moya',
          competitorType: 'Competitor'
        },
        {
          university: 'UDO',
          name: 'Sebastian',
          lastName: 'Cordova',
          competitorType: 'Competitor'
        }
      ]
    }
  },
  created () {
    this.getAllConfrontations()
  },
  methods: {
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
        for (let modelEvents in this.modelsAddEvents) {
          if (modelEvents === model) {
            this.modelsAddEvents[model]['value'] = data[model]
          }
        }
      }
    },
    /**
     * Gets all Confrontations
     */
    async getAllConfrontations () {
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
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Add events
     */
    async addEvents () {
      try {
        this.validateInput(this.modelsAddEvents)
        if (
          !this.$refs['name'].hasError &&
          !this.$refs['organizer'].hasError &&
          !this.$refs['dateEvent'].hasError &&
          !this.$refs['address'].hasError
        ) {
          let response = await this.$services.postData(['events'], this.modelsObject(this.modelsAddEvents))

          if (!response.status) throw new Error('Error server')
          this.getAllConfrontations()
          this.messageNotify('', 'positive', 'center', 'Event add successfull')
          this.onReset(this.modelsAddEvents)
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
        this.validateInput(this.modelsAddEvents)
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
            this.modelsObject(this.modelsAddEvents)
          )
          if (!response.status) throw new Error('Error server')
          this.getAllConfrontations()
          this.messageNotify('', 'positive', 'center', 'Event edit successfull')
          this.modalEvent(false, this.modelsAddEvents)
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Validate form
     * @param  {Object} data models input
     */
    validateInput (data) {
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
        models[input] = data[input]['value']
      }
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

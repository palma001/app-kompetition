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
            <q-tab
              name="confrontations"
              label="Assign confrontations" />
            <q-tab
              name="universities"
              label="universities" />
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
                    :filter="filterUsers"
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
                </q-toolbar>
                <div>
                  <q-table class="q-mt-md"
                    row-key="name"
                    color="primary"
                    flat
                    :data="teamsData"
                    :columns="teams['table']['column']"
                    :filter="filterTeams"
                    :visible-columns="teams['table']['visibleColumns']"
                    bordered>
                    <template v-slot:top-left>
                      <q-input
                        borderless
                        dense debounce="300"
                        v-model="filterTeams"
                        placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:top-right>
                      <div>
                        <q-btn
                          color="primary"
                          label="Add Teams"
                          @click="modalteams(true, teams['modelTeams'])" />
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr
                        :props="props">
                        <q-td
                          key="eventId"
                          :props="props">
                          {{ props.row.eventId }}
                        </q-td>
                        <q-td
                          key="name"
                          :props="props">
                          {{ props.row.name }}
                        </q-td>
                        <q-td
                          key="University"
                          :props="props">
                          {{ props.row.University }}
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
                          key="edit"
                          :props="props">
                          <q-btn
                            color="primary"
                            icon="edit"
                            size="10px"
                            @click="selectedTeam(props.row)" />
                        </q-td>
                        <q-td
                          key="member"
                          :props="props">
                          <q-btn
                            color="primary"
                            icon="camera_front"
                            size="10px"
                            @click="selectedRow(props.row)" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
                <q-toolbar class="q-mt-md">
                  <q-toolbar-title class="text-h5 text-primary text-bold">
                    Members
                  </q-toolbar-title>
                </q-toolbar>
                <div>
                  <q-table
                    class="q-mt-md"
                    row-key="name"
                    color="primary"
                    flat
                    :data="dataMember"
                    :columns="competitors['table']['column']"
                    :filter="filterTeams"
                    :visible-columns="competitors['table']['visibleColumns']"
                    bordered>
                    <template v-slot:top-left>
                      <q-input
                        borderless
                        dense debounce="300"
                        v-model="filterTeams"
                        placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:top-right>
                      <div>
                        <q-btn color="primary"
                          label="Add member"
                          @click="modalMembers(true, competitors['modelsMembers'])" />
                      </div>
                    </template>
                     <template v-slot:body="props">
                      <q-tr
                        :props="props">
                        <q-td
                          key="teamId"
                          :props="props">
                          {{ props.row.teamId }}
                        </q-td>
                        <q-td
                          key="name"
                          :props="props">
                          {{ props.row.name }}
                        </q-td>
                        <q-td
                          key="lastName"
                          :props="props">
                          {{ props.row.lastName }}
                        </q-td>
                        <q-td
                          key="email"
                          :props="props">
                          {{ props.row.email }}
                        </q-td>
                        <q-td
                          key="competitorType"
                          :props="props">
                          {{ props.row.competitorType }}
                        </q-td>
                        <q-td
                          key="edit"
                          :props="props">
                          <q-btn
                            color="primary"
                            icon="edit"
                            size="10px"
                            @click="selectedMember(props.row)" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>

              </div>
            </q-tab-panel>
            <q-tab-panel
              name="confrontations">
              <q-toolbar>
                <q-toolbar-title class="text-h5 text-primary text-bold">
                  Assign confrontations
                </q-toolbar-title>
              </q-toolbar>
              <div>
                <q-table
                  class="q-mt-md"
                  row-key="name"
                  flat
                  :filter="filterConfrontations"
                  :data="confrontationsAll"
                  :columns="confrontations['table']['column']"
                  :visible-columns="confrontations['table']['visibleColumns']"
                  bordered>
                  <template v-slot:top-left>
                    <q-input
                      borderless
                      dense
                      debounce="300"
                      v-model="filterConfrontations"
                      placeholder="Search">
                      <template v-slot:append>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </template>
                  <template v-slot:top-right>
                    <div>
                      <q-btn color="primary"
                        label="Add Confrontations"
                        @click="modalConfrontations(true, confrontations['modelsConfrontations'])" />
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr
                      :props="props">
                      <q-td
                        key="phaseId"
                        :props="props">
                        {{ props.row.phaseId }}
                      </q-td>
                      <q-td
                        key="teamA"
                        :props="props">
                        {{ props.row.teamA }}
                      </q-td>
                      <q-td
                        key="teamB"
                        :props="props">
                        {{ props.row.teamB }}
                      </q-td>
                      <q-td
                        key="TeamA"
                        :props="props">
                        {{
                          (props.row.TeamA) ? props.row.TeamA.name : 'TOPLAY'
                        }}
                      </q-td>
                      <q-td
                        key="TeamB"
                        :props="props">
                        {{
                          (props.row.TeamB) ? props.row.TeamB.name : 'TOPLAY'
                        }}
                      </q-td>
                      <q-td
                        key="status"
                        :props="props">
                        {{ props.row.status }}
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
                        key="edit"
                        :props="props">
                        <q-btn
                          color="primary"
                          icon="edit"
                          size="10px"
                          @click="selectedConfrontations(props.row)" />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </q-tab-panel>
            <q-tab-panel
              name="universities">
              <q-toolbar>
                <q-toolbar-title class="text-h5 text-primary text-bold">
                  Universities
                </q-toolbar-title>
              </q-toolbar>
                <div>
                  <q-table
                    class="q-mt-md"
                    :data="universityData"
                    :columns="universities['table']['column']"
                    row-key="name"
                    :filter="filterConfrontations"
                    flat
                    :visible-columns="universities['table']['visibleColumns']"
                    bordered>
                    <template v-slot:top-left>
                      <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filterConfrontations"
                        placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:top-right>
                      <div>
                        <q-btn color="primary"
                          label="Add University"
                          @click="modalUniversity(true, universities['modelsUniversities'])" />
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
                          key="sortName"
                          :props="props">
                          {{ props.row.sortName }}
                        </q-td>
                        <q-td
                          key="university"
                          :props="props">
                          {{ props.row.university }}
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
                          key="edit"
                          :props="props">
                          <q-btn
                            color="primary"
                            icon="edit"
                            size="10px"
                            @click="selectedUniversity(props.row)" />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
            </q-tab-panel>
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
              v-if="editForm"
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
              v-if="editForm"
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

    <q-dialog
      v-model="addTeam"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">Add information
          <div class="row">
          <div class="col-12">
            <q-select
              v-model="teams['modelTeams']['eventId']['value']"
              ref="eventId"
              label="Event"
              emit-value
              lazy-rules
              expanded
              :options="eventData"
              :rules="[ val => val || 'Please type something']"/>
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
              lazy-rules
              emit-value
              :rules="[ val => val || 'Please type something']"
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
            label="delete"
            color="negative"
            v-if="editForm"
            @click="deleteData('teams')"/>
          <q-btn
            label="Edit"
            color="primary"
            v-if="editForm"
            @click="editTeams"/>
          <q-btn
            type="submit"
            label="Add"
            color="primary"
            v-if="!editForm"
            @click="addTeams"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addMember"
      persistent>
      <q-card>
        <q-card-section class="text-primary text-h6">
          Add information
          <div class="row">
            <div class="col-12">
              <q-select
                v-model="competitors['modelsMembers']['teamId']['value']"
                :options="eventData"
                label="Event"
                ref="teamId"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="competitors['modelsMembers']['name']['value']"
                label="Name"
                ref="name"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="competitors['modelsMembers']['lastName']['value']"
                label="Last name"
                ref="lastName"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                v-model="competitors['modelsMembers']['email']['value']"
                label="Email"
                ref="email"
                expanded/>
            </div>
            <div class="col-12">
              <q-select
                v-model="competitors['modelsMembers']['competitorType']['value']"
                :options="options4"
                ref="competitorType"
                label="Type of competitor"
                expanded/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            type="reset"
            label="Cancel"
            color="primary"
            @click="modalMembers(false, competitors['modelsMembers'])"/>
          <q-btn
            label="delete"
            color="negative"
            v-if="editForm"
            @click="deleteData('confrontation')"/>
          <q-btn
            label="Edit"
            color="primary"
            v-if="editForm"
            @click="editConfrontations"/>
          <q-btn
            type="submit"
            label="Add"
            color="primary"
            v-if="!editForm"
            @click="addConfrontation"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addConfrontations"
      persistent>
      <q-card style="width: 500px">
        <q-card-section class="text-primary text-h6">Add information
          <div class="row">
          <div class="col-12">
              <q-select
                v-model="confrontations['modelsConfrontations']['phaseId']['value']"
                :options="phaseSelect"
                label="Phase"
                emit-value
                ref="phaseId"
                :rules="[ val => val || 'Please type something']"
                expanded/>
            </div>
          <div class="col-12">
              <q-select
                v-model="confrontations['modelsConfrontations']['teamA']['value']"
                :options="teamsData"
                label="TeamA"
                emit-value
                ref="teamA"
                :rules="[ val => val || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-select
                v-model="confrontations['modelsConfrontations']['teamB']['value']"
                :options="teamsData"
                label="Team B"
                emit-value
                ref="teamB"
                :rules="[ val => val || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-select
                v-model="confrontations['modelsConfrontations']['status']['value']"
                :options="['TOPLAY', 'DEFINITION', 'PLAYED']"
                ref="status"
                label="Status"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="reset"
            label="Cancel"
            color="primary"
            @click="modalConfrontations(false, confrontations['modelsConfrontations'])"/>
          <q-btn
            label="delete"
            color="negative"
            v-if="editForm"
            @click="deleteData('confrontation')"/>
          <q-btn
            label="Edit"
            color="primary"
            v-if="editForm"
            @click="editConfrontations"/>
          <q-btn
            type="submit"
            label="Add"
            color="primary"
            v-if="!editForm"
            @click="addConfrontation"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addUniversities"
      persistent>
      <q-card style="width: 500px">
        <q-card-section class="text-primary text-h6">Add information
          <div class="row">
            <div class="col-12">
              <q-input
                ref="name"
                v-model="universities['modelsUniversities']['name']['value']"
                label="Name"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                ref="sortName"
                v-model="universities['modelsUniversities']['sortName']['value']"
                label="Sort name"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                ref="university"
                v-model="universities['modelsUniversities']['university']['value']"
                label="University"
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                expanded/>
            </div>
            <div class="col-12">
              <q-input
                ref="logo"
                v-model="universities['modelsUniversities']['logo']['value']"
                type="file"/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="reset"
            label="Cancel"
            color="primary"
            @click="modalUniversity(false, universities['modelsUniversities'])"/>
          <q-btn
            label="delete"
            color="negative"
            v-if="editForm"
            @click="deleteData('universities')"/>
          <q-btn
            label="Edit"
            color="primary"
            v-if="editForm"
            @click="editUniversity"/>
          <q-btn
            type="submit"
            label="Add"
            color="primary"
            v-if="!editForm"
            @click="addUniversity"/>
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
import { users, events, teams, confrontations, universities, competitors } from './config'
export default {
  data () {
    return {
      competitors,
      /**
       * Status modal confrontations
       * @type {Boolean}
       */
      addConfrontations: false,
      /**
       * Status modal universities
       * @type {Boolean}
       */
      addUniversities: false,
      /**
       * Config confrontations
       * @type {Object}
       */
      confrontations,
      /**
       * Config universities
       * @type {Object}
       */
      universities,
      /**
       * Config users
       * @type {Object}
       */
      users,
      /**
       * Config events
       * @type {Object}
       */
      events,
      /**
       * Config teams
       * @type {Object}
       */
      teams,
      /**
       * filter users
       * @type {String}
       */
      filterUsers: '',
      /**
       * filter confrontations
       * @type {String}
       */
      filterConfrontations: '',
      /**
       * filter Teams
       * @type {String}
       */
      filterTeams: '',
      /**
       * filter table
       * @type {String}
       */
      filter: '',
      /**
       * Tab default
       * @type {String}
       */
      tab: 'events',
      /**
       * Status modal users
       * @type {Boolean}
       */
      addUsers: false,
      /**
       * Status modal events
       * @type {Boolean}
       */
      addEvent: false,
      /**
       * Status modal teams
       * @type {Boolean}
       */
      addTeam: false,
      /**
       * Status modal confrontatios
       * @type {Boolean}
       */
      modalConfrontationsStatus: false,
      /**
       * Status modal member
       * @type {Boolean}
       */
      addMember: false,
      splitterModel: 20,
      /**
       * All confrontations
       * @type {Array}
       */
      confrontationsAll: [],
      /**
       * All member
       * @type {Array}
       */
      dataMember: [],
      /**
       * All universities
       * @type {Array}
       */
      universityData: [],
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
       * Select teams
       * @type {Array}
       */
      teamsSelect: [],
      /**
       * Select teams
       * @type {Array}
       */
      phaseSelect: [],
      /**
       * data select events
       * @type {Array}
       */
      eventData: [],
      /**
       * [rols description]
       * @type {Array}
       */
      rols: ['SCOREKEEPER', 'TIMEKEEPER', 'MODERATOR', 'ADMIN'],
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
      usersData: [],
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
      }
    }
  },
  sockets: {
    confrontations (data) {
      this.confrontationsAll = data
    }
  },
  created () {
    this.loadTable()
  },
  methods: {
    async selectedRow (data) {
      let { response } = await this.$services.getData(['teams', data.id, 'competitors'])
      console.log(response)
    },
    /**
     * load tables
     */
    loadTable () {
      this.getAllEvents()
      this.getAllUsers()
      this.selectEvents()
      this.getAllteams()
      this.selectUniversity()
      this.getAllConfrontations()
      this.getAllPhase()
    },
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
        this.universityData = res['response']['data']
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
     * Modal the events
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalEvent (data, model) {
      this.addEvent = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * Modal the Confrontations
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalConfrontations (data, model) {
      this.addConfrontations = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * Modal the Confrontations
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalMembers (data, model) {
      this.addMember = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * Modal the Confrontations
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalUniversity (data, model) {
      this.addUniversities = data
      this.editForm = false
      this.onReset(model)
    },
    /**
     * Modal the events
     * @param  {Boolean} data status events
     * @param  {Object} model events
     */
    modalUsers (data, model) {
      this.addUsers = data
      this.editForm = false
      this.onReset(model)
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
        if (!confrontations) throw new Error('No rounds')
        this.confrontationsAll = confrontations
        this.$socket.emit('confrontations', confrontations)
        this.modalConfrontations(false, this.confrontations['modelsConfrontations'])
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },

    /**
     * Gets all Confrontations
     */
    async getAllPhase () {
      try {
        let phase = await this.$services.getData(['events', 0, 'phase'])
        if (!phase.status) throw new Error('Error in server')
        phase['response']['data'].map(element => {
          element.value = element.id
          element.label = element.id
        })
        this.phaseSelect = phase['response']['data']
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
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
    selectedMember (data) {
      this.addEvent = true
      this.editForm = true
      this.entityId = data['id']
      for (let model in data) {
        for (let modelEvents in this.competitors['modelsMembers']) {
          if (modelEvents === model) {
            this.competitors['modelsMembers'][model]['value'] = data[model]
          }
        }
      }
    },
    /**
     * Select data to edit
     * @param  {Object} data events
     */
    selectedUniversity (data) {
      this.addUniversities = true
      this.editForm = true
      this.entityId = data['id']
      for (let model in data) {
        for (let modelEvents in this.universities['modelsUniversities']) {
          if (modelEvents === model) {
            this.universities['modelsUniversities'][model]['value'] = data[model]
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
     * Select data to edit
     * @param  {Object} data events
     */
    selectedConfrontations (data) {
      this.addConfrontations = true
      this.editForm = true
      this.entityId = data['id']
      for (let model in data) {
        for (let modelEvents in this.confrontations['modelsConfrontations']) {
          if (modelEvents === model && modelEvents !== 'password') {
            this.confrontations['modelsConfrontations'][model]['value'] = data[model]
          }
        }
      }
    },
    /**
     * Select data to edit
     * @param  {Object} data events
     */
    selectedTeam (data) {
      this.addTeam = true
      this.editForm = true
      this.entityId = data['id']
      for (let model in data) {
        for (let modelEvents in this.teams['modelTeams']) {
          if (modelEvents === model && modelEvents !== 'password') {
            this.teams['modelTeams'][model]['value'] = data[model]
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
        let res = await this.$services.getData(['teams'])
        if (!res.status) throw new Error('Error in server')
        if (res.response.status === 204) throw new Error('No events loaded')
        res['response']['data'].map(element => {
          element.University = (element.University) ? element.University.name : null
          element.value = element.id
          element.label = element.name
        })
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
      this.teams['modelTeams'].created_by = {
        value: 'luis',
        validate: false
      }
      this.teams['modelTeams'].updated_by = {
        value: 'luis',
        validate: false
      }
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
          let response = await this.$services.postData(
            ['events'],
            this.modelsObject(this.events['modelsAddEvents'])
          )

          if (!response.status) throw new Error('Error server')
          this.selectUniversity()
          this.messageNotify('', 'positive', 'center', 'University add successfull')
          this.onReset(this.events['modelsAddEvents'])
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Add events
     */
    async addUniversity () {
      try {
        this.universities['modelsUniversities'].created_by = {
          value: `${this.$store.state.login.name} ${this.$store.state.login.lastName}`,
          validate: false
        }
        this.universities['modelsUniversities'].updated_by = {
          value: `${this.$store.state.login.name} ${this.$store.state.login.lastName}`,
          validate: false
        }
        this.validateInput(this.universities['modelsUniversities'])
        if (
          !this.$refs['name'].hasError &&
          !this.$refs['sortName'].hasError &&
          !this.$refs['university'].hasError
        ) {
          let response = await this.$services.postData(['universities'], this.modelsObject(this.universities['modelsUniversities']))
          if (!response.status) throw new Error('Error server')
          this.selectUniversity()
          this.modalUniversity(false, this.universities['modelsUniversities'])
          this.messageNotify('', 'positive', 'center', 'Event add successfull')
          this.onReset(this.universities['modelsUniversities'])
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
     * Add events
     */
    async addConfrontation () {
      try {
        this.confrontations['modelsConfrontations'].created_by = {
          value: `${this.$store.state.login.name} ${this.$store.state.login.lastName}`,
          validate: false
        }
        this.confrontations['modelsConfrontations'].updated_by = {
          value: `${this.$store.state.login.name} ${this.$store.state.login.lastName}`,
          validate: false
        }
        this.validateInput(this.confrontations['modelsConfrontations'])
        if (
          !this.$refs['phaseId'].hasError &&
          !this.$refs['teamA'].hasError &&
          !this.$refs['teamB'].hasError &&
          !this.$refs['status'].hasError
        ) {
          let response = await this.$services.postData(
            [
              'phase',
              this.confrontations['modelsConfrontations']['phaseId'],
              'confrontation'
            ],
            this.modelsObject(this.confrontations['modelsConfrontations'])
          )
          if (!response.status) throw new Error('Error server')
          this.getAllConfrontations()
          this.messageNotify('', 'positive', 'center', 'Users add successfull')
          this.onReset(this.confrontations['modelsConfrontations'])
        }
      } catch (e) {
        this.messageNotify('report_problem', 'negative', 'center', e.message)
      }
    },
    /**
     * Edit events
     * @param  {Object} data events
     */
    async editUniversity () {
      try {
        this.universities['modelsUniversities'].updated_by = {
          value: `${this.$store.state.login.name} ${this.$store.state.login.lastName}`,
          validate: false
        }
        this.validateInput(this.universities['modelsUniversities'])
        if (
          !this.$refs['name'].hasError &&
          !this.$refs['sortName'].hasError &&
          !this.$refs['university'].hasError
        ) {
          let response = await this.$services.putData(
            [
              'universities',
              this.entityId
            ],
            this.modelsObject(this.universities['modelsUniversities'])
          )
          if (!response.status) throw new Error('Error server')
          this.selectUniversity()
          this.modalUniversity(false, this.universities['modelsUniversities'])
          this.messageNotify('', 'positive', 'center', 'University edit successfull')
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
     * Edit confrontations
     * @param  {Object} data confrontations
     */
    async editConfrontations () {
      try {
        this.validateInput(this.confrontations['modelsConfrontations'])
        if (
          !this.$refs['phaseId'].hasError &&
          !this.$refs['teamA'].hasError &&
          !this.$refs['teamB'].hasError &&
          !this.$refs['status'].hasError
        ) {
          let response = await this.$services.putData(
            [
              'phase',
              this.confrontations['modelsConfrontations']['phaseId']['value'],
              'confrontation',
              this.entityId
            ],
            this.modelsObject(this.confrontations['modelsConfrontations'])
          )
          if (!response.status) throw new Error('Error server')
          this.getAllConfrontations()
          this.messageNotify('', 'positive', 'center', 'Confrontations edit successfull')
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
        this.loadTable()
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
     * Edit events
     * @param  {Object} data events
     */
    editTeams () {
      if (
        !this.$refs['eventId'].hasError &&
        !this.$refs['name'].hasError &&
        !this.$refs['university'].hasError
      ) {
        this.$services.putData(
          [
            'teams',
            this.entityId
          ],
          this.modelsObject(this.teams['modelTeams'])
        )
          .then(response => {
            if (!response.status) throw new Error('Error server')
            this.messageNotify('', 'positive', 'center', 'Teams edit successfull')
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

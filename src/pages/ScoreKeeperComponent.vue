<template>
  <q-page class="bg-blue-grey-1">
    <div class="q-pa-md">
      <div class="row q-pa-md justify-center">
        <div class="col-md-auto">
          <q-btn
            class="buttonQ"
            size="30px"
            color="red-10"
            label="Toss Up"
            v-if="question && question.typeQuestion === 'tossup'"/>
          <q-btn
            class="buttonQ"
            size="30px"
            color="green"
            label="Bonus"
            v-if="question && question.typeQuestion === 'bonus'"/>
        </div>
        <div class="q-ml-sm col-lg-10 col-md-10 col-sm-8 col-xs-8 self-center">
          <div class="title">
            QID#
            {{
              (question) ? question.id : ''
            }}:
            {{
              (question) ? question.question : ''
            }}
          </div>
        </div>
      </div>
      <div class="row q-pa-md justify-around">
        <!-- first team column -->
        <div class="col-md-5 col-sm-10 q-mt-lg bg-white">
          <!-- title - Team name -->
          <div class="row q-pa-md">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
              <q-toolbar-title class="text-h4 text-white text-center bg-accent">
                {{ translateLabel('timekeeperEntity', 'teamA') }}:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-accent text-white text-bold">
                {{
                  (confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'].toUpperCase() : ''
                }}
              </q-toolbar-title>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-12">
              <q-toolbar-title class="title1 text-h3 text-center text-primary text-bold">
                Score
              </q-toolbar-title>
            </div>
            <div class="col-auto">
              <q-btn size="50px"
                class="score q-px-xl q-py-xs"
                align="center"
                outline
                text-color="primary">
                {{ pointData.teamA }}
              </q-btn>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div
              class="col-lg-6 col-md-7"
              v-if="question.typeQuestion === 'tossup'">
              <q-btn
                color="positive"
                class="buttonF"
                :disabled="disabled.add1">
                <q-icon center
                  size="50px"
                  name="check"
                  @click="point(10, confrontationPlaying['TeamA']['id'], 'add1')"/>
              </q-btn>
              <q-btn
                color="negative"
                class="buttonF"
                :disabled="disabled.sub1">
                <q-icon
                  center
                  size="50px"
                  name="close"
                  @click="point(-5, confrontationPlaying['TeamA']['id'], 'sub1')"/>
              </q-btn>
            </div>
            <div class="col-lg-6 col-md-5 col-sm-8 col-xs-8">
              <q-input outlined
                type="number"
                class="bonus"
                placeholder="Bonus"
                v-model="value.bonus1"
                color="primary"
                v-if="question && question.typeQuestion === 'bonus'"
                :disabled="disabled.bonus1"/>
            </div>
          </div>
        </div>
        <!-- first team column -->
        <div class="col-md-5 col-sm-10 q-mt-lg bg-white">
          <!-- title - Team name -->
          <div class="row q-pa-md">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
              <q-toolbar-title class="text-h4 text-white text-center bg-secondary">
                {{translateLabel('timekeeperEntity', 'teamB')}}:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-secondary text-white text-bold">
                {{
                  (confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'].toUpperCase() : ''
                }}
              </q-toolbar-title>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-12">
              <q-toolbar-title class="title1 text-h3 text-center text-secondary text-bold">
                Score
              </q-toolbar-title>
            </div>
            <div class="col-auto">
              <q-btn size="50px"
                class="score q-px-xl q-py-xs"
                align="center"
                outline
                text-color="secondary">
                {{ pointData.teamB }}
              </q-btn>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-lg-6 col-md-7"
              v-if="question && question.typeQuestion === 'tossup'">
              <q-btn
                color="positive"
                class="buttonF"
                ref="buttonA"
                :disabled="disabled.add2">
                <q-icon center
                  size="50px"
                  name="check"
                  @click="point(10, confrontationPlaying['TeamB']['id'], 'add2')"/>
              </q-btn>
              <q-btn
                color="negative"
                class="buttonF"
                ref="buttonB"
                :disabled="disabled.sub2">
                <q-icon
                  center
                  size="50px"
                  name="close"
                  @click="point(-5, confrontationPlaying['TeamB']['id'], 'sub2')"/>
              </q-btn>
            </div>
            <div class="col-lg-6 col-md-5 col-sm-8 col-xs-8">
              <q-input
                outlined
                type="number"
                class="bonus"
                placeholder="Bonus"
                v-model="value.bonus2"
                color="primary"
                v-if="question && question.typeQuestion === 'bonus'"
                :disabled="disabled.bonus2"/>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-mt-lg justify-center">
        <div class="col-auto">
          <!-- Save -->
          <q-btn
            color="positive"
            :loading="submitting"
            :disabled="status"
            @click="saveRecords">
            <q-icon
              left
              size="60px"
              name="save"/>
              <span>Record</span>
              <template v-slot:loading>
                Cargando...
              </template>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.title {
  background-color: white;
  padding: 20px;
}
.title1, .score {
  margin-top: 30px;
}
.buttonF {
  margin-top: 10px;
  margin-left: 10px;
}
.bonus {
  font-size: 20px;
}
</style>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ScoreKeeperComponent',
  data () {
    return {
      /**
       * Loading status
       * @type {Boolean}
       */
      submitting: false,
      /**
       * Status of buttons
       * @type {Object}
       */
      disabled: {
        add1: false,
        add2: false,
        sub1: false,
        sub2: false,
        bonus1: false,
        bonus2: false
      },
      /**
       * Value if input bonus
       * @type {Object}
       */
      value: {
        bonus1: 0,
        bonus2: 0
      },
      /**
       * Teams in the confrontations
       * @type {Array}
       */
      pointData: {
        teamA: 0,
        teamB: 0
      },
      /**
       * Data confrontations
       * @param {Object}
       */
      confrontationPlaying: {},
      /**
       * Questions
       * @type {Object}
       */
      question: null,
      /**
       * Points questions
       * @type {Object}
       */
      pointQuestion: {
        confrontationId: 0,
        questionId: 0,
        teamA: 0,
        teamB: 0,
        scoreA: 0,
        scoreB: 0,
        numberUpdate: 0,
        created_by: 'ss',
        updated_by: 'sss'
      },
      /**
       * Status app
       * @param {Boolean}
       */
      status: true
    }
  },
  sockets: {
    /**
     * Status buttons
     */
    statusButton (status) {
      this.status = status
    },
    /**
     * Capture event the socket
     * @param  {Array} question question
     */
    getQuestions (question) {
      this.question = question
    },
    /**
     * Sets confrontations
     * @param  {Array} confrontation
     */
    confrontationsPlaying (confrontation) {
      this.confrontationPlaying = confrontation[0]
      this.getScoreTeam()
    },
    /**
     * Last question
     * @param  {Object} question
     */
    lastQuestion (question) {
      this.question = question
    },
    /**
     * Last confrontation
     * @type{Array}
     */
    lastConfrontation (confrontation) {
      this.confrontationPlaying = confrontation[0]
    },
    /**
     * Reload points
     */
    reloadPoint () {
      this.getScoreTeam()
    }
  },
  created () {
    this.$socket.emit('lastQuestion')
    this.$socket.emit('lastConfrontation')
    setTimeout(() => {
      this.getScoreTeam()
    }, 200)
  },
  methods: {
    /**
     * Sets poins teams
     * @param  {Number} point questions
     * @param  {Number} id teams
     * @param  {String} btn name button
     */
    point (point, id, btn) {
      for (let disabled in this.disabled) {
        if (disabled !== btn && !this.disabled[btn]) {
          this.disabled[disabled] = !this.disabled[disabled]
          if ((btn === 'add1' || btn === 'sub1') && this.disabled[disabled]) {
            this.pointQuestion.scoreA = point
          } else if (this.disabled[disabled]) {
            this.pointQuestion.scoreB = point
          }
        }
      }
    },
    /**
     * Save points temas
     */
    async saveRecords () {
      this.pointQuestion['confrontationId'] = this.confrontationPlaying['id']
      this.pointQuestion['questionId'] = this.question['id']
      this.pointQuestion['teamA'] = this.confrontationPlaying['TeamA']['id']
      this.pointQuestion['teamB'] = this.confrontationPlaying['TeamB']['id']
      if (this.question.typeQuestion === 'bonus') {
        if (this.value.bonus1) {
          this.pointQuestion.scoreA = this.value.bonus1
        }
        this.pointQuestion.scoreB = this.value.bonus2
      }
      await this.$services.postData(
        [
          'confrontation',
          this.pointQuestion['confrontationId'],
          'question-round'
        ],
        this.pointQuestion
      )
      if ((this.pointQuestion.scoreA > 0 || this.pointQuestion.scoreB > 0) && this.question.typeQuestion !== 'bonus') {
        this.$socket.emit('disabledBonus', false)
      } else {
        this.$socket.emit('disabledBonus', true)
      }
      this.pointQuestion.scoreA = 0
      this.pointQuestion.scoreB = 0
      this.value.bonus1 = 0
      this.value.bonus2 = 0
      for (let disabled in this.disabled) {
        this.disabled[disabled] = false
      }
      this.getScoreTeam()
    },
    /**
     * Gets teams score
     */
    async getScoreTeam () {
      let { response } = await this.$services.getData(['confrontation', this.confrontationPlaying['id'], 'question-round'])
      if (response.status === 200) {
        this.scoreData(response.data)
      }
    },
    /**
     * Add score teams
     * @param  {Array} data
     */
    scoreData (data) {
      for (let score in this.pointData) {
        this.pointData[score] = 0
      }
      data.forEach((element, index) => {
        this.pointData['teamA'] += Number(element['scoreA'])
        this.pointData['teamB'] += Number(element['scoreB'])
      })
      this.$socket.emit('saveRecords', this.pointData)
    },
    /**
     * Translates the tags in template
     * @param {String} message tag to translate
     */
    translateLabel (entity, message) {
      return this.$i18n.t(`template.${entity}.${message}.label`)
    },
    ...mapActions(['score/addQuestionRound', 'confrontations/getConfrontations'])
  }
}
</script>

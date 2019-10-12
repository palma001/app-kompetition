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
            v-if="question.typeQuestion === 'tossup'"/>
          <q-btn
            class="buttonQ"
            size="30px"
            color="green"
            label="Bonus"
            v-if="question.typeQuestion === 'bonus'"/>
        </div>
        <div class="q-ml-sm col-lg-10 col-md-10 col-sm-8 col-xs-8 self-center">
          <div class="title">
            QID# {{ question.id }}: {{ question.question }}
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
                {{ translateLabel('timekeeper', 'teamA') }}:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-accent text-white text-bold">
                {{
                  (confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'] : ''
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
                {{ pointData.team1 }}
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
                ref="buttonG"
                :disabled="disabled.add1">
                <q-icon center
                  size="50px"
                  name="check"
                  @click="point(10, confrontationPlaying['TeamA']['id'], 'add1')"/>
              </q-btn>
              <q-btn
                color="negative"
                class="buttonF"
                ref="buttonF"
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
                v-if="question.typeQuestion === 'bonus'"
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
                {{translateLabel('timekeeper', 'teamB')}}:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-secondary text-white text-bold">
                {{
                  (confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'] : ''
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
                {{ pointData.team2 }}
              </q-btn>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-lg-6 col-md-7"
              v-if="question.typeQuestion === 'tossup'">
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
                v-if="question.typeQuestion === 'bonus'"
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
    <q-toolbar>
      <img src="~assets/speTrans.png"
        style="height: 150px">
      <q-space></q-space>
    </q-toolbar>
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
import { mapActions, mapGetters } from 'vuex'
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
        team1: 0,
        team2: 0
      },
      /**
       * Data os points teams
       * @type {Object}
       */
      dataPoints: {
        id: null,
        A: 0,
        B: 0,
        question: null
      },
      /**
       * Listo questions
       * @type {Array}
       */
      question: {},
      /**
       * Data confrontations
       * @param {Object}
       */
      confrontationPlaying: {}
    }
  },
  sockets: {
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
    },
    /**
     * [lastQuestion description]
     * @param  {[type]} question [description]
     * @return {[type]}          [description]
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
    }
  },
  computed: {
    ...mapGetters(['confrontations/confrontationsdGetter'])
  },
  created () {
    this.$socket.emit('lastQuestion')
    this.$socket.emit('lastConfrontation')
    this.getScoreTeam()
  },
  methods: {
    /**
     * Sets poins teams
     * @param  {Number} point questions
     * @param  {Number} id teams
     * @param  {String} btn name button
     */
    point (point, id, btn) {
      // let question = {
      //   'confrontationId': 2,
      //   'questionId': 51,
      //   'teamA': 1,
      //   'teamB': 2,
      //   'scoreA': '200',
      //   'scoreB': '200',
      //   'created_by': 'string',
      //   'updated_by': 'string'
      // }
      for (let disabled in this.disabled) {
        if (disabled !== btn && !this.disabled[btn]) {
          this.disabled[disabled] = !this.disabled[disabled]
          for (let confrontation in this.confrontationPlaying) {
            if (typeof this.confrontationPlaying[confrontation] === 'object') {
              if (this.confrontationPlaying[confrontation]['id'] === id) {
                console.log(this.confrontationPlaying[confrontation])
              }
            }
          }
          // this.teams.forEach((element) => {
          //   if (element['teamId'] === id) {
          //     if (this.dataPoints[element['id']] === 0) {
          //       this.dataPoints[element['id']] = point
          //       this.dataPoints['id'] = id
          //     } else {
          //       this.dataPoints[element['id']] = 0
          //     }
          //   }
          // })
        }
      }
    },
    /**
     * Save points temas
     */
    // saveRecords () {
    //   this.submitting = true
    //   setTimeout(() => {
    //     this.teams.map(element => {
    //       if (element['teamId'] === this.dataPoints['id']) {
    //         this['score/addQuestionRound'](this.dataPoints)
    //         element.score += this.dataPoints[element['id']]
    //         this.dataPoints['id'] = 0
    //         this.dataPoints[element['id']] = 0
    //         for (let disabled in this.disabled) {
    //           this.disabled[disabled] = false
    //         }
    //       }
    //     })
    //     if (this.dataPoints['question']['type'] === 'bonus') {
    //       this.teams[0]['score'] += Number(this.value['bonus1'])
    //       this.teams[1]['score'] += Number(this.value['bonus2'])
    //       this.dataPoints['A'] = this.value['bonus1']
    //       this.dataPoints['B'] = this.value['bonus2']
    //       this['score/addQuestionRound'](this.dataPoints)
    //       this.value['bonus2'] = 0
    //       this.value['bonus1'] = 0
    //       this.dataPoints['A'] = 0
    //       this.dataPoints['B'] = 0
    //     }
    //     this.questionRandom()
    //     this.submitting = false
    //   }, 1000)
    // }
    async saveRecords () {
      this.$socket.emit('disabledBonus', false)
      this.getScoreTeam()
    },
    /**
     * [getScoreTeam description]
     * @return {[type]} [description]
     */
    async getScoreTeam () {
      console.log('hola')
      let { response } = await this.$services.getData(['confrontation', this.confrontationPlaying['id'], 'question-round'])
      if (response.status === 200) {
        this.scoreData(response.data)
      }
    },
    /**
     * [scoreData description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    scoreData (data) {
      for (let score in this.pointData) {
        this.pointData[score] = 0
      }
      data.forEach((element, index) => {
        this.pointData['team1'] += Number(element['scoreA'])
        this.pointData['team2'] += Number(element['scoreB'])
      })
      console.log(this.pointData)
    },
    /**
     * Gets questions random
     */
    questionRandom () {
      this.dataPoints['question'] = this.question[Math.floor(Math.random() * 6)]
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

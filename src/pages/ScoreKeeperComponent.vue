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
            v-if="dataPoints['question']['type'] === 'tossUp'"/>
          <q-btn
            class="buttonQ"
            size="30px"
            color="green"
            label="Bonus"
            v-if="dataPoints['question']['type'] === 'bonus'"/>
        </div>
        <div class="q-ml-sm col-lg-10 col-md-10 col-sm-8 col-xs-8 self-center">
          <div class="title">
            QID# {{ dataPoints['question'].questionId }}: {{ dataPoints['question'].question }}
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
                {{translateLabel('timekeeper', 'teamA')}}:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-accent text-white text-bold">
                {{ this['confrontations/confrontationsdGetter']['TeamA']['name'] }}
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
                {{teams[0].score}}
              </q-btn>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div
              class="col-lg-6 col-md-7"
              v-if="dataPoints['question']['type'] === 'tossUp'">
              <q-btn
                color="positive"
                class="buttonF"
                ref="buttonG"
                :disabled="disabled.add1">
                <q-icon center
                  size="50px"
                  name="check"
                  @click="point(10, teams[0].teamId, 'add1')"/>
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
                  @click="point(-5, teams[0].teamId, 'sub1')"/>
              </q-btn>
            </div>
            <div class="col-lg-6 col-md-5 col-sm-8 col-xs-8">
              <q-input outlined
                type="number"
                class="bonus"
                placeholder="Bonus"
                v-model="value.bonus1"
                color="primary"
                v-if="dataPoints['question']['type'] === 'bonus'"
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
                {{ this['confrontations/confrontationsdGetter']['TeamA']['name'] }}
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
                {{teams[1].score}}
              </q-btn>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-lg-6 col-md-7"
              v-if="dataPoints['question']['type'] === 'tossUp'">
              <q-btn
                color="positive"
                class="buttonF"
                ref="buttonA"
                :disabled="disabled.add2">
                <q-icon center
                  size="50px"
                  name="check"
                  @click="point(10, teams[1].teamId, 'add2')"/>
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
                  @click="point(-5, teams[1].teamId, 'sub2')"/>
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
                v-if="dataPoints['question']['type'] === 'bonus'"
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
      teams: [
        {
          teamId: 1,
          name: 'UDO',
          score: 0,
          id: 'A'
        },
        {
          teamId: 2,
          name: 'IUTA',
          score: 0,
          id: 'B'
        }
      ],
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
      question: [
        {
          questionId: 1,
          question: 'name 4 types of drilling fluids?',
          type: 'bonus'
        },
        {
          questionId: 2,
          question: 'name 3 features of packers:',
          type: 'bonus'
        },
        {
          questionId: 3,
          question: 'name 3 benchmark crudes:',
          type: 'bonus'
        },
        {
          questionId: 4,
          question: 'Which two phase pressure gradient correlation can be used for any pipe inclination and flow direction?',
          type: 'tossUp'
        },
        {
          questionId: 5,
          question: 'what is the concept of gas lift?',
          type: 'tossUp'
        },
        {
          questionId: 6,
          question: 'What mathematical tool is used in production engineering to assess well perfornance by plotting the well production rate against the bottom hole pressure?',
          type: 'tossUp'
        }
      ]
    }
  },
  created () {
    this.questionRandom()
    console.log(this['confrontations/confrontationsdGetter'])
  },
  computed: {
    ...mapGetters(['confrontations/confrontationsdGetter'])
  },
  methods: {
    /**
     * Sets poins teams
     * @param  {Number} point questions
     * @param  {Number} id teams
     * @param  {String} btn name button
     */
    point (point, id, btn) {
      console.log(this['confrontations/confrontationsdGetter'])
      for (let disabled in this.disabled) {
        if (disabled !== btn && !this.disabled[btn]) {
          this.disabled[disabled] = !this.disabled[disabled]
          this.teams.forEach((element) => {
            if (element['teamId'] === id) {
              if (this.dataPoints[element['id']] === 0) {
                this.dataPoints[element['id']] = point
                this.dataPoints['id'] = id
              } else {
                this.dataPoints[element['id']] = 0
              }
            }
          })
        }
      }
    },
    /**
     * Save points temas
     */
    saveRecords () {
      this.submitting = true
      setTimeout(() => {
        this.teams.map(element => {
          if (element['teamId'] === this.dataPoints['id']) {
            this['score/addQuestionRound'](this.dataPoints)
            element.score += this.dataPoints[element['id']]
            this.dataPoints['id'] = 0
            this.dataPoints[element['id']] = 0
            for (let disabled in this.disabled) {
              this.disabled[disabled] = false
            }
          }
        })
        if (this.dataPoints['question']['type'] === 'bonus') {
          this.teams[0]['score'] += Number(this.value['bonus1'])
          this.teams[1]['score'] += Number(this.value['bonus2'])
          this.dataPoints['A'] = this.value['bonus1']
          this.dataPoints['B'] = this.value['bonus2']
          this['score/addQuestionRound'](this.dataPoints)
          this.value['bonus2'] = 0
          this.value['bonus1'] = 0
          this.dataPoints['A'] = 0
          this.dataPoints['B'] = 0
        }
        this.questionRandom()
        this.submitting = false
      }, 1000)
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

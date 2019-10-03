<template>
  <q-page class="bg-blue-grey-1">
    <div class="q-pa-md">
      <div class="row q-pa-md justify-center">
        <div class="col-md-auto">
          <q-btn
            class="buttonQ"
            size="30px"
            color="green"
            label="Toss Up"
            v-if="dataPints['question']['type'] === 'tossUp'"/>
          <q-btn
            class="buttonQ"
            size="30px"
            color="negative"
            label="Bonus"
            v-if="dataPints['question']['type'] === 'bonus'"/>
        </div>
        <div class="q-ml-sm col-lg-10 col-md-10 col-sm-8 col-xs-8 self-center">
          <div class="title">
            QID# {{ dataPints['question'].questionId }}: {{ dataPints['question'].question }}
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
                A-Team:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-accent text-white text-bold">
                {{teams[0].name}}
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
              v-if="dataPints['question']['type'] === 'tossUp'">
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
                v-if="dataPints['question']['type'] === 'bonus'"
                :disabled="disabled.bonus1"/>
            </div>
          </div>
        </div>
        <!-- first team column -->
        <div class="col-md-5 col-sm-10 q-mt-lg bg-white">
          <!-- title - Team name -->
          <div class="row q-pa-md">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
              <q-toolbar-title class="text-h4 text-white text-center bg-accent">
                A-Team:
              </q-toolbar-title>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-8 col-xs-8">
              <q-toolbar-title class="text-h4 text-left bg-accent text-white text-bold">
                {{teams[1].name}}
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
                {{teams[1].score}}
              </q-btn>
            </div>
          </div>
          <div class="row q-pa-md justify-center">
            <div class="col-lg-6 col-md-7"
              v-if="dataPints['question']['type'] === 'tossUp'">
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
                v-if="dataPints['question']['type'] === 'bonus'"
                :disabled="disabled.bonus2"/>
            </div>
          </div>
        </div>
      </div>
      <div class="row q-pa-md justify-center">
        <div class="col-auto">
          <!-- Save -->
          <q-btn color="positive"
            class="buttonG"
            size="30px"
            @click="saveRecords">
            <q-icon left
              size="50px"
              name="save"/>
              <span>Record</span>
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
export default {
  name: 'ScoreKeeperComponent',
  data () {
    return {
      disabled: {
        add1: false,
        add2: false,
        sub1: false,
        sub2: false,
        bonus1: false,
        bonus2: false
      },
      value: {
        bonus1: 0,
        bonus2: 0
      },
      getConfrontations: [],
      teams: [
        {
          teamId: 1,
          name: 'UDO',
          score: 0
        },
        {
          teamId: 2,
          name: 'IUTA',
          score: 0
        }
      ],
      dataPints: {
        id: null,
        points: 0,
        question: null
      },
      question: [
        {
          questionId: 1,
          question: '¿Como estas?',
          type: 'bonus'
        },
        {
          questionId: 2,
          question: 'What color is the sky?',
          type: 'bonus'
        },
        {
          questionId: 3,
          question: '¿Te gusta el pan?',
          type: 'bonus'
        },
        {
          questionId: 4,
          question: '¿Tienes hambre?',
          type: 'tossUp'
        },
        {
          questionId: 5,
          question: '¿Que ladilla?',
          type: 'tossUp'
        },
        {
          questionId: 6,
          question: '¿Te gusta pasticho?',
          type: 'tossUp'
        }
      ]
    }
  },
  created () {
    this.questionRandom()
  },
  methods: {
    point (point, id, btn) {
      for (let disabled in this.disabled) {
        if (disabled !== btn && !this.disabled[btn]) {
          this.disabled[disabled] = !this.disabled[disabled]
          this.teams.forEach((element) => {
            if (element['teamId'] === id) {
              if (this.dataPints['points'] === 0) {
                this.dataPints['points'] = point
                this.dataPints['id'] = id
              } else {
                this.dataPints['points'] = 0
              }
            }
          })
        }
      }
    },
    saveRecords () {
      this.teams.map(element => {
        if (element['teamId'] === this.dataPints['id']) {
          element.score += this.dataPints['points']
          this.dataPints['id'] = 0
          this.dataPints['points'] = 0
          this.questionRandom()
          for (let disabled in this.disabled) {
            this.disabled[disabled] = false
          }
        }
      })
      if (this.dataPints['question']['type'] === 'bonus') {
        this.teams[0]['score'] += Number(this.value['bonus1'])
        this.teams[1]['score'] += Number(this.value['bonus2'])
        this.value['bonus2'] = 0
        this.value['bonus1'] = 0
        this.questionRandom()
      }
    },
    questionRandom () {
      this.dataPints['question'] = this.question[Math.floor(Math.random() * 6)]
    }
  }
}
</script>

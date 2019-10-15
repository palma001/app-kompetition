<template>
  <q-page class="bg-blue-grey-1">
    <div class="row q-pa-xl justify-center" style=" height: 810px">
      <div class="col-md-12 col-lg-11 q-pb-lg q-mt-lg bg-white">
        <!-- title - Team name -->
        <div class="row q-pa-md q-pb-xl justify-around">
          <div class="col-5">
            <q-toolbar-title class="text-h4 text-white text-center bg-primary">
              {{translateLabel('timekeeper', 'teamA')}}
              {{
                (confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'].toUpperCase() : ''
              }}
            </q-toolbar-title>
          </div>
          <div class="col-5">
            <q-toolbar-title class="text-h4 text-white text-center bg-primary">
              {{translateLabel('timekeeper', 'teamB') }}
              {{
                (confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'].toUpperCase() : ''
              }}
            </q-toolbar-title>
          </div>
        </div>
        <!-- time -->
        <div class="row q-pa-md justify-center">
          <div class="col-12">
            <q-toolbar-title class="q-mt-xl text-h3 text-center text-primary text-bold">
              Time
            </q-toolbar-title>
          </div>
        </div>
        <!-- Toolbar time -->
        <q-toolbar>
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 35px"
            align="center"
            color="positive"
            label="Start"
            @click="startTimer"/>
          <q-space></q-space>
          <q-btn size="35px"
            class="q-px-xl q-py-xs"
            align="center"
            outline
            disable
            :label="`${minutesRound}:${secondsRound}`" />
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 35px"
            align="center"
            color="negative"
            label="Stop"
            @click="stopTimer"/>
          <q-space></q-space>
        </q-toolbar>
        <!-- time adicional -->
        <div class="row q-pa-md justify-center">
          <div class="col-12">
            <q-toolbar-title class="q-mt-xl text-h3 text-center text-primary text-bold">
              Time
            </q-toolbar-title>
          </div>
        </div>
        <!-- Toolbar time adicional -->
        <q-toolbar>
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 30px"
            align="center"
            color="accent"
            label="restart"
            @click="restartQuestion" />
          <q-space></q-space>
          <q-btn size="35px"
            class="q-px-xl q-py-xs"
            align="center"
            outline
            disable
            :label="secondsQuestion"/>
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 30px"
            align="center"
            color="accent"
            label="Start"
            @click="startQuestion"/>
          <q-space></q-space>
        </q-toolbar>
      </div>
    </div>
    <q-toolbar>
      <img src="~assets/speTrans.png"
        class="q-mt-xs self-end"
        style="height: 150px">
      <q-space></q-space>
    </q-toolbar>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TimeKeeper',
  data () {
    return {
      /**
       * minutes confrontation
       * @type {Number}
       */
      minutesRound: 10,
      /**
       * secons confrontation
       * @type {Number}
       */
      secondsRound: 0,
      /**
       * secons question
       * @type {Number}
       */
      secondsQuestion: 5,
      /**
       * id interval
       * @type {Number}
       */
      setInterval: null,
      /**
       * Status timer
       * @type {Boolean}
       */
      stop: false,
      /**
       * status temporizator
       * @type {Boolean}
       */
      stopQuestion: false,
      /**
       * id interval question
       * @type {Number}
       */
      setIntervalQuestion: null,
      /**
       * Data confrontations playing
       * @type {Object}
       */
      confrontationPlaying: {}
    }
  },
  computed: {
    ...mapGetters(['confrontations/confrontationsdGetter'])
  },
  sockets: {
    /**
     * Time confronation
     * @param  {Object} time confrontations
     */
    time (time) {
      this.secondsRound = time.secondsRound
      this.minutesRound = time.minutesRound
    },
    /**
     * sets confrontation playing
     * @param  {Array} confrontation
     */
    confrontationsPlaying (confrontation) {
      this.confrontationPlaying = confrontation[0]
    }
  },
  methods: {
    /**
     * Temporizator
     */
    updateCounter () {
      this.secondsRound -= 1
      if (this.secondsRound <= 0 && this.minutesRound !== 0) {
        this.minutesRound -= 1
        this.secondsRound = 59
      }
      if (this.minutesRound === 0) {
        this.minutesRound = 10
        this.secondsRound = 0
        this.stopTimer()
      }
      this.$socket.emit('temporizator', {
        secondsRound: this.secondsRound,
        minutesRound: this.minutesRound
      })
    },
    /**
     * Stop Temporizator
     */
    stopTimer () {
      if (this.stop) {
        this.stop = false
        clearInterval(this.setInterval)
      }
    },
    /**
     * Start Temporizator
     */
    startTimer () {
      if (!this.stop) {
        this.stop = true
        this.setInterval = setInterval(this.updateCounter, 1000)
        if (this.minutesRound === 10) {
          this['confrontations/addStartTime'](
            {
              vm: this,
              params: {
                request: {
                  startTime: new Date(),
                  stopTime: null
                }
              }
            }
          )
        }
      }
    },
    /**
     * Tempirizator question
     */
    updateQuestion () {
      this.secondsQuestion -= 1
      if (this.secondsQuestion < 0) {
        this.restartQuestion()
      }
      this.$socket.emit('temporizatorQuestion', this.secondsQuestion)
    },
    /**
     * Start question
     */
    startQuestion () {
      if (!this.stopQuestion) {
        this.stopQuestion = true
        this.setIntervalQuestion = setInterval(this.updateQuestion, 1000)
      }
    },
    /**
     * restart question
     */
    restartQuestion () {
      this.secondsQuestion = 5
      if (this.stopQuestion) {
        this.stopQuestion = false
        clearInterval(this.setIntervalQuestion)
      }
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
        'confrontations/getConfrontations',
        'confrontations/addStartTime'
      ]
    )
  }
}
</script>

<style>
.title {
  background-color: white;
  padding: 20px;
  margin-inline-start: 10px;
}
.buttonQ {
  margin-inline-start: 40px;
}
.score {
  margin-inline-start: 330px;
  margin-top: 50px;
}
.title1 {
  margin-top: 1000px;
}
.buttonF {
  margin-inline-start: 10px;
}
.buttonG {
  margin-inline-start: 10px;
}
</style>

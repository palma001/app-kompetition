<template>
  <q-page
    class="bg-blue-grey-1">
    <div
      class="row q-pa-md justify-center text-primary">
      <div
        class="col-auto q-mt-md">
        <q-toolbar-title
          class="text-h4 text-left">
          Team-A:
        </q-toolbar-title>
      </div>
      <div
        class="col-3">
        <q-input
          outlined
          style="font-size: 25px"
          :placeholder="(confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'].toUpperCase() : ''"
          disable/>
      </div>
      <div
        class="col-auto q-mt-md q-ml-xl">
        <q-toolbar-title
          class="text-h4 text-left">
          Team-B:
        </q-toolbar-title>
      </div>
      <div
        class="col-3">
        <q-input
          outlined
          style="font-size: 25px"
          :placeholder="(confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'].toUpperCase() : ''"
          disable/>
      </div>
    </div>
    <!-- question section -->
    <div v-if="question.typeQuestion === 'TOSSUP'">
      <div class="row q-pa-md justify-center">
        <div class="col-11">
          <q-card dark
            bordered
            class="bg-primary my-card">
            <q-card-section>
              <div class="text-h5 text-grey-1 text-bold">QID #{{ question.id }}:</div>
            </q-card-section>
            <q-separator info
              inset />
            <q-card-section class="text-h4 text-grey-1">
              {{ question.question }}
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-pa-md q-mt-xl justify-center">
        <div class="col-11">
          <q-card dark
            bordered
            class="bg-secondary my-card">
            <q-card-section>
              <div class="text-h5 text-grey-1 text-bold">Answer:</div>
            </q-card-section>
            <q-separator info
              inset />
            <q-card-section class="text-h4 text-grey-1">
              {{ question.reply }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row q-pa-md justify-center">
        <div class="col-11">
          <q-card dark
            bordered
            class="bg-secondary my-card" style="height: 300px">
            <q-card-section>
              <div class="text-h5 text-grey-1 text-bold">BQ ID # {{ question.id }}:</div>
            </q-card-section>

            <q-separator info
              inset />
            <q-card-section class="text-h4 text-grey-1">
              {{ question.question }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-toolbar
      class="row q-pa-md q-mt-lg justify-center">
      <q-space></q-space>
      <q-btn
        class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        label="Bonus"
        push
        :disabled="statusButton"
        @click="nextOrbonus('BONUS')"/>
      <q-space></q-space>
      <q-btn
        class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        push
        label="next"
        :disabled="statusButtonNext"
        @click="nextOrbonus('TOSSUP')"/>
      <q-space></q-space>
    </q-toolbar>
  </q-page>
</template>

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
  margin-top: 30px;
}
.marks {
  margin-top: 100px;
}
.buttonF {
  margin-inline-start: 10px;
}
.buttonG {
  margin-inline-start: 10px;
}
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      /**
       * List questions
       * @type {Array}
       */
      question: [],
      /**
       * Confrontations playing
       * @type {Object}
       */
      confrontationPlaying: {},
      /**
       * Status button bonus
       * @type {Boolean}
       */
      statusButton: true,
      /**
       * Status button bonus
       * @type {Boolean}
       */
      statusButtonNext: true,
      /**
       * Error messagge
       * @type {String}
       */
      error: '',
      /**
       * Status buttons
       * @type {Boolean}
       */
      status: true
    }
  },
  sockets: {
    /**
     * Capture event the socket
     * @param  {Array} question question
     */
    getQuestions (question) {
      console.log(question)
      this.question = question
    },
    /**
     * Sets Confrontations
     * @param  {Array} confrontation
     */
    confrontationsPlaying (confrontation) {
      this.confrontationPlaying = confrontation[0]
    },
    /**
     * Status button bonus
     * @param {Boolean}
     */
    disabledBonus (status) {
      this.statusButton = status.bonus
      this.statusButtonNext = status.next
    },
    /**
     * Status buttons
     * @type {Boolean}
     */
    statusButton (status) {
      this.status = status
    }
  },
  created () {
    this.getRandomQuestions('TOSSUP')
  },
  methods: {
    /**
     * next question
     * @param  {String} typeQuestion type quesrtion
     */
    nextOrbonus (typeQuestion) {
      this.$socket.emit('disabledBonus', {
        bonus: true,
        next: true
      })
      setTimeout(() => {
        this.getRandomQuestions(typeQuestion)
      }, 100)
      this.updateQuestion(this.question['id'])
    },
    /**
     * Sets question
     * @return {String} Type questions
     */
    async getRandomQuestions (typeQuestion) {
      try {
        let params = {
          typeQuestion: typeQuestion,
          status: 'TOPLAY',
          random: true
        }
        let res = await this.$services.getData(['questions'], params)
        if (!res.status) throw new Error('Error Server')
        if (res.response.data.length === 0) throw new Error(`Questions ${typeQuestion} Empty`)
        this.$socket.emit('getQuestion', res.response.data[0])
      } catch (e) {
        this.$q.notify({
          position: 'center',
          color: 'negative',
          icon: 'report_problem',
          message: e.message
        })
      }
    },
    /**
     * Update state question
     * @param  {Number} id question
     */
    async updateQuestion (id) {
      let data = {
        status: 'PLAYED'
      }
      await this.$services.putData(['questions', id], data)
    }
  }
}
</script>

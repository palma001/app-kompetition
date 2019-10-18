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
    <div v-if="question.typeQuestion === 'tossup'">
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
        :disabled="statusButton"
        @click="nextOrbonus('bonus')"/>
      <q-space></q-space>
      <q-btn
        class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        label="next"
        :disabled="status"
        @click="nextOrbonus('tossup')"/>
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
      this.statusButton = status
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
    this.getRandomQuestions('tossup')
  },
  methods: {
    /**
     * next question
     * @param  {String} typeQuestion type quesrtion
     */
    nextOrbonus (typeQuestion) {
      this.statusButton = true
      setTimeout(() => {
        this.getRandomQuestions(typeQuestion)
      }, 100)
      this.updateQuestion(this.question['id'])
    },
    /**
     * Set question
     * @return {[type]} [description]
     */
    async getRandomQuestions (typeQuestion) {
      let params = {
        typeQuestion: typeQuestion,
        status: 'toplay',
        random: true
      }
      let { response } = await this.$services.getData(['questions'], params)
      if (!response.data[0]) {
        this.error = {
          error: true,
          message: 'No questions available'
        }
      }
      this.$socket.emit('getQuestion', response.data[0])
    },
    /**
     * Update state question
     * @param  {Number} id question
     */
    async updateQuestion (id) {
      let data = {
        status: 'played'
      }
      await this.$services.putData(['questions', id], data)
    }
  }
}
</script>

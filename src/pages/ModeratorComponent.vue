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
          :placeholder="(confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'] : ''"
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
          :placeholder="(confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'] : ''"
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
        @click="getRandomQuestions('bonus')"/>
      <q-space></q-space>
      <q-btn
        class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        label="next"
        @click="getRandomQuestions('tossup')"/>
      <q-space></q-space>
    </q-toolbar>
    <q-toolbar
      class="spe">
      <img
        src="~assets/speTrans.png"
        style="height: 150px">
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
       * [question description]
       * @type {[type]}
       */
      question: [],
      /**
       * [confrontationPlaying description]
       * @type {Object}
       */
      confrontationPlaying: {},
      /**
       * Status button bonus
       * @type {Boolean}
       */
      statusButton: true
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
    }
  },
  created () {
    this.getRandomQuestions('tossup')
  },
  methods: {
    /**
     * Set question
     * @return {[type]} [description]
     */
    async getRandomQuestions (typeQuestion) {
      let params = {
        typeQuestion: typeQuestion,
        status: 'toPlay',
        random: true
      }
      let { response } = await this.$services.getData(['questions'], params)
      this.$socket.emit('getQuestion', response.data[0])
    }
  }
}
</script>

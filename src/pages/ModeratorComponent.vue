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
          :placeholder="this['confrontations/confrontationsdGetter']['TeamA']['name']"
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
          :placeholder="this['confrontations/confrontationsdGetter']['TeamB']['name']"
          disable/>
      </div>
    </div>
    <!-- question section -->
    <div
      v-if="typeQuestion === 'tossUp'">
      <div class="row q-pa-md justify-center">
        <div class="col-11">
          <q-card dark
            bordered
            class="bg-primary my-card">
            <q-card-section>
              <div class="text-h5 text-grey-1 text-bold">
                QID #{{
                  this['question/getRamdomQuestionGetter']['id']
                }}:
              </div>
            </q-card-section>
            <q-separator info
              inset />
            <q-card-section class="text-h4 text-grey-1">
              {{
                this['question/getRamdomQuestionGetter']['question']
              }}
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
              {{
                this['question/getRamdomQuestionGetter']['reply']
              }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div
      class="row q-pa-md justify-center"
      v-else>
      <div
        class="col-11">
        <q-card
          dark
          bordered
          class="bg-negative my-card"
          style="height: 300px">
          <q-card-section>
            <div
              class="text-h5 text-grey-1 text-bold">
              BQ ID #{{
                this['question/getRamdomQuestionGetter']['id']
              }}
            </div>
          </q-card-section>

          <q-separator
            info
            inset />
          <q-card-section
            class="text-h4 text-grey-1">
            {{
              this['question/getRamdomQuestionGetter']['question']
            }}
          </q-card-section>
        </q-card>
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
        @click="getBonusRandom"/>
      <q-space></q-space>
      <q-btn
        class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        :disabled="disabledNext"
        label="next"
        @click="questionRandom"/>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Moderator',
  data () {
    return {
      typeQuestion: 'tossUp',
      disabledNext: true
    }
  },
  created () {
    this.questionRandom()
  },
  computed: {
    ...mapGetters(
      [
        'confrontations/confrontationsdGetter',
        'question/getRamdomQuestionGetter'
      ]
    )
  },
  methods: {
    /**
     *
     */
    questionRandom () {
      this.typeQuestion = 'tossUp'
      this.disabledNext = true
      let payload = {
        vm: this,
        params: {
          random: true,
          typeQuestion: 'tossup'
        }
      }
      this['question/getRamdomQuestion'](payload)
    },
    /**
     *
     */
    getBonusRandom () {
      this.typeQuestion = 'bonus'
      this.disabledNext = false
      let payload = {
        vm: this,
        params: {
          random: true,
          typeQuestion: 'bonus'
        }
      }
      this['question/getRamdomQuestion'](payload)
    },
    ...mapActions(['question/getRamdomQuestion'])
  }
}
</script>

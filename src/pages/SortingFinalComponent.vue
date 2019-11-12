<template>
  <q-page class="bg-grey-1">
    <img src="~assets/llaves_final.png"
      style="position: absolute; width: 100%; height: 100%" />
    <div class="row q-pa-lg">
      <!-- Clasificados lado left -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-ml-xl q-mt-xs">
            <q-btn
              size="20px"
              class="q-px-xl q-ml-xl q-py-xs"
              style="width: 180px;"
              align="center"
              color="primary"
              :label="(confrontations[0] && confrontations[0]['TeamA']) ? confrontations[0]['TeamA']['name'] : 'to play'" />
          </div>
          <div
            class="button1 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              style="width: 120px;"
              outline
              color="primary">
              {{
                (confrontations[0] && confrontations[0]['TeamA']) ? confrontations[0]['TeamA']['score'] : 0
              }}
            </q-btn>
          </div>
          <div class="col-12 q-ml-xl q-mt-xs">
            <q-btn size="20px"
              style="width: 180px;"
              class="button2 q-px-xl q-ml-xl q-py-xs"
              align="center"
              color="primary">
              {{
                (confrontations[0] && confrontations[0]['TeamB']) ? confrontations[0]['TeamB']['name'] : 'to play'
              }}
            </q-btn>
          </div>
          <div class="button1 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              color="primary">
              {{
                (confrontations[0] && confrontations[0]['TeamB']) ? confrontations[0]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <!-- Ganador lado left -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              style="width: 166px;"
              class="button3 q-px-xl q-ml-xl q-py-xs"
              align="center"
              color="negative">
              {{
                (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamA']) ? confrontationsPhaseFinal[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="button4 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-ml-xl q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative">
              {{ (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamA']) ? confrontationsPhaseFinal[0]['TeamA']['score'] : 0 }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="button6 q-px-xl q-ml-xl q-py-xs"
              align="center"
              style="width: 180px;"
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamA']) ? confrontations3er[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="button4 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-ml-xl q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamA']) ? confrontations3er[0]['TeamA']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <!-- GANADOR Y 3er puesto- Center -->
      <div class="col-2 q-ml-lg">
        <div class="row">
          <div class="col-12 q-mt-xl">
            <q-btn size="30px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              style="width: 180px;"
              color="primary">
              {{
                (winner[0] && winner[0]['TeamA']) ? winner[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="button5 col-12 q-mt-xl">
            <q-btn size="20px"
              class="q-px-xl  q-ml-md q-py-xs"
              align="center"
              style="width: 180px;"
              color="primary">
              {{
                (winner3er[0] && winner3er[0]['TeamA']) ? winner3er[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <!-- Ganador lado right -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-mt-xs button3">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              style="width: 166px; margin-left: -32px;"
              color="negative">
              {{
                (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamB']) ? confrontationsPhaseFinal[0]['TeamB']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="button8 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative">
              {{
                (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamB']) ? confrontationsPhaseFinal[0]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="button6 q-px-xl q-ml-md q-py-xs"
              align="center"
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamB']) ? confrontations3er[0]['TeamB']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="button8 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamB']) ? confrontations3er[0]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <!-- Clasificados lado right -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              style="width: 180px; margin-left: 15px;"
              align="center"
              color="primary"
              :label="(confrontations[1] && confrontations[1]['TeamA']) ? confrontations[1]['TeamA']['name'] : 'to play'" />
          </div>
          <div class="col-12 q-mt-xs q-ml-xl">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              style="width: 120px;"
              outline
              color="primary">
              {{
                (confrontations[1] && confrontations[1]['TeamA']) ? confrontations[1]['TeamA']['score'] : 0
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              style="width: 180px; margin-left: 15px;"
              class="button2 q-px-xl q-py-xs"
              align="center"
              color="primary">
              {{
                (confrontations[1] && confrontations[1]['TeamB']) ? confrontations[1]['TeamB']['name'] : 'to play'
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs q-ml-xl"
              align="center"
              outline
              color="primary">
              {{
                (confrontations[1] && confrontations[1]['TeamB']) ? confrontations[1]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.button1 {
  margin-left: 110px;
}
.button2 {
  margin-top: 200px;
}
.button3 {
  margin-top: 150px;
  margin-left: 50px;
}
.button4 {
  margin-left: 10px;
}
.button8 {
  margin-left: 30px;
}
.button5 {
  margin-left: 15px;
  margin-top: 430px;
}
.button6 {
  margin-top: 370px;
}
.button7 {
  margin-left: 30px;
}
.spe {
  margin-top: 30px;
}
</style>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SortingFinalComponent',
  data () {
    return {
      /**
       * Confrontations
       * @type {Array}
       */
      confrontations: [],
      /**
       * Confrontations final
       * @type {Array}
       */
      confrontationsPhaseFinal: [],
      /**
       * Confrontations 3er
       * @type {Array}
       */
      confrontations3er: [],
      /**
       * Confrontations 3er
       * @type {Array}
       */
      confrontations3erFinal: [],
      /**
       * Confrontations 3er
       * @type {Array}
       */
      winner3er: [],
      /**
       * Confrontations 3er
       * @type {Array}
       */
      winner: []
    }
  },
  sockets: {
    confrontations (confrontations) {
      this.getConfrontations(confrontations)
    }
  },
  methods: {
    async getConfrontations (data) {
      let datas = await this['confrontations/getScoreTeam'](
        {
          vm: this,
          data: data
        }
      )
      this.confrontations = this.getConfrontationsPhaseTree(datas, 3)
      this.confrontationsPhaseFinal = this.getConfrontationsPhaseTree(datas, 6)
      this.confrontations3er = this.getConfrontationsPhaseTree(datas, 4)
      this.winner3er = this.getConfrontationsPhaseTree(datas, 5)
      this.winner = this.getConfrontationsPhaseTree(datas, 7)
    },
    /**
     * Sets phase final
     * @param  {Array} data confrontations
     * @param  {Number} phase number
     * @return {Array}
     */
    getConfrontationsPhaseTree (data, phase) {
      let newData = data.filter(element => {
        return element['phaseId'] === phase
      })
      if (newData.length <= 1) {
        newData.push(
          {
            TeamA: {
              name: 'To play',
              score: 0
            },
            TeamB: {
              name: 'To play',
              score: 0
            }
          }
        )
      }
      return newData
    },
    ...mapActions(
      ['confrontations/getScoreTeam', 'confrontations/getConfrontations']
    )
  }
}
</script>

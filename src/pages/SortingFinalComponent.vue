<template>
  <q-page class="bg-grey-1">
    <div class="row q-pa-lg justify-center">
      <!-- Clasificados lado left -->
      <div class="col-2">
        <div class="row">
          <div class="col-12 q-mt-md buttonSemifinal2">
            <q-btn
              style="width: 100%;  font-weight: bold;"
              class="q-px-xl "
              align="center"
              color="primary"
              :label="(confrontations[0] && confrontations[0]['TeamA']) ? confrontations[0]['TeamA']['name'] : 'to play'" />
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn
              class="q-px-xl"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="primary">
              {{
                (confrontations[0] && confrontations[0]['TeamA']) ? confrontations[0]['TeamA']['score'] : 0
              }}
            </q-btn>
          </div>
          <div class="col-12 buttonSemifinal1">
            <q-btn
              style="width: 100%; font-weight: bold;"
              class="button2 q-px-xl"
              align="center"
              color="primary">
              {{
                (confrontations[0] && confrontations[0]['TeamB']) ? confrontations[0]['TeamB']['name'] : 'to play'
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn
              class="q-px-xl"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="primary">
              {{
                (confrontations[0] && confrontations[0]['TeamB']) ? confrontations[0]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-1">
        <img src="../statics/final_right.png" class="imgR">
      </div>
      <!-- Ganador lado left -->
      <div class="col-2">
        <div class="row">
          <div class="col-12 winnerSemifinal">
            <q-btn
              style="width: 100%; font-weight: bold;"
              class="button3 q-px-xl"
              align="center"
              color="negative">
              {{
                (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamA']) ? confrontationsPhaseFinal[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="col-12">
            <q-btn
              class="q-mt-xs q-px-xl"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="negative">
              {{ (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamA']['score']) ? confrontationsPhaseFinal[0]['TeamA']['score'] : 0 }}
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-2 imgCenter">
        <div class="row">
          <div class="col-12">
            <q-btn
              size="20px"
              class="q-px-xl q-ml-md"
              align="center"
              style="margin-left: 2%; width: 95%; font-weight: bold;"
              color="primary">
              {{
                (winner[0] && winner[0]['TeamA']) ? winner[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-sm">
            <img src="../statics/final_center.png"/>
          </div>
        </div>
      </div>
      <div class="col-2 winnerSemifinal">
        <div class="row">
          <div class="col-12">
            <q-btn
              class="q-px-xl"
              style="width: 100%; font-weight: bold;"
              color="negative">
              {{
                (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamB']) ? confrontationsPhaseFinal[0]['TeamB']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="col-12">
            <q-btn
              class="q-px-xl q-mt-xs"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="negative">
              {{
                (confrontationsPhaseFinal[0] && confrontationsPhaseFinal[0]['TeamB']) ? confrontationsPhaseFinal[0]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-1">
        <img src="../statics/final_left.png" class="imgLeft" />
      </div>
      <div class="col-2">
        <div class="row">
          <div class="col-12 q-ml-sm buttonSemifinal2">
            <q-btn
              class="q-px-xl"
              style="width: 100%; font-weight: bold;"
              align="center"
              color="primary"
              :label="(confrontations[1] && confrontations[1]['TeamA']) ? confrontations[1]['TeamA']['name'] : 'to play'" />
          </div>
          <div class="col-12 q-mt-sm">
            <q-btn
              class="q-px-xl"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="primary">
              {{
                (confrontations[1] && confrontations[1]['TeamA']) ? confrontations[1]['TeamA']['score'] : 0
              }}
            </q-btn>
          </div>
          <div class="col-12 q-ml-sm buttonSemifinalLeft1">
            <q-btn
              style="width: 100%; font-weight: bold;"
              class="button2 q-px-xl"
              align="center"
              color="primary">
              {{
                (confrontations[1] && confrontations[1]['TeamB']) ? confrontations[1]['TeamB']['name'] : 'to play'
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-sm">
            <q-btn
              class="q-px-xl"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
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
    <div class="row q-pa-lg justify-center">
      <div class="col-2 button3r">
        <div class="row">
          <div class="col-12 button3">
            <q-btn
              class="q-px-xl"
              style="width: 100%; font-weight: bold;"
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamA']) ? confrontations3er[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="button8 col-12">
            <q-btn
              class="q-px-xl q-mt-sm"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamA']['score']) ? confrontations3er[0]['TeamA']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div class="row">
          <div class="col-12">
            <q-btn
              size="20px"
              class="q-px-xl q-ml-md"
              align="center"
              style="margin-left: 2%; width: 95%; font-weight: bold;"
              color="primary">
              {{
                (winner3er[0] && winner3er[0]['TeamA']) ? winner3er[0]['TeamA']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-sm">
            <img src="../statics/final_center.png"/>
          </div>
        </div>
      </div>
      <div class="col-2 button3r">
        <div class="row">
          <div class="col-12">
            <q-btn
              class="q-px-xl"
              align="center"
              style="width: 100%; font-weight: bold;"
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamB']) ? confrontations3er[0]['TeamB']['name'] : 'To play'
              }}
            </q-btn>
          </div>
          <div class="col-12">
            <q-btn
              class="q-px-xl q-mt-sm"
              align="center"
              style="margin-left: 25%; font-weight: bold;"
              outline
              color="negative">
              {{
                (confrontations3er[0] && confrontations3er[0]['TeamB']) ? confrontations3er[0]['TeamB']['score'] : 0
              }}
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
  .buttonSemifinal1 {
    margin-top: 130px;
  }
  .buttonSemifinalPoint {
    margin-left: 50%;
    margin-top: 5px;
  }
  .winnerSemifinal {
    margin-top: 150px;
  }
  .imgLeft {
    margin-top: -5px;
    margin-left: 10px;
    height: 340px;
  }
  .imgR {
    height: 325px;
  }
  @media (min-width: 0px) and (max-width: 1500px)  {
    .buttonSemifinal1 {
      margin-top: 90px;
    }
    .winnerSemifinal {
      margin-top: 95px;
    }
    .imgCenter {
      margin-top: 30px;
    }
    .imgLeft, .imgR {
      height: 220px;
    }
    .buttonSemifinalLeft1 {
      margin-top: 100px;
    }
    .button3r {
      margin-top: 65px;
    }
  }
  @media (min-width: 1500px) and (max-width: 3000px)  {
    .buttonSemifinal1, .buttonSemifinalLeft1 {
      margin-top: 180px;
    }
    .buttonSemifinal2 {
      margin-top: 30px;
    }
    .imgCenter {
      margin-top: 75px;
    }
    .button3r {
      margin-top: 80px;
    }
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

<template>
  <q-page class="bg-grey-1">
    <div class="row q-pa-lg">
      <div class="col-4 q-ml-xl">
        <div class="row phase1"
          v-for="(confrontation, index) in confrontations"
          :key="confrontation.id">
          <div class="col-10">
            <div class="row">
              <div :class="(index > 0) ? 'col-12 q-ml-xl buttonsTop' : 'col-12 q-ml-xl'" v-if="(confrontation.status !== 'DEFINITION' && confrontation.status !== 'DEFINITION_PLAYED') && confrontation.phaseId === 1">
                <q-btn
                  size="20px"
                  class="q-px-xl q-ml-xl"
                  style="width: 0px"
                  outline
                  color="primary">
                  {{ (confrontation['TeamA']) ? confrontation['TeamA']['score'] : 0 }}
                </q-btn>
                <q-btn
                  style="width: 180px; padding: 5px;"
                  size="20px"
                  class="q-px-xl q-ml-md"
                  color="primary">
                  <q-toolbar-title
                    class="text-center"
                    style="font-size: 16px; font-weight: bold;">
                    {{ (confrontation['TeamA']) ? confrontation['TeamA']['name'] : 'To play' }}
                  </q-toolbar-title>
                </q-btn>
              </div>
              <div class="col-12 q-mt-md q-ml-xl" v-if="(confrontation.status !== 'DEFINITION' && confrontation.status !== 'DEFINITION_PLAYED') && confrontation.phaseId === 1">
                <q-btn
                  size="20px"
                  class="q-px-xl q-ml-xl"
                  style="width: 0px"
                  outline
                  color="primary">
                  {{ (confrontation['TeamB']) ? confrontation['TeamB']['score'] : 0 }}
                </q-btn>
                <q-btn
                  size="20px"
                  style="width: 180px; padding: 5px;"
                  class="q-px-xl q-ml-md"
                  color="negative">
                  <q-toolbar-title
                    class="text-center text-white"
                    style="font-size: 16px; font-weight: bold;">
                    {{ (confrontation['TeamB']) ? confrontation['TeamB']['name'] : 'To play' }}
                  </q-toolbar-title>
                </q-btn>
              </div>
            </div>
          </div>
          <div :class="(index > 0) ? 'col-2 q-mt-lg' : 'col-2'"
            v-if="(confrontation.status !== 'DEFINITION' && confrontation.status !== 'DEFINITION_PLAYED') && confrontation.phaseId === 1">
            <img src="~assets/part_1.svg" class="imgSorting"/>
          </div>
        </div>
      </div>
      <div class="col-3 q-ml-xl phase2">
        <div class="row"
          v-for="(confrontation, index) in confrontationsPhase2"
          :key="confrontation.id">
          <div class="col-10">
            <div class="row">
              <div :class="(index === 0) ? 'col-12 q-mt-lg' : (index > 0) ? 'col-12 q-mt-lg' : 'col-12'"
                v-if="confrontation.phaseId === 2">
                <q-btn size="20px"
                  style="width: 150px; padding: 5px; margin-top: 13px"
                  class="q-px-xl q-ml-md q-py-xs"
                  align="center"
                  color="primary">
                  <q-toolbar-title
                    class="text-center"
                    style="font-size: 16px; font-weight: bold;">
                    {{ (confrontation['TeamA']) ? confrontation['TeamA']['name'] : 'To play' }}
                  </q-toolbar-title>
                </q-btn>
              </div>
              <div class="col-12 q-mt-xs" v-if="confrontation.phaseId === 2">
                <q-btn
                  size="20px"
                  class="q-px-xl q-py-sm button6"
                  style="width: 120px"
                  outline
                  color="primary">
                  {{ (confrontation['TeamA'] && confrontation['TeamA']['score']) ? confrontation['TeamA']['score'] : 0 }}
                </q-btn>
              </div>
              <div class="col-12 q-mt-lg" v-if="confrontation.phaseId === 2">
                <q-btn size="20px"
                  style="width: 150px; padding: 5px;"
                  class="q-px-xl q-ml-md"
                  color="negative">
                  <q-toolbar-title
                    class="text-center"
                    style="font-size: 16px; font-weight: bold;">
                    {{ (confrontation['TeamB']) ? confrontation['TeamB']['name'] : 'To play' }}
                  </q-toolbar-title>
                </q-btn>
              </div>
              <div class="col-12 q-mt-xs" v-if="confrontation.phaseId === 2">
                <q-btn
                  size="20px"
                  class="q-px-xl button6"
                  outline
                  style="width: 120px"
                  color="primary">
                  {{ (confrontation['TeamB']) ? confrontation['TeamB']['score'] : 0 }}
                </q-btn>
              </div>
            </div>
          </div>
          <div class="col-2"
            v-if="(confrontation.status !== 'DEFINITION' && confrontation.status !== 'DEFINITION_PLAYED') && confrontation.phaseId === 2">
            <img src="~assets/part_2.svg" class="imgPhase2"/>
          </div>
        </div>
      </div>
      <div class="col-3 col-lg-2 q-ml-xl q-mt-lg">
        <div class="row justify-end"
          v-for="(confrontation, index) in confrontations"
          :key="confrontation.id">
          <div :class="(index === 10) ? 'button9 col-auto bg-pink' : 'button7 col-auto'"
            v-if="confrontation.phaseId === 3">
            <q-btn size="20px"
              class="q-px-xl"
              style="width: 180px; padding: 5px;"
              color="primary">
              <q-toolbar-title
                class="text-center"
                style="font-size: 16px; font-weight: bold;">
                {{ (confrontation['TeamA']) ? confrontation['TeamA']['name'] : 'To play' }}
              </q-toolbar-title>
            </q-btn>
          </div>
          <div :class="(index === 10) ? 'lastnbutton col-auto bg-pink' : 'button8 col-auto'"
            v-if="confrontation.phaseId === 3">
            <q-btn size="20px"
              class="q-px-xl"
              style="width: 180px; padding: 5px;"
              color="primary">
              <q-toolbar-title
                class="text-center"
                style="font-size: 16px; font-weight: bold;">
                {{ (confrontation['TeamB']) ? confrontation['TeamB']['name'] : 'To play' }}
              </q-toolbar-title>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.imgSorting {
  position: absolute;
  width: 500px;
  height: 500px;
}
.imgPhase2 {
  width: 300px;
  height: 120px;
}
.buttonsTop {
  margin-top: 20px;
}
@media (min-width: 0px) and (max-width: 400px)  {
  .imgSorting {
    position: absolute;
    width: 500px;
    height: 500px;
    margin-left: 15%;
  }
  .phase2 {
    margin-left: 15%;
  }
}
@media (min-width: 400px) and (max-width: 900px)  {
  .imgSorting {
    position: absolute;
    width: 500px;
    height: 500px;
    margin-left: 15%;
  }
  .phase2 {
    margin-left: 15%;
  }
}
@media (min-width: 900px) and (max-width: 1300px)  {
  .imgSorting {
    width: 300px;
    height: 120px;
    position: absolute;
    left: 359px;
  }
  .imgPhase2 {
    width: 400px;
    height: 160px;
    left: 900px;
    margin-top: 40px;
    position: absolute;
  }
  .phase2 {
    margin-left: 22%;
  }
  .phase1 {
    margin-left: -27%;
  }
}
@media (min-width: 1300px) and (max-width: 1500px)  {
  .imgSorting {
    width: 270px;
    height: 120px;
    position: absolute;
    left: 335px;
  }
  .imgPhase2 {
    width: 350px;
    height: 160px;
    left: 750px;
    margin-top: 40px;
    position: absolute;
  }
  .phase1 {
    margin-left: -29%;
  }
  .phase2 {
    margin-left: 6%;
  }
  .button7 {
    margin-top: 100px;
    margin-left: 200px;
  }
  .button8 {
    margin-left: 60px;
  }
}
@media (min-width: 1500px) and (max-width: 1800px)  {
  .imgSorting {
    width: 300px;
    height: 120px;
    position: absolute;
    left: 410px;
  }
  .imgPhase2 {
    width: 500px;
    height: 160px;
    left: 960px;
    margin-top: 40px;
    position: absolute;
  }
  .phase1 {
    margin-left: -10%;
  }
  .phase2 {
    margin-left: 11%;
  }
  .button7 {
    margin-top: 100px;
  }
  .button8 {
    margin-left: 170px;
  }
}
@media (min-width: 1800px) and (max-width: 3000px)  {
  .imgSorting {
    width: 300px;
    height: 120px;
    position: absolute;
    left: 460px;
  }
  .imgPhase2 {
    width: 500px;
    height: 160px;
    left: 950px;
    margin-top: 40px;
    position: absolute;
  }
  .phase2 {
    margin-left: 6%;
  }
  .button7 {
    margin-top: 200px;
  }
  .button8 {
    margin-left: 170px;
  }
}
.button1 {
  margin-left: 30px;
}
.button2 {
  margin-top: 20px;
}
.button3 {
  margin-top: 30px;
}
.button4 {
  margin-top: 30px;
}
.button5 {
  margin-top: 30px;
}
.button6 {
  margin-left: 30px;
}
.button7 {
  margin-top: 60px;
}
.button8 {
  margin-top: 220px;
}
.button9 {
  margin-top: 230px;
  float: right;
}
.lastnbutton {
  margin-top: 30px;
  margin-left: 200px;
}
</style>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SortingScreen',
  data () {
    return {
      indexPhase: 0,
      /**
       * Confrontations
       * @type {Array}
       */
      confrontations: [],
      /**
       * Questions rounds
       * @type {Array}
       */
      data: [],
      confrontationsPhase2: [],
      /**
       * Params confrontations
       * @type {Object}
       */
      params: {
        requestPhases: false,
        events: {
          done: false
        },
        phase: {},
        query: {}
      }
    }
  },
  sockets: {
    confrontations (confrontations) {
      this.getScoreTeam()
    }
  },
  methods: {
    /**
     * Sets score teams
     * @param  {Array} confrontations All confrontations
     */
    async getScoreTeam () {
      let confrontationsAll = await this['confrontations/getConfrontations'](
        {
          params: this.params,
          vm: this
        }
      )
      if (confrontationsAll) {
        this.confrontations = await this['confrontations/getScoreTeam'](
          {
            vm: this,
            data: confrontationsAll
          }
        )
        this.confrontationsPhase2 = []
        this.confrontations.map(element => {
          if (element.phaseId === 2) {
            this.confrontationsPhase2.push(element)
          }
        })
      }
    },
    ...mapActions(
      ['confrontations/getScoreTeam', 'confrontations/getConfrontations']
    )
  }
}
</script>

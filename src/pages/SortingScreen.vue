<template>
  <q-page class="bg-grey-1">
    <img src="~assets/llaves.png" class="imgSorting"/>
    <div class="row q-pa-lg">
      <div class="col-4 q-ml-xl">
        <div class="row phase1"
          v-for="(confrontation, index) in confrontations"
          :key="confrontation.id">
          <div :class="(index > 0) ? 'col-12 q-ml-xl buttonsTop' : 'col-12 q-ml-xl'" v-if="confrontation.phaseId === 1">
            <q-btn
              size="20px"
              class="q-px-xl q-ml-xl q-py-xs"
              align="center"
              style="width: 120px"
              outline
              color="primary">
                {{ confrontation['TeamA']['score'] }}
              </q-btn>
            <q-btn
              style="width: 150px"
              size="20px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              color="primary"
              :label="confrontation['TeamA']['name']" />
          </div>
          <div class="col-12 q-mt-md q-ml-xl" v-if="confrontation.phaseId === 1">
            <q-btn
              size="20px"
              class="q-px-xl q-ml-xl q-py-xs"
              align="center"
              style="width: 120px"
              outline
              color="primary">
              {{ confrontation['TeamB']['score'] }}
            </q-btn>
            <q-btn
              size="20px"
              style="width: 150px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              color="negative"
              :label="confrontation['TeamB']['name']" />
          </div>
        </div>
      </div>
      <div class="col-3 q-ml-xl phase2">
        <div class="row"
          v-for="(confrontation, index) in confrontations"
          :key="confrontation.id">
          <div :class="(index > 0) ? 'col-12 q-mt-xl' : 'col-12 q-mt-xs'" v-if="confrontation.phaseId === 2">
            <q-btn size="20px"
              style="width: 150px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              color="primary"
              :label="confrontation['TeamA']['name']" />
          </div>
          <div class="col-12 q-mt-xs" v-if="confrontation.phaseId === 2">
            <q-btn size="20px"
              class="q-px-xl q-py-xs button6"
              align="center"
              style="width: 120px"
              outline
              color="primary">
              {{ confrontation['TeamB']['score'] }}
            </q-btn>
          </div>
          <div class="col-12 q-mt-lg" v-if="confrontation.phaseId === 2">
            <q-btn size="20px"
              style="width: 150px; margin-top: 5px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              color="primary"
              :label="confrontation['TeamB']['name']" />
          </div>
          <div class="col-12 q-mt-xs" v-if="confrontation.phaseId === 2">
            <q-btn size="20px"
              class="q-px-xl q-py-xs button6"
              align="center"
              outline
              color="primary">
              {{ confrontation['TeamB']['score'] }}
            </q-btn>
          </div>
        </div>
      </div>
      <div class="col-3 q-ml-lg">
        <div class="row justify-end">
          <div class="button7 col-auto">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              color="primary"
              align="center"
              label="UDO 26" />
          </div>
          <div class="button8 col-auto q-mt-xl">
            <q-btn size="20px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              color="negative"
              label="UDO 25" />
          </div>
          <div class="button9 col-auto q-mt-xl">
            <div class="row justify-end">
              <div class="col-auto col-lg-7">
                <q-btn size="20px"
                  class="q-px-xl q-py-xs"
                  align="center"
                  color="primary"
                  label="UDO 25" />
              </div>
              <div class="col-sm-6 col-md-6 col-lg-7 q-mt-xl">
                <q-btn size="20px"
                  class="q-px-xl"
                  align="center"
                  color="negative"
                  label="UDO 25" />
              </div>
            </div>
          </div>
        </div>
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

<style>
.imgSorting {
  position: absolute;
  width: 100%;
  height: 100%;
}
.buttonsTop {
  margin-top: 20px;
}
@media (min-width: 0px) and (max-width: 400px)  {
  .imgSorting {
    position: absolute;
    width: 80%;
    height: 100%;
    margin-left: 15%;
  }
  .phase2 {
    margin-left: 15%;
  }
}
@media (min-width: 400px) and (max-width: 900px)  {
  .imgSorting {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: 15%;
  }
  .phase2 {
    margin-left: 15%;
  }
}
@media (min-width: 900px) and (max-width: 1300px)  {
  .imgSorting {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: 6%;
  }
  .phase2 {
    margin-left: 5%;
  }
  .phase1 {
    margin-left: -26%;
  }
}
@media (min-width: 1300px) and (max-width: 1500px)  {
  .imgSorting {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: 0%;
  }
  .phase1 {
    margin-left: -26%;
  }
  .phase2 {
    margin-left: 0%;
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
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: 0%;
  }
  .phase1 {
    margin-top: -10px;
    margin-left: -10%;
  }
  .phase2 {
    margin-left: 0%;
  }
  .button7 {
    margin-top: 100px;
  }
  .button8 {
    margin-left: 170px;
  }
  .button9 {
    margin-right: -30px;
  }
}
@media (min-width: 1800px) and (max-width: 3000px)  {
  .imgSorting {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: -1%;
  }
  .phase2 {
    margin-left: 3%;
  }
  .button7 {
    margin-top: 200px;
  }
  .button8 {
    margin-left: 170px;
  }
  .button9 {
    margin-right: -30px;
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
  margin-left: 40px;
}
.button7 {
  margin-top: 60px;
}
.button8 {
  margin-top: 220px;
}
.button9 {
  margin-top: 230px;
}
.button10 {
  margin-top: 55px;
}
</style>

<script>
export default {
  name: 'SortingScreen',
  data () {
    return {
      /**
       * Confrontations
       * @type {Array}
       */
      confrontations: [],
      /**
       * Questions rounds
       * @type {Array}
       */
      data: []
    }
  },
  sockets: {
    confrontations (confrontations) {
      this.confrontations = confrontations
      this.getScoreTeam(confrontations)
    }
  },
  methods: {
    /**
     * Gets Score team
     */
    getScoreTeam (data) {
      data.map(confrontation => {
        this.confrontations = []
        this.$services.getData(['confrontation', confrontation['id'], 'question-round'])
          .then(res => {
            confrontation.TeamA.score = 0
            confrontation.TeamB.score = 0
            res['response']['data'].map(score => {
              if (confrontation['id'] === score['confrontationId']) {
                confrontation.TeamA.score += Number(score['scoreA'])
                confrontation.TeamB.score += Number(score['scoreB'])
              }
            })
            this.confrontations.push(confrontation)
          })
      })
    }
  }
}
</script>

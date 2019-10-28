<template>
  <q-page class="bg-grey-1">
    <img src="~assets/llaves_final.png"
      style="position: absolute; width: 100%; height: 100%" />
    <div class="row q-pa-lg">
      <!-- Clasificados lado left -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-ml-xl q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-ml-xl q-py-xs"
              style="width: 150px;"
              align="center"
              color="primary"
              :label="(confrontations[0]['TeamA']) ? confrontations[0]['TeamA']['name'] : 'To Play'" />
          </div>
          <div class="button1 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              style="width: 120px;"
              outline
              color="primary"
              :label="(confrontations[0]['TeamA']) ? confrontations[0]['TeamA']['score'] : 0" />
          </div>
          <div class="col-12 q-ml-xl q-mt-xs">
            <q-btn size="20px"
              class="button2 q-px-xl q-ml-xl q-py-xs"
              align="center"
              color="primary"
              :label="(confrontations[0]['TeamB']) ? confrontations[0]['TeamB']['name'] : 'To Play'" />
          </div>
          <div class="button1 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              color="primary"
              :label="(confrontations[0]['TeamB']) ? confrontations[0]['TeamB']['score'] : 'To Play'" />
          </div>
        </div>
      </div>
      <!-- Ganador lado left -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              style="width: 160px;"
              class="button3 q-px-xl q-ml-xl q-py-xs"
              align="center"
              color="negative"
              :label="'To Play'"/>
          </div>
          <div class="button4 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-ml-xl q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative"
              label="1000" />
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="button6 q-px-xl q-ml-xl q-py-xs"
              align="center"
              style="width: 150px;"
              color="negative"
              label="UDO 25" />
          </div>
          <div class="button4 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-ml-xl q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative"
              label="1000" />
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
              style="width: 150px;"
              color="primary"
              label="UDO 25" />
          </div>
          <div class="button5 col-12 q-mt-xl">
            <q-btn size="20px"
              class="q-px-xl  q-ml-md q-py-xs"
              align="center"
              style="width: 150px;"
              color="primary"
              label="UDO 25" />
          </div>
        </div>
      </div>
      <!-- Ganador lado right -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              style="width: 160px; margin-top: 150px; margin-left: 20px;"
              color="negative"
              label="UDO 25" />
          </div>
          <div class="button8 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative"
              label="1000" />
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="button6 q-px-xl q-ml-md q-py-xs"
              align="center"
              style="width: 150px;"
              color="negative"
              label="UDO 25" />
          </div>
          <div class="button8 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="negative"
              label="1000" />
          </div>
        </div>
      </div>
      <!-- Clasificados lado right -->
      <div class="col-2 q-ml-xl">
        <div class="row">
          <div class="col-12 q-ml-xs q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-ml-md q-py-xs"
              align="center"
              style="width: 150px;"
              color="primary"
              :label="(confrontations[1]['TeamA']) ? confrontations[1]['TeamA']['name'] : 'To Play'" />
          </div>
          <div class="col-12 q-mt-xs">
            <q-btn size="20px"
              class="button7 q-px-xl q-py-xs"
              align="center"
              style="width: 120px;"
              outline
              color="primary"
              :label="(confrontations[1]['TeamA']) ? confrontations[1]['TeamA']['score'] : 0" />
          </div>
          <div class="col-12 q-ml-xs q-mt-xs">
            <q-btn size="20px"
              class="button2 q-px-xl q-ml-md q-py-xs"
              align="center"
              color="primary"
              style="width: 150px;"
              :label="(confrontations[1]['TeamB']) ? confrontations[1]['TeamB']['name'] : 'to Play'" />
          </div>
          <div class="button7 col-12 q-mt-xs">
            <q-btn size="20px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              style="width: 120px;"
              color="primary"
              :label="(confrontations[1]['TeamB'] && confrontations[1]['TeamB']['score']) ? confrontations[1]['TeamB']['score'] : 0" />
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
export default {
  name: 'SortingFinalComponent',
  data () {
    return {
      /**
       * Confrontations
       * @type {Array}
       */
      confrontations: []
    }
  },
  sockets: {
    sortingPoint (confrontations) {
      this.getConfrontations(confrontations)
    }
  },
  methods: {
    getConfrontations (data) {
      this.confrontations = this.getConfrontationsPhaseTree(data, 3)
      this.confrontationsPhaseFinal = this.getConfrontationsPhaseTree(data, 4)
    },
    /**
     * Sets phase final
     * @param  {Array} data confrontations
     * @param  {Number} phase number
     * @return {Array}
     */
    getConfrontationsPhaseTree (data, phase) {
      return data.filter(element => {
        return element['phaseId'] === phase
      })
    }
  }
}
</script>

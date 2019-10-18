<template>
  <q-page class="bg-blue-grey-1">
    <div class="row q-pa-xl justify-center">
      <div class="col-md-12 col-lg-11 q-pb-lg bg-grey-1">
        <!-- titlee -->
        <div class="row q-pa-md q-pb-xl justify-around">
          <div class="col-11">
            <q-toolbar-title class="text-h3 text-primary text-left text-bold"
              style="height: 70px">
              Regular round: 1
            </q-toolbar-title>
          </div>
        </div>
        <!-- logos -->
        <div class="row q-mt-xs q-pa-md justify-center">
          <div class="col-6">
            <div class="row q-pa-sm justify-center">
              <div class="col-xs-8 col-sm-5 col-md-3 col-lg-2">
                <img src="~assets/UDO.png"
                  style="height: 150px">
              </div>
              <div class="col-12">
                <q-toolbar-title class="text-h3 text-center text-primary text-bold">
                  {{
                    (confrontationPlaying['TeamA']) ? confrontationPlaying['TeamA']['name'].toUpperCase() : ''
                  }}
                </q-toolbar-title>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-pa-sm justify-center">
              <div class="col-xs-8 col-sm-5 col-md-3 col-lg-2">
                <img src="~assets/LUZ.png"
                  style="height: 150px">
              </div>
              <div class="col-12">
                <q-toolbar-title class="text-h3 text-center text-primary text-bold">
                  {{
                    (confrontationPlaying['TeamB']) ? confrontationPlaying['TeamB']['name'].toUpperCase() : ''
                  }}
                </q-toolbar-title>
              </div>
            </div>
          </div>
        </div>
        <!-- competition time -->
        <div class="row q-pa-xs justify-center">
          <div class="col-xs-4 col-sm-3 col-md-3 col-lg-1">
            <q-btn size="50px"
              class="q-px-xl q-py-xs"
              align="center"
              outline
              disable
              :label="`${minutesRound}:${secondsRound}`" />
          </div>
        </div>
        <!-- Score -->
        <div class="row q-mt-xs q-pa-md justify-center">
          <div class="col-6">
            <div class="row q-pa-sm justify-center">
              <div class="col-xs-8 col-sm-5 col-md-3 col-lg-2">
                <q-btn size="35px"
                  class="q-px-xl q-py-xs"
                  align="center"
                  outline
                  disable
                  :label="(points) ? points.teamA : ''" />
              </div>
              <div class="col-12 q-mt-xs">
                <q-toolbar-title class="text-h3 text-center text-primary text-bold">
                  Score
                </q-toolbar-title>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row q-pa-sm justify-center">
         <div class="col-xs-8 col-sm-5 col-md-3 col-lg-2">
                <q-btn size="35px"
                  class="q-px-xl q-py-xs"
                  align="center"
                  outline
                  disable
                  :label="(points) ? points.teamB : ''" />
              </div>
              <div class="col-12 q-mt-xs">
                <q-toolbar-title class="text-h3 text-center text-primary text-bold">
                  Score
                </q-toolbar-title>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'GeneralScreen',
  data () {
    return {
      /**
       * Seconds Round
       * @type {Number}
       */
      secondsRound: 0,
      /**
       * Minutes Round
       * @type {Number}
       */
      minutesRound: 10,
      /**
       * Confrontations playing
       * @type {Object}
       */
      confrontationPlaying: {},
      /**
       * Point teams
       * @type {Object}
       */
      points: null
    }
  },
  created () {
    this.$socket.emit('getPoints')
  },
  sockets: {
    /**
     * Time Raounds
     * @param  {Object} time [description]
     */
    time (time) {
      this.secondsRound = time.secondsRound
      this.minutesRound = time.minutesRound
    },
    /**
     * Sets Confrontations
     * @param  {Array} confrontation
     */
    confrontationsPlaying (confrontation) {
      this.confrontationPlaying = confrontation[0]
    },
    /**
     * Point teams
     * @param  {Object} point teams
     */
    pointsTeams (point) {
      this.points = point
    }
  }
}
</script>

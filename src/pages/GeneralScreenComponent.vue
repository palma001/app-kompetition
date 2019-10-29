<template>
  <q-page class="bg-blue-grey-1">
    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-lg-11 q-pb-lg bg-grey-1">
        <!-- titlee -->
        <div class="row q-pa-xm q-pt-lg justify-around">
          <div class="col-11">
            <q-toolbar-title class="text-h3 text-primary text-left text-bold"
              style="height: 58px">
              Phase {{confrontationPlaying['phaseId']}}
            </q-toolbar-title>
          </div>
        </div>
        <!-- logos -->
        <div class="row q-mt-xs justify-center">
          <div class="col-6">
            <div class="row q-pa-sm justify-center">
              <div class="col-xs-8 col-sm-5 col-md-3 col-lg-2">
                <img
                  :src="`statics/${confrontationPlaying['TeamA']['logo']}`"
                  style="width: 100%; height: 180px"
                />
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
                <img
                  :src="`statics/${confrontationPlaying['TeamB']['logo']}`"
                  style="width: 100%; height: 180px"
                />
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
        <div class="row">
          <div class="col-12 text-center">
            <label style="font-size: 250px;">
              {{minutesRound}} : {{secondsRound}}
            </label>
          </div>
        </div>
        <!-- Score -->
        <div class="row q-mt-xs justify-center">
          <div class="col-6">
            <div class="row q-pa-sm justify-center">
              <div class="col-xs-8 col-sm-5 col-md-3  col-lg-2 text-center">
                <label
                  for=""
                  style="font-size: 120px;">
                  {{ (points) ? points.teamA : 0 }}
                </label>
              </div>
              <div class="col-12 text-center text-primary text-bold">
                <label
                  for=""
                  style="font-size: 50px;">
                  Score
                </label>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row justify-center">
              <div class="col-xs-8 col-sm-5 col-md-3 col-lg-2 text-center">
                <label
                  style="font-size: 120px;">
                  {{ (points) ? points.teamB : 0 }}
                </label>
              </div>
              <div class="col-12 text-center text-primary text-bold">
                <label
                  style="font-size: 50px;">
                  Score
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
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
      points: {}
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

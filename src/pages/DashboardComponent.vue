<template>
  <q-page class="bg-blue-grey-1">
    <div class="q-pa-md">
      <div class="row q-pa-md justify-center">
        <div class="col-md-auto">
          <!-- <q-btn
            class="buttonQ"
            size="30px"
            color="green"
            label="Toss Up"
            v-if="dataPints['question']['type'] === 'tossUp'"/> -->
          <q-btn
            class="buttonQ"
            size="30px"
            color="negative"
            label="Bonus"
          />
        </div>
        <div class="q-ml-sm col-lg-10 col-md-10 col-sm-8 col-xs-8 self-center">
          <div class="title">
            {{this['score/getQuestion']}}
            <!-- QID# {{ dataPints['question'].questionId }}: {{ dataPints['question'].question }} -->
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardComponent',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['score/getQuestion'])
  }
}
</script>

<style lang="css" scoped>
.title {
  background-color: white;
  padding: 20px;
}
</style>

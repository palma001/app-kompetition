<template>
  <q-page class="bg-blue-grey-1">
    <div class="row q-pa-xl justify-center" style=" height: 810px">
      <div class="col-md-12 col-lg-11 q-pb-lg q-mt-lg bg-white">
        <!-- title - Team name -->
        <div class="row q-pa-md q-pb-xl justify-around">
          <div class="col-5">
            <q-toolbar-title class="text-h4 text-white text-center bg-primary">
              Team-A: Nombre equipo A
            </q-toolbar-title>
          </div>
          <div class="col-5">
            <q-toolbar-title class="text-h4 text-white text-center bg-primary">
              Team-B: Nombre equipo B
            </q-toolbar-title>
          </div>
        </div>
        <!-- time -->
        <div class="row q-pa-md justify-center">
          <div class="col-12">
            <q-toolbar-title class="q-mt-xl text-h3 text-center text-primary text-bold">
              Time
            </q-toolbar-title>
          </div>
        </div>
        <!-- Toolbar time -->
        <q-toolbar>
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 35px"
            align="center"
            color="positive"
            label="Start" />
          <q-space></q-space>
          <q-btn size="35px"
            class="q-px-xl q-py-xs"
            align="center"
            outline
            disable
            label="10:10" />
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 35px"
            align="center"
            color="negative"
            label="Stop" />
          <q-space></q-space>
        </q-toolbar>
        <!-- time adicional -->
        <div class="row q-pa-md justify-center">
          <div class="col-12">
            <q-toolbar-title class="q-mt-xl text-h3 text-center text-primary text-bold">
              Time
            </q-toolbar-title>
          </div>
        </div>
        <!-- Toolbar time adicional -->
        <q-toolbar>
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 30px"
            align="center"
            color="accent"
            label="restart" />
          <q-space></q-space>
          <q-btn size="35px"
            class="q-px-xl q-py-xs"
            align="center"
            outline
            disable
            label="05"/>
          <!-- <q-input outlined
            v-model="text"
            size="35px"
            style="height:100px"/> -->
          <q-space></q-space>
          <q-btn class="q-px-xl q-py-xs"
            style="font-size: 30px"
            align="center"
            color="accent"
            label="Start" />
          <q-space></q-space>
        </q-toolbar>
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
  margin-top: 1000px;
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
  name: 'PageIndex'
}
</script>

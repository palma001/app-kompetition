<template>
  <q-page class="bg-blue-grey-1">
    <!-- question section -->
    <!-- <div class="row q-pa-md justify-center">
      <div class="col-11">
        <b-field type="is-info">
          <b-select placeholder="Seleccionar round"
            size="is-medium"
            expanded
            color="red">
            <option value="flint">Regular round 1: UDO 25 - LUZ 34</option>
            <option value="silver">Regular round 2: UCV 57 - UDO 10</option>
          </b-select>
        </b-field>
      </div>
    </div> -->
    <div class="row q-pa-md justify-center text-primary">
      <div class="col-auto q-mt-md">
        <q-toolbar-title class="text-h4 text-left">
          Team-A:
        </q-toolbar-title>
      </div>
      <div class="col-3">
        <q-input outlined
          style="font-size: 25px"
          placeholder="Nombre de equipo A "
          disable/>
      </div>
      <div class="col-auto q-mt-md q-ml-xl">
        <q-toolbar-title class="text-h4 text-left">
          Team-B:
        </q-toolbar-title>
      </div>
      <div class="col-3">
        <q-input outlined
          style="font-size: 25px"
          placeholder="Nombre de equipo B"
          disable/>
      </div>
    </div>
    <!-- question section -->
    <div class="row q-pa-md justify-center">
      <div class="col-11">
        <q-card dark
          bordered
          class="bg-primary my-card">
          <q-card-section>
            <div class="text-h5 text-grey-1 text-bold">QID #001:</div>
          </q-card-section>
          <q-separator info
            inset />
          <q-card-section class="text-h4 text-grey-1">
            What color is the sky?
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
            Blue
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-toolbar class="row q-pa-md q-mt-lg justify-center">
      <q-space></q-space>
      <q-btn class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        label="Bonus" />
      <q-space></q-space>
      <q-btn class="q-px-xl q-py-xs"
        style="font-size: 25px"
        align="center"
        color="accent"
        Disabled
        label="next" />
      <q-space></q-space>
    </q-toolbar>
    <q-toolbar class="spe">
      <img src="~assets/speTrans.png"
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
export default {
  name: 'PageIndex'
}
</script>

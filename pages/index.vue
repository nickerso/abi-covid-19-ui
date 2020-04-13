<template>
  <div class="content">
    <div class="container">
      <div class="Simulation__container">
        <input class="p1__input" placeholder="Stimulation mode (0 or 1)" type="number" name="simulation_p1" v-model="p1">
        <input class="p2__input" placeholder="Stimulation level (0.0-1.0)" type="number" name="simulation_p2" v-model="p2">
        <button class="Simulate__button" @click="runSimulation">Run Simulation</button>
      </div>
      <div class="error-message" v-if="showError">
        {{ errorMessage }}
      </div>
      <hr>
      <div v-if="loading" class="loading">
        🔧 Building Charts ...
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
      </div>

      <simulation-info :simulation-name="simulationName" v-bind:heart-rate="heartRate" v-bind:stimulation-mode="p1" v-bind:stimulation-level="p2" v-if="loaded"></simulation-info>

      <div class="Chart__container" v-if="loaded">
        <div class="Chart__title">
          Membrane Potential (mV)
          <hr>
        </div>
        <div class="Chart__content">
          <line-chart v-if="loaded" :chart-data="membranePotential" :chart-labels="timeValues"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import LineChart from '@/components/LineChart'
import SimulationInfo from '@/components/SimulationInfo'

export default {
  components: {
    LineChart,
    SimulationInfo
  },
  data () {
    return {
      simulationName: 'Atrial EP Simulation',
      p1: null,
      p2: null,
      membranePotential: null,
      heartRate: null,
      timeValues: null,
      loaded: false,
      loading: false,
      showError: false,
      errorMessage: 'Please enter simulation parameters'
    }
  },
  mounted () {
  /*
    if (this.$route.params.package) {
      this.package = this.$route.params.package
      this.requestData()
    }
  */
  },
  computed: {
  },
  methods: {
    resetState () {
      this.loaded = false
      this.showError = false
    },
    runSimulation () {
      if (this.p1 === null || this.p1 === '' || this.p1 === 'undefined') {
        this.showError = true
        return
      }
      if (this.p2 === null || this.p2 === '' || this.p2 === 'undefined') {
        this.showError = true
        return
      }
      this.resetState()
      this.loading = true
      axios.get(`/.api/run_model?stim_mode=${this.p1}&stim_level=${this.p2}`)
        .then(response => {
          console.log(response)
          if (response.data.return_code == 0) {
            this.membranePotential = response.data.output_data.membrane['v']
            this.timeValues = [...Array(this.membranePotential.length).keys()]
            this.heartRate = response.data.output_data.heart_rate
          } else {
            this.errorMessage = "Something went wrong running the simulation"
            this.showError = true
          }
          /*this.rawData = response.data.downloads
          this.downloads = response.data.downloads.map(entry => entry.downloads)
          this.labels = response.data.downloads.map(entry => entry.day)
          this.packageName = response.data.package
          this.totalDownloads = this.downloads.reduce((total, download) => total + download)
          this.setURL()
          this.groupDataByDate()*/
          this.loaded = true
          this.loading = false
        })
        .catch(err => {
          this.errorMessage = err.response.data.error
          this.showError = true
        })
    },
    setURL () {
      history.pushState({ info: `npm-stats ${this.package}` }, this.package, `/#/${this.package}`)
      // this.$ga.page({
      //   page: `/#/${this.package}`,
      //   title: this.package,
      //   location: window.location.href
      // })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/styles/_variables.scss";

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid color(solitude);
  margin: 1em 0;
  padding: 0;
}

.content {
  background: color(ghost-white);
  min-height: calc(100vh - 180px);
}

.title {
  text-align: center;
  color: color(fjord);
}

.container {
  @include container();
}

.loading {
  text-align: center;
  color: color(fjord);
  font-size: rem(18);
}

.error-message {
  text-align: center;
  color: color(robin-egg-blue);
}

.Simulation {
  @include has(container) {
    max-width: rem(640);
    padding: rem(100) 0 rem(20) 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @include has(input) {
    padding: rem(20);
    background-color: #fff;
    border: 1px solid color(solitude);
    font-size: rem(16);
    flex: 1;
  }

  @include has(button) {
    appearance: none;
    padding: rem(18) rem(45);
    margin-left: rem(20);
    border: 0;
    border-radius: 0;
    cursor: pointer;
    text-align: center;
    font-size: rem(21);
    font-weight: 600;
    color: #fff;
    background: color(robin-egg-blue);

    @include hover-active-states {
      background: darken(color(robin-egg-blue), 10%);
    }
  }

  @include has(icon) {
    width: rem(40);
    height: rem(40);
    margin-left: rem(15);
    cursor: pointer;
    color: color(fjord);

    @include hover-active-states {
      color: color(robin-egg-blue);
    }

    >svg {
      fill: currentColor;
    }
  }

}

.Chart__container {
  border-radius: $base-border-radius;
  background-color: #fff;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.30);
  padding: rem(20) rem(40);
  margin: rem(50) 0;
}

.Chart__title {
  color: color(fjord);
  margin-bottom: rem(40);
  font-weight: 600;
  font-size: rem(16);

  >span {
    font-weight: 400;
    color: color(robin-egg-blue);
    font-size: rem(16);
    margin-left: rem(25);
  }
}

.sk-cube-grid {
  width: 40px;
  height: 40px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: color(robin-egg-blue);
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>

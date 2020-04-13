<template>
  <div class="Simulation">
    <h1 class="Simulation__title">{{ simulationName }}</h1>
    <div class="Simulation__info">
      <div class="Simulation__info-item">
        <span>{{ heartRate }}</span><span class="info-label">Heart Rate</span>
      </div>
      <div class="Simulation__info-item">
        <span>{{ stimulationMode }}</span><span class="info-label">Stimulation mode</span>
      </div>
      <div class="Simulation__info-item">
        <span>{{ stimulationLevel }}</span><span class="info-label">Stimulation level</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      simulationName: {
        type: String
      },
      heartRate: {
        type: Number
      },
      stimulationMode: {
        type: Number
      },
      stimulationLevel: {
        type: Number
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/styles/_variables.scss";
  .Simulation {
    padding: rem(20);
    background-color: color(fjord);
    border-radius: $base-border-radius;
    box-shadow: 0 2px 16px 0 rgba(0,0,0,0.30);
    color: #fff;
    text-align: center;
    max-width: rem(400);
    @include has(title) {
      margin-top: 0;
      font-size: rem(29);
    }
    @include has(info) {
      display: flex;
      flex-direction: column;
    }
    @include has(info-item) {
      display: flex;
      flex-direction: column;
      margin: rem(5) 0;
      > span:not(.info-label) {
        font-size: rem(20);
        font-weight: bold;
        margin-bottom: rem(5);
        color: color(robin-egg-blue);
        > a {
          color: currentColor;
        }
      }
      .info-label {
        text-transform: uppercase;
        font-size: rem(12);
        color: color(solitude);
      }
    }
  }
</style>

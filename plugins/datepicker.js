/*
 * As per https://aslamdoctor.com/blog/using-vuejs-datepicker-with-nuxt-js/226 to avoid
 * issues with server side rendering with the datepicker component
 */

import Vue from 'vue'
import VuejsDatePicker from 'vuejs-datepicker'

Vue.component('date-picker', VuejsDatePicker)

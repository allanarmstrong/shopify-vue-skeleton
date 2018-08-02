import Vue from 'vue';
import Collection from '../components/Collection.vue';

new Vue({
  el: '#collection',
  components: {Collection},
  template: '<Collection></Collection>',
  data() {
    return {
      greetings: 'Hi',
    };
  },
});


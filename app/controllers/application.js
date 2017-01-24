import Ember from 'ember';

export default Ember.Controller.extend({
  totalLength: 10000,

  runTests() {
    // Actually show the page
    Ember.run.later(() => {
      this.runEmberData();
      this.runEmberModel();
    }, 100);
  },

  runEmberData() {
    let start = window.performance.now();

    let totalLength = this.get('totalLength');
    for (let i = 0; i < totalLength; ++i) {
      this.store.createRecord('ember-data', {
        id: Math.random().toString(),
        a0: Math.random().toString(),
        a1: Math.random().toString(),
        a2: Math.random().toString(),
        a3: Math.random().toString(),
        a4: Math.random().toString(),
        a5: Math.random().toString(),
        a6: Math.random().toString(),
        a7: Math.random().toString(),
        a8: Math.random().toString(),
        a9: Math.random().toString(),
      });
    }

    let end = window.performance.now();
    this.set('emberDataResults', end - start);
  },

  runEmberModel() {
    let start = window.performance.now();

    let totalLength = this.get('totalLength');
    for (let i = 0; i < totalLength; ++i) {
      this.emstore.createRecord('ember-model', {
        id: Math.random().toString(),
        a0: Math.random().toString(),
        a1: Math.random().toString(),
        a2: Math.random().toString(),
        a3: Math.random().toString(),
        a4: Math.random().toString(),
        a5: Math.random().toString(),
        a6: Math.random().toString(),
        a7: Math.random().toString(),
        a8: Math.random().toString(),
        a9: Math.random().toString(),
      });
    }

    let end = window.performance.now();
    this.set('emberModelResults', end - start);
  },

  difference: Em.computed('emberDataResults', 'emberModelResults', function() {
    let emberDataResults = this.get('emberDataResults');
    let emberModelResults = this.get('emberModelResults');

    if (!Boolean(emberDataResults) || !Boolean(emberModelResults)) {
      return;
    }

    if (emberDataResults > emberModelResults) {
      return `Ember Data was ${((emberDataResults - emberModelResults) / emberDataResults) * 100}% slower`;
    } else {
      return `Ember Data was ${((emberModelResults - emberDataResults) / emberModelResults) * 100}% faster`;
    }
  }),

  actions: {
    rerun() {
      this.setProperties({
        emberModelResults: null,
        emberDataResults: null
      })
      this.runTests();
    }
  }
});
import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.runTests();
    this._super(...arguments);
  }
});
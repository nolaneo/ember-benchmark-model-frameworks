"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('test-model-frameworks/app', ['exports', 'ember', 'test-model-frameworks/resolver', 'ember-load-initializers', 'test-model-frameworks/config/environment'], function (exports, _ember, _testModelFrameworksResolver, _emberLoadInitializers, _testModelFrameworksConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _testModelFrameworksConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _testModelFrameworksConfigEnvironment['default'].podModulePrefix,
    Resolver: _testModelFrameworksResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _testModelFrameworksConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('test-model-frameworks/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'test-model-frameworks/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _testModelFrameworksConfigEnvironment) {

  var name = _testModelFrameworksConfigEnvironment['default'].APP.name;
  var version = _testModelFrameworksConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('test-model-frameworks/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    totalLength: 10000,

    runTests: function runTests() {
      var _this = this;

      // Actually show the page
      _ember['default'].run.later(function () {
        _this.runEmberData();
        _this.runEmberModel();
      }, 100);
    },

    runEmberData: function runEmberData() {
      var start = window.performance.now();

      var totalLength = this.get('totalLength');
      for (var i = 0; i < totalLength; ++i) {
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
          a9: Math.random().toString()
        });
      }

      var end = window.performance.now();
      this.set('emberDataResults', end - start);
    },

    runEmberModel: function runEmberModel() {
      var start = window.performance.now();

      var totalLength = this.get('totalLength');
      for (var i = 0; i < totalLength; ++i) {
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
          a9: Math.random().toString()
        });
      }

      var end = window.performance.now();
      this.set('emberModelResults', end - start);
    },

    difference: Em.computed('emberDataResults', 'emberModelResults', function () {
      var emberDataResults = this.get('emberDataResults');
      var emberModelResults = this.get('emberModelResults');

      if (!Boolean(emberDataResults) || !Boolean(emberModelResults)) {
        return;
      }

      if (emberDataResults > emberModelResults) {
        return 'Ember Data was ' + (emberDataResults - emberModelResults) / emberDataResults * 100 + '% slower';
      } else {
        return 'Ember Data was ' + (emberModelResults - emberDataResults) / emberModelResults * 100 + '% faster';
      }
    }),

    actions: {
      rerun: function rerun() {
        this.setProperties({
          emberModelResults: null,
          emberDataResults: null
        });
        this.runTests();
      }
    }
  });
});
define('test-model-frameworks/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('test-model-frameworks/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('test-model-frameworks/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('test-model-frameworks/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('test-model-frameworks/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'test-model-frameworks/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _testModelFrameworksConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_testModelFrameworksConfigEnvironment['default'].APP.name, _testModelFrameworksConfigEnvironment['default'].APP.version)
  };
});
define('test-model-frameworks/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('test-model-frameworks/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('test-model-frameworks/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('test-model-frameworks/initializers/export-application-global', ['exports', 'ember', 'test-model-frameworks/config/environment'], function (exports, _ember, _testModelFrameworksConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_testModelFrameworksConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _testModelFrameworksConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_testModelFrameworksConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('test-model-frameworks/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('test-model-frameworks/initializers/model-fragments', ['exports', 'model-fragments', 'model-fragments/transforms/fragment', 'model-fragments/transforms/fragment-array', 'model-fragments/transforms/array'], function (exports, _modelFragments, _modelFragmentsTransformsFragment, _modelFragmentsTransformsFragmentArray, _modelFragmentsTransformsArray) {
  exports['default'] = {
    name: "fragmentTransform",
    before: "ember-data",

    initialize: function initialize(application) {
      application.register('transform:fragment', _modelFragmentsTransformsFragment['default']);
      application.register('transform:fragment-array', _modelFragmentsTransformsFragmentArray['default']);
      application.register('transform:array', _modelFragmentsTransformsArray['default']);
    }
  };
});
// Import the full module to ensure monkey-patchs are applied before any store
// instances are created. Sad face for side-effects :(
define('test-model-frameworks/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('test-model-frameworks/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("test-model-frameworks/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('test-model-frameworks/models/ember-data', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    a0: _emberData['default'].attr('string'),
    a1: _emberData['default'].attr('string'),
    a2: _emberData['default'].attr('string'),
    a3: _emberData['default'].attr('string'),
    a4: _emberData['default'].attr('string'),
    a5: _emberData['default'].attr('string'),
    a6: _emberData['default'].attr('string'),
    a7: _emberData['default'].attr('string'),
    a8: _emberData['default'].attr('string'),
    a9: _emberData['default'].attr('string')
  });
});
define('test-model-frameworks/models/ember-model', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Model.extend({
    a0: _ember['default'].attr(),
    a1: _ember['default'].attr(),
    a2: _ember['default'].attr(),
    a3: _ember['default'].attr(),
    a4: _ember['default'].attr(),
    a5: _ember['default'].attr(),
    a6: _ember['default'].attr(),
    a7: _ember['default'].attr(),
    a8: _ember['default'].attr(),
    a9: _ember['default'].attr()
  });
});
define('test-model-frameworks/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('test-model-frameworks/router', ['exports', 'ember', 'test-model-frameworks/config/environment'], function (exports, _ember, _testModelFrameworksConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _testModelFrameworksConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('test-model-frameworks/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    setupController: function setupController(controller) {
      controller.runTests();
      this._super.apply(this, arguments);
    }
  });
});
define('test-model-frameworks/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("test-model-frameworks/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "frkUrSAd", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Ember Data Modelling Framework Benchmark\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Number of models to create:\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"value\"],[\"number\",[\"get\",[\"totalLength\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"style\",[]],[\"static-attr\",\"type\",\"text/css\"],[\"flush-element\"],[\"text\",\"\\n  body {\\n    font-family: monospace;\\n  }\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"emberDataResults\"]]],null,3,2],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"emberModelResults\"]]],null,1,0],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"difference\"]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"rerun\"]],[\"flush-element\"],[\"text\",\"Re Run\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"Getting Ember Model Stats!\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  Ember Model Time: \"],[\"append\",[\"unknown\",[\"emberModelResults\"]],false],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"Getting Ember Data Stats!\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  Ember Data Time: \"],[\"append\",[\"unknown\",[\"emberDataResults\"]],false],[\"text\",\" ms\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "test-model-frameworks/templates/application.hbs" } });
});
define('test-model-frameworks/transforms/array', ['exports', 'model-fragments/transforms/array'], function (exports, _modelFragmentsTransformsArray) {
  exports['default'] = _modelFragmentsTransformsArray['default'];
});
define('test-model-frameworks/transforms/fragment-array', ['exports', 'model-fragments/transforms/fragment-array'], function (exports, _modelFragmentsTransformsFragmentArray) {
  exports['default'] = _modelFragmentsTransformsFragmentArray['default'];
});
define('test-model-frameworks/transforms/fragment', ['exports', 'model-fragments/transforms/fragment'], function (exports, _modelFragmentsTransformsFragment) {
  exports['default'] = _modelFragmentsTransformsFragment['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('test-model-frameworks/config/environment', ['ember'], function(Ember) {
  var prefix = 'test-model-frameworks';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("test-model-frameworks/app")["default"].create({"name":"test-model-frameworks","version":"0.0.0+6db7f2c5"});
}

/* jshint ignore:end */
//# sourceMappingURL=test-model-frameworks.map

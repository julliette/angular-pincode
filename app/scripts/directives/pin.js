angular.module('angularPincodeApp.directives', [])
.directive('pin', function($log, $window) {

  return {
    templateUrl: 'views/pincode/pin.tpl',
    transclude: true,
    scope: {
      onEntryComplete: '&',
      digits: '='
    },
    replace: true,
    controller: function($scope) {
      var pin = [];

      this.updatePin = function(model) {
        if(model.digit) {
          pin[model.$index] = model.digit;
        }
      };
    },
    link: function(scope, elem, attrs) {
      var fields = scope.fields = [];

      for(var i = 0; i < scope.digits; i++) {
        fields.push({});
      }
    },
    restrict: 'E'
  };
})

.directive('digit', function($window, $log) {
  return {
    template: '<input type="number" min="0" max="9" size="1" ng-keyup="digitEntered()" />',
    link: function(scope, elem, attr, pinCtrl) {
      scope.digitEntered = function($event) {
        pinCtrl.updatePin(scope);
      };
    },
    require: '^pin',
    replace: true,
    restrict: 'E'
  };
});

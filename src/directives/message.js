angular.module('schemaForm').directive('sfMessage',
['$injector', 'sfErrorMessage', function($injector, sfErrorMessage) {
  return {
    scope: false,
    restrict: 'EA',
    link: function(scope, element, attrs) {

      //Inject sanitizer if it exists
      var $sanitize = $injector.has('$sanitize') ?
                      $injector.get('$sanitize') : function(html) { return html; };

      //Prepare and sanitize message, i.e. description in most cases.
      var msg = '';
      if (attrs.sfMessage) {
        msg = scope.$eval(attrs.sfMessage) || '';
        msg = $sanitize(msg);
      }

      var update = function(invalid, showErrors) {
        if (invalid && showErrors) {
          var errors = Object.keys(
            (scope.ngModel && scope.ngModel.$error) || {}
          );

          // We only show one error.
          // TODO: Make that optional
          var error = errors[0];

          if (error) {
            element.html(sfErrorMessage.interpolate(
              error,
              scope.ngModel.$modelValue,
              scope.ngModel.$viewValue,
              scope.form,
              scope.options && scope.options.validationMessage
            ));
          } else {
            element.html(msg);
          }
        }
        else {
          element.html(msg);
        }
      };
      update();

      scope.$watch(function() {
          return scope.ngModel.$invalid && (scope.ngModel.$dirty || scope.formCtrl.$submitted);
      }, function() {
        if (scope.ngModel) {
          update(scope.ngModel.$invalid, scope.ngModel.$dirty || scope.formCtrl.$submitted);
        }
      });

    }
  };
}]);

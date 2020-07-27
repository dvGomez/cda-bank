'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $rootScope) {
    var user = $rootScope.user;
    console.log("Verificando login de usuário...");
    if (user != undefined) {
      $location.path('/');
    }

    $scope.goToLogin = function(){
      if($scope.authenticate){
        Auth.login($scope.authenticate.id);
      }
    }

  });

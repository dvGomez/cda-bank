'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('MainCtrl', function ($scope, Users, $rootScope) {
    
    $scope.saque = {};
    $scope.deposito = {};
    $scope.transferencia = {};

    Users.extrato().then(function(data){
      console.log(data);
      $scope.extratos = data;
    });

    $scope.sacar = function(){
      $scope.saque.UserId = $rootScope.user.id;
      Users.sacar($scope.saque).then(function(data){
        Swal.fire(data.message)
        .then((result) => {
          location.reload();
        });
      });
    }

    $scope.depositar = function(){
      $scope.deposito.UserId = $rootScope.user.id;
      Users.depositar($scope.deposito).then(function(data){
        Swal.fire(data.message)
        .then((result) => {
          location.reload();
        });
      });;
    }

    $scope.transferir = function(){
      $scope.transferencia.FromUserId = $rootScope.user.id;
      Users.transferir($scope.transferencia).then(function(data){
        Swal.fire(data.message)
        .then((result) => {
          location.reload();
        });
      });
    };

    $scope.timeSince = function(date){
      return timeS(Date.parse(date));
    };

    function timeS(date){
      var seconds = Math.floor((new Date() - date) / 1000);
    
      var interval = Math.floor(seconds / 31536000);
    
      if (interval > 1) {
        return interval + " years ago";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months ago";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
  }

  });

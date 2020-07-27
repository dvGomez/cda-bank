'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.Users
 * @description
 * # Users
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
  .service('Users', function ($http, ENVIROMENT, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.getAll = function(){
      return $http.get(ENVIROMENT.apiEndpoint + '/user')
      .then(function(data){
        return data.data;
      })
    };

    this.updateProfile = function(){
      return $http.get(ENVIROMENT.apiEndpoint + '/user/'+$rootScope.user.id)
      .then(function(data){
        console.log('USER:', data.data);
        $rootScope.user = data.data;
      })
    }

    this.sacar = function(saque){
      return $http.post(ENVIROMENT.apiEndpoint + '/user/withdraw', saque)
      .then(function(data){
        return data.data;
      });
    };

    this.depositar = function(deposit){
      return $http.post(ENVIROMENT.apiEndpoint + '/user/deposit', deposit)
      .then(function(data){
        return data.data;
      });
    };

    this.transferir = function(transfer){
      return $http.post(ENVIROMENT.apiEndpoint + '/user/transfer', transfer)
      .then(function(data){
        return data.data;
      });
    };

    this.extrato = function(){
      return $http.get(ENVIROMENT.apiEndpoint + '/register/extrato/'+$rootScope.user.id)
      .then(function(data){
        return data.data;
      });
    };

    // this.add = function(user){
    //   return $http.post(ENVIROMENT.apiEndpoint + '/user', user)
    //   .then(function(data){
    //     return data.data;
    //   })
    // };

    // this.delete = function(id){
    //   return $http.delete(ENVIROMENT.apiEndpoint + '/user/' + id)
    //   .then(function(data){
    //     return data.data;
    //   })
    // };

  });

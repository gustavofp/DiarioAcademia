﻿(function (angular) {
    
    'use strict';

    authService.$inject = ['$http', '$q', 'localStorageService','logger','BASEURL'];

    angular.module('services.module')
        .service('authService', authService);
    
    function authService($http, $q, localStorageService,logger,serviceBase) {
        var self = this;
        
        var authentication = {
            isAuth: false,
            userName: ""
        };

        var saveRegistration = function (registration) {

            logOut();

            return $http.post(serviceBase + 'api/account/register/', registration).then(function (response) {
                return response;
            });

        };

        var login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = $q.defer();

            var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

            $http.post(serviceBase + 'token', data, { headers: headers }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                authentication.isAuth = true;
                authentication.userName = loginData.userName;


                logger.success("Bem vindo " + authentication.userName + "! ");
                deferred.resolve(response);

            }).error(function (err, status) {

                logger.error("Não autorizado");

                logOut();

                deferred.reject(err);

            });

            return deferred.promise;

        };
        var logOut = function () {

            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.userName = "User";

        };

        var fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }
        };

        self.saveRegistration = saveRegistration;
        self.login = login;
        self.logOut = logOut;
        self.fillAuthData = fillAuthData;
        self.authentication = authentication;

    }

})(window.angular);
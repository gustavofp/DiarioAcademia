﻿(function () {
    'use strict';
    var KEYS = angular.injector(['common.module']).get('CONSTANT_KEYS');

    angular
        .module('routes.module')
        .config(configRoutes);

    configRoutes.$inject = [KEYS.APP_ROUTES];
    function configRoutes(routes) {

        routes.push({
            state: 'login',
            url: '/login',
            controller: 'loginController as vm',
            templateUrl: '/app/views/authentication/login.html'
        }, {
            state: 'signup',
            url: '/signup',
            controller: 'signupController as vm',
            templateUrl: '/app/views/authentication/signup.html'
        });

    }

})();
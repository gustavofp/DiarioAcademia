﻿(function () {

    'use strict';

    //using
    shellController.$inject = ['$rootScope','$state','authService', 'languageService', 'resource'];

    //namespace
    angular
        .module('controllers.module')
        .controller('shellController', shellController);
    
    //class
    function shellController($rootScope,$state, authService, languageService, res) {
        var self = this;
        self.authentication = {};

        //script load
        activate();
        function activate() {
            self.authentication = authService.authentication;
            self.authorization = authService.authorization;
            toastr.options.preventDuplicates = true;
            toastr.options.timeOut = 900;
            self.currentLanguage = languageService.currentLanguage;
            reTranslate('pt-br');
            var date = new Date();
            self.year = date.getFullYear();
        }

        self.reTranslate = reTranslate;

        //public methods
        self.logOut = function () {
            authService.logOut();
            $state.go('login');
        };

        self.isVisible = function (state) {
            return self.authorization.isAuthorized(state);
        };

        self.isLogged = function () {
            return self.authentication.isAuth && $(document).width() > 768;
        }
        //private methods
        function reTranslate(language) {

            languageService.updateLanguage(language);

        };
    }
})();
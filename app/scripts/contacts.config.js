(function () {
    'use strict';
    angular
        .module('contactsApp')
        .config(configFn);

    function configFn($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('contacts', {
                url: '/',
                templateUrl: '/app/partials/contacts.html',
                controller: 'ContactsController'
            })
            .state('contacts.detail', {
                url: '/:contactId'
            })
            .state('contacts.edit', {
                url: '/:editId'
            })
            .state('add', {
                url: '/add-contact'
            });
    }
})();
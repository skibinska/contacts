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

        $urlRouterProvider.otherwise('contacts');

        $stateProvider
            
            .state('contacts', {
                url: '/contacts',
                templateUrl: '/app/partials/contacts.html',
                controller: 'ContactsController'
            })
            .state('contacts.detail', {
                url: '/:contactId',
                templateUrl: '/app/partials/contacts-detail.html'
            })
            .state('contacts.edit', {
                url: '/edit/:editId',
                templateUrl: '/app/partials/contacts-detail.html'
            })
            .state('contacts.delete', {
                url: '/:contactId',
                templateUrl: '/app/partials/contacts.html'
            })
            .state('add', {
                url: '/add-contact',
                templateUrl: '/app/partials/add-contact.html',
                controller: 'ContactsController'
            });
    }
})();
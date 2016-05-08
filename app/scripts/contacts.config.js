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

        $urlRouterProvider.otherwise('/contacts');

        var contactsTemplateUrl = '/app/partials/contacts.html';
        var contactsController = 'ContactsController';

        $stateProvider

            .state('contacts', {
                url: '/contacts',
                templateUrl: contactsTemplateUrl,
                controller: contactsController,
                controllerAs: 'vm'
            })

            .state('contacts.preview', {
                url: '/:id/preview'
            })
            .state('contacts.edit', {
                url: '/:id/edit'
            })
            .state('contacts.add', {
                url: '/add'
            });
    }
})();
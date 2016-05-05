(function () {
    'use strict';
    angular
        .module('contactsApp')
        .service('contactsGateway', serviceFn);

    function serviceFn($http, $q) {

        var contacts;

        var service = {
            getContacts: getContacts,
            getContact: getContact,
            addContact: addContact,
            editContact: editContact,
            deleteContact: deleteContact
        };
        return service;

        /**
         * @returns {Function|Promise}
         */
        function getContacts() {
            var deferred = $q.defer();

            if (angular.isDefined(contacts)) {
                deferred.resolve(contacts);
            } else {
                $http
                    .get('http://jsonplaceholder.typicode.com/users/')
                    .then(function (data) {
                            contacts = data.data;
                            deferred.resolve(data.data);
                        },
                        function (data) {
                            deferred.reject(data);
                        });

            }

            return deferred.promise;
        }


        function getContact(contactId) {
            var deferred = $q.defer();
            $http
                .get('http://jsonplaceholder.typicode.com/users/' + contactId)
                .then(function (data) {
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function addContact(contact) {
            var deferred = $q.defer();
            $http
                .post('http://jsonplaceholder.typicode.com/users', contact)
                .then(function (data) {
                    //console.log('data from service.addContact ',data.data);
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function editContact(contactId) {
            var deferred = $q.defer();
            $http
                .put('http://jsonplaceholder.typicode.com/users/' + contactId)
                .then(function (data) {
                    deferred.resolve(data.data);
                    console.log('success from service: ', data.data, 'index-', contactId);
                }, function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function deleteContact(contactId) {
            var deferred = $q.defer();
            $http
                .delete('http://jsonplaceholder.typicode.com/users/' + contactId)
                .then(function (data) {
                    deferred.resolve(data.data);
                    //console.log('success from service: ', data.data, 'index-', contactId);
                }, function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }
})();
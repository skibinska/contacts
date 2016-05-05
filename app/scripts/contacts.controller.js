(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ContactsController', controllerFn);

    function controllerFn(contactsGateway, $scope, $state, $uibModal) {
        $scope.contact = {
            "name": "",
            "username": "",
            "email": "",
            "address": {
                "street": "",
                "city": ""
            },
            "phone": ""
        };
        $scope.contacts = [];
        $scope.addNewContact = addNewContact;
        $scope.editContact = editContact;
        $scope.deleteContact = deleteContact;
        $scope.openContact = openContact;

        activate();

        function activate() {
            if ($scope.loadedContacts) {
                return;
            }
            contactsGateway.getContacts()
                .then(contactsGatewaySuccessHandler, contactsGatewayFailureHandler);

        }

        function contactsGatewaySuccessHandler(data) {
            $scope.contacts = data;
        }

        function contactsGatewayFailureHandler() {
            window.alert('There was an error!');
        }

        function openContact(contactId) {
            contactsGateway.getContact(contactId)
                .then(contactSuccessHandler);
        }

        function contactSuccessHandler(data) {
            $scope.contact = data;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/contacts-detail.html',
                controller: 'ModalContactDetailController',
                size: 'md',
                resolve: {
                    contact: function () {
                        return $scope.contact;
                    }
                }
            });
        }

        function addNewContact() {
            contactsGateway.addContact($scope.contact)
                .then(addNewContactSuccessHandler);
        }

        function addNewContactSuccessHandler(data) {

            //console.log('addNewContactSuccessHandler: ', data);
            console.info('$scope.contacts.push(data) data=', data, $scope.contacts);

            $scope.contacts.push(data);

            //console.log($scope.contacts.length);
            $scope.contact = {};

            $state.go('contacts');
        }

        function deleteContact(contactId) {
            contactsGateway.deleteContact(contactId)
                .then(function (data) {
                    deleteContactSuccessHandler(contactId);
                });
        }

        function deleteContactSuccessHandler(contactId) {

            var contactIndexToDelete;

            for (var contactIndex = 0; contactIndex <= $scope.contacts.length; contactIndex++) {
                var currentContact = $scope.contacts[contactIndex];
                if (currentContact.id === contactId) {
                    contactIndexToDelete = contactIndex;
                    break;
                }
            }

            $scope.contacts.splice(contactIndexToDelete, 1);
        }

        function editContact(contactId) {
            contactsGateway.getContact(contactId)
                .then(editContactSuccessHandler);

        }

        function editContactSuccessHandler(data) {
            $scope.contact = data;
        }
    }
})();
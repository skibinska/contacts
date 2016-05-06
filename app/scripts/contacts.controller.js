(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ContactsController', controllerFn);

    function controllerFn(contactsGateway, $scope, $state, $uibModal) {
        //$scope.contact = {
        //    "name": "",
        //    "username": "",
        //    "email": "",
        //    "address": {
        //        "street": "",
        //        "city": ""
        //    },
        //    "phone": ""
        //};
        $scope.contacts = [];
        $scope.addNewContact = addNewContact;
        $scope.deleteContact = deleteContact;
        $scope.editContact = editContact;
        $scope.getNextAvailableId = getNextAvailableId;
        $scope.showContact = showContact;

        function getNextAvailableId() {
            //var max = $scope.contacts[0]['id'];
            //
            //if ($scope.contacts.length === 0) {
            //    return -1;
            //}
            //
            //for (var index = 1; index < $scope.contacts.length; index++) {1
            //    if($scope.contacts[index]['id'] > max){
            //        max = $scope.contacts[index]['id'];
            //    }
            //}
            //return max + 1;

            var max = $scope.contacts.reduce(function (index1, index2) {
                return index1 > index2 ? index1 : index2
            });
            return max.id + 1;
        }

        activate();

        function activate() {
            // ???
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

        function showContact(contactId) {
            contactsGateway.getContact(contactId)
                .then(contactSuccessHandler);
        }

        function contactSuccessHandler(data) {
            $scope.contact = data;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/contacts-detail.html',
                controller: 'ModalContactController',
                size: 'md',
                resolve: {
                    contact: function () {
                        return $scope.contact;
                    }
                }
            });
            //$state.go('contacts');
        }

        function addNewContact() {
            contactsGateway.addContact($scope.contact)
                .then(addNewContactSuccessHandler);
        }

        function addNewContactSuccessHandler(data) {
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
            $state.go('contacts');
        }

        function editContact(contactId) {
            contactsGateway.getContact(contactId)
                .then(editContactSuccessHandler);

        }

        function editContactSuccessHandler(data) {
            $scope.contact = data;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/edit.html',
                controller: 'ModalContactController',
                size: 'md',
                resolve: {
                    contact: function () {
                        return $scope.contact;
                    }
                }
            });
        }
    }
})();
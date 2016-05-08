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
        $scope.saveContact = saveContact;
        $scope.showContact = showContact;

        activate();

        function activate() {
            contactsGateway
                .getContacts()
                .then(contactsGatewaySuccessHandler, contactsGatewayFailureHandler);
        }

        function contactsGatewaySuccessHandler(data) {
            $scope.contacts = data;
        }

        function contactsGatewayFailureHandler() {
            window.alert('There was an error!');
        }

        function getNextAvailableId() {
            var contactWithMaxId = $scope.contacts.reduce(contactWithMaxIdReduceCallback);
            return contactWithMaxId.id + 1;
        }

        function contactWithMaxIdReduceCallback(contact1, contact2) {
            return contact1.id > contact2.id ? contact1 : contact2
        }


        function showContact(contactId) {
            contactsGateway
                .getContact(contactId)
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
            contactsGateway
                .addContact($scope.contact)
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
            contactsGateway
                .deleteContact(contactId)
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

        /**
         * @param {Object} contact
         */
        function editContact(contact) {
            $scope.contact = contact;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/edit.html',
                controller: 'ModalContactController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contact: function () {
                        return $scope.contact;
                    }
                }
            });
            modalInstance.result.then(confirmContactChangesHandler);
        }

        function confirmContactChangesHandler() {
            saveContact();
        }

        function saveContact() {
            contactsGateway
                .saveContact($scope.contact)
                .then(saveContactSuccessHandler, saveContactFailureHandler);
        }

        function saveContactSuccessHandler() {
            console.info($scope.contact);
            for (var i = 0; i < $scope.contacts.length; i++) {
                var contact = $scope.contacts[i];
                if (contact.id === $scope.contact.id) {
                    $scope.contacts[i] = $scope.contact; // API do not persist so we fake changes in list of contacts
                    break;
                }
            }
            console.info('contact saved!');
        }

        function saveContactFailureHandler() {
            console.error('could not save contact');
        }
    }
})();
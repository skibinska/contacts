(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ContactsController', controllerFn);

    function controllerFn(contactsGateway, $scope, $state, $uibModal) {

        $scope.contacts = [];
        $scope.addNewContact = addNewContact;
        $scope.deleteContact = deleteContact;
        $scope.editContact = editContact;
        $scope.getNextAvailableId = getNextAvailableId;
        $scope.showContact = showContact;
        $scope.showAddNewContactForm = showAddNewContactForm;

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

        /**
         * @param {Object} contact
         */
        function showContact(contact) {
            var showModal = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/contacts-detail.html',
                controller: 'ModalContactController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contact: function () {
                        return contact;
                    }
                }
            });

            showModal.result.finally(showContactFinal);

            function showContactFinal() {
                $state.go('contacts');
            }
        }

        function addNewContact() {
            contactsGateway
                .addContact($scope.contact)
                .then(addNewContactSuccessHandler);
        }

        function addNewContactSuccessHandler(data) {
            $scope.contacts.push(data);

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
            modalInstance.result
                .then(confirmContactChangesHandler)
                .finally(editContactFinal);

            function editContactFinal() {
                $state.go('contacts');
            }
        }

        function confirmContactChangesHandler() {
            if (angular.isDefined($scope.contact.id)) {
                updateContact();
            } else {
                createContact();
            }
        }

        function updateContact() {
            contactsGateway
                .saveContact($scope.contact)
                .then(updateContactSuccessHandler, updateContactFailureHandler);
        }

        function createContact() {
            contactsGateway
                .addContact($scope.contact)
                .then(addContactSuccessHandler, addContactFailureHandler);

        }

        function addContactSuccessHandler() {
            $scope.contact.id = getNextAvailableId();
            $scope.contacts.push($scope.contact);
        }

        function addContactFailureHandler() {
            console.error('could not created contact');
        }

        function updateContactSuccessHandler() {
            console.info($scope.contact);
            for (var i = 0; i < $scope.contacts.length; i++) {
                var contact = $scope.contacts[i];
                if (contact.id === $scope.contact.id) {
                    $scope.contacts[i] = $scope.contact; // API do not persist so we fake changes in list of contacts
                    break;
                }
            }
            console.info('contact updated successfully!');
        }

        function updateContactFailureHandler() {
            console.error('could not updated contact');
        }

        function showAddNewContactForm() {
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/add-contact.html',
                controller: 'ModalContactController',
                controllerAs: 'vm',
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
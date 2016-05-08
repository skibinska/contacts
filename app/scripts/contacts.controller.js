(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ContactsController', controllerFn);

    function controllerFn(contactsGateway, $scope, $state, $uibModal) {

        var vm = this;

        vm.contacts = [];
        vm.addNewContact = addNewContact;
        vm.deleteContact = deleteContact;
        vm.editContact = editContact;
        vm.getNextAvailableId = getNextAvailableId;
        vm.showContact = showContact;

        activate();

        function activate() {
            contactsGateway
                .getContacts()
                .then(contactsGatewaySuccessHandler, contactsGatewayFailureHandler);
        }

        function contactsGatewaySuccessHandler(data) {
            vm.contacts = data;
        }

        function contactsGatewayFailureHandler() {
            window.alert('There was an error!');
        }

        function getNextAvailableId() {
            var contactWithMaxId = vm.contacts.reduce(contactWithMaxIdReduceCallback);
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
                .addContact(vm.contact)
                .then(addNewContactSuccessHandler);
        }

        function addNewContactSuccessHandler(data) {
            vm.contacts.push(data);

            vm.contact = {};

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

            for (var contactIndex = 0; contactIndex <= vm.contacts.length; contactIndex++) {
                var currentContact = vm.contacts[contactIndex];
                if (currentContact.id === contactId) {
                    contactIndexToDelete = contactIndex;
                    break;
                }
            }

            vm.contacts.splice(contactIndexToDelete, 1);
            $state.go('contacts');
        }

        /**
         * @param {Object} contact
         */
        function editContact(contact) {
            vm.contact = contact;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/partials/edit.html',
                controller: 'ModalContactController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contact: function () {
                        return vm.contact;
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
            if (angular.isDefined(vm.contact.id)) {
                updateContact();
            } else {
                createContact();
            }
        }

        function updateContact() {
            contactsGateway
                .saveContact(vm.contact)
                .then(updateContactSuccessHandler, updateContactFailureHandler);
        }

        function createContact() {
            contactsGateway
                .addContact(vm.contact)
                .then(addContactSuccessHandler, addContactFailureHandler);

        }

        function addContactSuccessHandler() {
            vm.contact.id = getNextAvailableId();
            vm.contacts.push(vm.contact);
        }

        function addContactFailureHandler() {
            console.error('could not created contact');
        }

        function updateContactSuccessHandler() {
            console.info(vm.contact);
            for (var i = 0; i < vm.contacts.length; i++) {
                var contact = vm.contacts[i];
                if (contact.id === vm.contact.id) {
                    vm.contacts[i] = vm.contact; // API do not persist so we fake changes in list of contacts
                    break;
                }
            }
            console.info('contact updated successfully!');
        }

        function updateContactFailureHandler() {
            console.error('could not updated contact');
        }
    }
})();
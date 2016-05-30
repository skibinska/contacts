(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ContactsController', controllerFn);

    function controllerFn(contactsGateway, $log, $state, $uibModal, toaster) {

        var vm = this;

        vm.contacts = [];
        vm.deleteContact = deleteContact;
        vm.editContact = editContact;
        vm.showContact = showContact;

        activate();

        function activate() {
            contactsGateway
                .getContacts()
                .then(contactsSuccessHandler, contactsFailureHandler);
        }

        /**
         * @param {Array.<Object>} data
         */
        function contactsSuccessHandler(data) {
            vm.contacts = data;
        }

        function contactsFailureHandler() {
            $log.error('Could not fetch contacts.');
        }

        /**
         * @returns {Number}
         */
        function getNextAvailableId() {
            var contactWithMaxId = vm.contacts.reduce(contactWithMaxIdReduceCallback);
            return contactWithMaxId.id + 1;
        }

        /**
         * @param {Object} contact1
         * @param {Object} contact2
         * @returns {Object}
         */
        function contactWithMaxIdReduceCallback(contact1, contact2) {
            return contact1.id > contact2.id ? contact1 : contact2
        }

        /**
         * @param {Object} contact
         */
        function showContact(contact) {
            var showModal = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/views/contact-preview.html',
                controller: 'ContactController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contact: function () {
                        return contact;
                    }
                }
            });

            showModal.result.finally(showContactFinal);
        }

        function showContactFinal() {
            $state.go('contacts');
        }

        /**
         * @param {Number} contactId
         */
        function deleteContact(contactId) {
            contactsGateway
                .deleteContact(contactId)
                .finally(function (data) {
                    deleteContactSuccessHandler(contactId);
                });
        }

        /**
         * @param {Number} contactId
         */
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

            toaster.clear();
            toaster.pop({
                type: 'success',
                title: 'Success',
                body: 'contact was deleted successfully',
                showCloseButton: true
            });
            $state.go('contacts');
        }

        /**
         * @param {Object} contact
         */
        function editContact(contact) {
            vm.contact = contact;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: '/app/views/contact.html',
                controller: 'ContactController',
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
        }

        function editContactFinal() {
            $state.go('contacts');
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

        function updateContactSuccessHandler() {
            console.info(vm.contact);
            for (var i = 0; i < vm.contacts.length; i++) {
                var contact = vm.contacts[i];
                if (contact.id === vm.contact.id) {
                    vm.contacts[i] = vm.contact; // API do not persist so we fake changes in list of contacts
                    break;
                }
            }
            toaster.clear();
            toaster.pop({
                type: 'success',
                title: 'Success',
                body: 'contact was updated successfully',
                showCloseButton: true
            });
            console.info('contact updated successfully!');
        }

        function updateContactFailureHandler() {
            console.error('could not updated contact');
            //toaster.clear();
            //toaster.pop({
            //    type: 'error',
            //    title: 'Error',
            //    body: 'could not updated contact',
            //    showCloseButton: true
            //});
        }

        function createContact() {
            contactsGateway
                .addContact(vm.contact)
                .then(addContactSuccessHandler, addContactFailureHandler);
        }

        function addContactSuccessHandler() {
            vm.contact.id = getNextAvailableId();
            vm.contacts.push(vm.contact);
            toaster.clear();
            toaster.pop({
                type: 'success',
                title: 'Success',
                body: 'contact was added successfully',
                showCloseButton: true
            });
        }

        function addContactFailureHandler() {
            console.error('could not created contact');
            toaster.clear();
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: 'could not created contact',
                showCloseButton: true
            });
        }
    }
})();

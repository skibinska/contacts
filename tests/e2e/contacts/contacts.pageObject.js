(function () {
    'use strict';
    var Contacts = function () {

        this.addContactButton = element(by.css('[vm.editContact({})"]'));
        this.allContacts = element.all(by.repeater('contact in vm.contacts'));
        this.deleteButton = element(by.css('[ng-click="vm.deleteContact(contact.id)"]'));
        this.detailButton = element(by.css('[ng-click="vm.showContact(contact)"]'));
        this.editButton = element(by.css('[ng-click="vm.editContact(contact)"]'));

    };

    module.exports = Contacts;
})();
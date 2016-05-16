(function () {
    'use strict';
    var Contacts = function () {

        this.addContactButton = element(by.css('[ng-click="vm.editContact({})"]'));
        this.allContacts = element.all(by.repeater('contact in vm.contacts'));
        this.deleteButtons = element.all(by.css('[ng-click="vm.deleteContact(contact.id)"]'));
        this.detailButtons = element.all(by.css('[ng-click="vm.showContact(contact)"]'));
        this.editButtons = element.all(by.css('[ng-click="vm.editContact(contact)"]'));
        this.searchInput = element(by.model('search'));

        this.browserTitle = function () {
            return browser.getTitle();
        };

        this.clearSearch = function () {
            return this.searchInput.clear();
        };

        this.countContacts = function () {
            return this.allContacts.count();
        };

        this.deleteContact = function (index) {
            this.deleteButtons.get(index).click();
        };

        this.findInAllContacts = function (word) {
            this.searchInput.sendKeys(word);
        };
        this.findInUrl = function () {
            return browser.getLocationAbsUrl();
        };

        this.openAddForm = function () {
            this.addContactButton.click();
        };

        this.openEditForm = function (index) {
            this.editButtons.get(index).click();
        };
        
        this.showDetails = function (index) {
            this.detailButtons.get(index).click();
        };
    };

    module.exports = Contacts;
})();
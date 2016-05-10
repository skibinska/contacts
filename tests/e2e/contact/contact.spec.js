'use strict';

var AddOrEditContact = require('./contact.pageObject.js');

fdescribe('contacts-gateway service: ', function () {

    var addOrEditContact = new AddOrEditContact();

    var addNewContactButton = element(by.css('[ng-click="vm.editContact({})"]'));
    var contacts = element.all(by.repeater('contact in vm.contacts'));
    var editButton = element(by.css('[ng-click="vm.editContact(contact)"]'));
    var modal = element(by.id('contact'));

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('add new contact', function () {

        it('should display modal', function () {
            addNewContactButton.click();
            expect(modal.isDisplayed()).toBe(true);
        });
        it('should create a new contact', function () {
            addNewContactButton.click();

            addOrEditContact.addContact('Ewelina Skibinska', 'eweluszek', 'Brunswick', 'London', 'sk@gmail.com', '77777777');

            expect(contacts.count()).toBe(11);
            browser.sleep(5000); //used just to see the contact list update
        });
    });

    describe('update contact', function () {


    });
});
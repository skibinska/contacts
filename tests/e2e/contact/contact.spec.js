'use strict';

var AddOrEditContact = require('./contact.pageObject.js');
var Contacts = require('../contacts/contacts.pageObject.js');

fdescribe('contacts-gateway service: ', function () {

    var contact = new AddOrEditContact();
    var contacts = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('edit contact', function () {
        it('should edit contact name', function () {
            contacts.openEditForm(0);
            expect(contact.contactName(0)).toBe('Chelsey Dietrich');
            contact.editName('-Boo');
            browser.sleep(2000);
            expect(contact.contactName(0)).toBe('Chelsey Dietrich-Boo');
        });
    });

    describe('show details', function () {
        it('should show details on click of detail button', function () {
            contacts.showDetails(6);
            expect(contact.contactNameDetail()).toBe('Leanne Graham');
        });
    });

    describe('delete contact', function () {
        it('should delete third contact', function () {
            contacts.deleteContact(2);
            expect(contacts.countContacts()).toBe(9);
        });
    });
});
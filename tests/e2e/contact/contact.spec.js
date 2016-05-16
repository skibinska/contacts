'use strict';

var AddOrEditContact = require('./contact.pageObject.js');
var Contacts = require('../contacts/contacts.pageObject.js');

describe('contacts-gateway service: ', function () {

    var contact = new AddOrEditContact();
    var contacts = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('edit contact', function () {
        it('should edit contact name', function () {
            contacts.openEditForm(0);
            expect(contact.contactName(0)).toBe('Chelsey Dietrich');
            contact.editName('Chelsey Dietrich-Boo');
            browser.sleep(3000);
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
            expect(contact.contactName(2)).toBe('Clementine Bauch');
            contacts.deleteContact(2);
            expect(contact.contactName(2)).toBe('Ervin Howell');
            expect(contacts.countContacts()).toBe(9);
        });
    });
});
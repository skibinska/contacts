'use strict';

var AddOrEditContact = require('./contact.pageObject.js');
var Contacts = require('../contacts/contacts.pageObject.js');

describe('Contact ', function () {

    var contact = new AddOrEditContact();
    var contacts = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('should update added contact', function () {

        it('should add and then update new contact', function () {

            // add a new contact
            contacts.openAddForm();
            contact.addContact('Ewelina Skibinska', 'eweluszek', 'Brunswick', 'London', 'sk@gmail.com', '77777777');
            browser.sleep(2000);

            // edit contact
            contacts.openEditForm(4);
            expect(contact.getName()).toEqual('Ewelina Skibinska');
            contact.editName('Ewelina Maria Skibinska');
            expect(contact.contactName(4)).toEqual('Ewelina Maria Skibinska');
        });
    });
});
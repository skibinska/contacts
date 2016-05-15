'use strict';

var AddOrEditContact = require('./contact.pageObject.js');
var Contacts = require('../contacts/contacts.pageObject.js');

describe('Contact ', function () {

    var contact = new AddOrEditContact();
    var contacts = new Contacts();

    var modal = element(by.id('contact'));
    var modalDetails = element(by.id('contact-preview'));

    var deleteButton = element(by.css('[ng-click="vm.deleteContact(contact.id)"]'));
    var closeModal = element(by.css('[ng-click="vm.cancel()"]'));

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('should update added contact', function () {

        it('should add, find and then update new contact', function () {

            // add a new contact
            contacts.openAddForm();
            contact.addContact('Ewelina Skibinska', 'eweluszek', 'Brunswick', 'London', 'sk@gmail.com', '77777777');
            browser.sleep(2000);

            // edit contact

            contacts.openEditForm(4);
            expect(contact.getValue(contact.nameInput)).toEqual('Ewelina Skibinska');
            contacts.clearInput(contact.nameInput);
            contact.editName('Ewelina Maria Skibinska');
            expect(contact.getName(4)).toEqual('Ewelina Maria Skibinska');


            //search new contact
            //contacts.findInAllContacts('Ewelina');
            //contacts.searchInput.getAttribute('value').then(function (value) {
            //    var contactName = element(by.binding('contact.name'));
            //    expect(contactName.getText()).toEqual(value + ' Skibinska');
            //    browser.sleep(3000);

            //edit new contact

            //editButton.click().then(function () {
            //    var contactNameEdit = element(by.model('vm.contact.name'));
            //    contactNameEdit.clear().then(function () {
            //        contactNameEdit.sendKeys('Ewelina Maria Pudlo').then(function () {
            //            saveButton.click();

            //addOrEditContact.editName('Ewelina Maria Pudlo');
            //expect(contactName.getText()).toEqual('Ewelina Maria Pudlo');
            //browser.sleep(3000);
            //
            ////show contact details
            //detailButton.click().then(function () {
            //    expect(modalDetails.isDisplayed()).toBe(true);

            //    console.log(closeModal.getTagName());
            //    //closeModal.click();
            //
            //    //delete contact
            //    deleteButton.click();
            //
            //    //clear search input
            //    searchInput.clear();
            //    expect(contacts.count()).toBe(10);
        });
        //        });// tu
        //    });//tu
        //}); // tu
        //});//tu
        //    });
    });
});
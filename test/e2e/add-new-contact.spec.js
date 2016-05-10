'use strict';
fdescribe('contacts-gateway service: ', function () {

    var addNewContactButton = element(by.css('[ng-click="vm.editContact({})"'));
    var contacts = element.all(by.repeater('contact in vm.contacts'));
    var modal = element(by.id('contact'));

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('add new contact', function () {

        var addName = element(by.model('vm.contact.name'));
        var addUsername = element(by.model('vm.contact.username'));
        var addAddressStreet = element(by.model('vm.contact.address.street'));
        var addAddressCity = element(by.model('vm.contact.address.city'));
        var addEmail = element(by.model('vm.contact.email'));
        var addPhone = element(by.model('vm.contact.phone'));
        var save = element(by.css('button[type="submit"]'));

        it('should display modal', function () {
            addNewContactButton.click();
            expect(modal.isDisplayed()).toBe(true);
        });
        it('should create new contact', function () {
            addNewContactButton.click();
            addName.sendKeys('Ewelina Skibinska');
            addUsername.sendKeys('eweluszek');
            addAddressStreet.sendKeys('Brunswick');
            addAddressCity.sendKeys('London');
            addEmail.sendKeys('sk@gmail.com');
            addPhone.sendKeys('77777777');
            save.click();
            expect(contacts.count()).toBe(11);
        });
    });
});
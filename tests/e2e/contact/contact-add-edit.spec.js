'use strict';
describe('update contact', function () {

    var addNewContactButton = element(by.css('[ng-click="vm.editContact({})"]'));
    var contacts = element.all(by.repeater('contact in vm.contacts'));
    var detailButton = element(by.css('[ng-click="vm.showContact(contact)"]'));
    var editButton = element(by.css('[ng-click="vm.editContact(contact)"]'));
    var modal = element(by.id('contact'));
    var modalDetails = element(by.id('contact-preview'));
    var saveButton = element(by.css('button[type="submit"]'));
    var deleteButton = element(by.css('[ng-click="vm.deleteContact(contact.id)"]'));
    var closeModal = element(by.css('[ng-click="vm.cancel()"]'));

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('should update added contact', function () {
        var name = element(by.model('vm.contact.name'));
        var username = element(by.model('vm.contact.username'));
        var street = element(by.model('vm.contact.address.street'));
        var city = element(by.model('vm.contact.address.city'));
        var email = element(by.model('vm.contact.email'));
        var phone = element(by.model('vm.contact.phone'));
        var searchInput = element(by.model('search'));

        it('should add and then update new contact', function () {
            // add a new contact
            addNewContactButton.click();
            name.sendKeys('Ewelina Skibinska');
            username.sendKeys('eweluszek');
            street.sendKeys('Brunswick');
            city.sendKeys('London');
            email.sendKeys('sk@gmail.com');
            phone.sendKeys('1234567');
            saveButton.click();
            browser.sleep(3000);

            //search new contact
            searchInput.sendKeys('Ewelina');
            searchInput.getAttribute('value').then(function (value) {
                var contactName = element(by.binding('contact.name'));
                expect(contactName.getText()).toEqual(value + ' Skibinska');
                browser.sleep(3000);

                //edit new contact
                editButton.click().then(function () {
                    var contactNameEdit = element(by.model('vm.contact.name'));
                    contactNameEdit.clear().then(function () {
                        contactNameEdit.sendKeys('Ewelina Maria Pudlo').then(function () {
                            saveButton.click();
                            expect(contactName.getText()).toEqual('Ewelina Maria Pudlo');
                            browser.sleep(3000);

                            //show contact details
                            detailButton.click().then(function () {
                                expect(modalDetails.isDisplayed()).toBe(true);

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
                        });
                    });
                });
            });
        });
    });
});
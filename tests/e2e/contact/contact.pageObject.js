(function () {
    'use strict';
    var AddOrEditContact = function () {

        // add a new contact
        this.nameInput = element(by.model('vm.contact.name'));
        this.usernameInput = element(by.model('vm.contact.username'));
        this.streetInput = element(by.model('vm.contact.address.street'));
        this.cityInput = element(by.model('vm.contact.address.city'));
        this.emailInput = element(by.model('vm.contact.email'));
        this.phoneInput = element(by.model('vm.contact.phone'));

        this.saveButton = element(by.css('button[type="submit"]'));

        this.name = element(by.binding('vm.contact.name'));

        this.addContact = function (name, username, street, city, email, phone) {
            this.nameInput.sendKeys(name);
            this.usernameInput.sendKeys(username);
            this.streetInput.sendKeys(street);
            this.cityInput.sendKeys(city);
            this.emailInput.sendKeys(email);
            this.phoneInput.sendKeys(phone);

            this.saveButton.click();
        };

        this.getName = function () {
            return this.nameInput.getAttribute('value');
        };

        this.editName = function (name) {
            this.nameInput.clear();
            this.nameInput.sendKeys(name);
            this.saveButton.click();
        };

        this.contactName = function (index) {
            return element(by.repeater('contact in vm.contacts').row(index).column('contact.name')).getText();
        };

        this.contactNameDetail = function () {
            return this.name.getText();
        };
    };

    module.exports = AddOrEditContact;
})();

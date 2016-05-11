(function () {
    'use strict';
    var AddOrEditContact = function () {

        // add a new contact
        this.name = element(by.model('vm.contact.name'));
        this.username = element(by.model('vm.contact.username'));
        this.street = element(by.model('vm.contact.address.street'));
        this.city = element(by.model('vm.contact.address.city'));
        this.email = element(by.model('vm.contact.email'));
        this.phone = element(by.model('vm.contact.phone'));

        //buttons
        this.addNewContactButton = element(by.css('[ng-click="vm.editContact({})"]'));
        this.deleteButton = element(by.css('[ng-click="vm.deleteContact(contact.id)"]'));
        this.detailButton = element(by.css('[ng-click="vm.showContact(contact)"]'));
        this.editButton = element(by.css('[ng-click="vm.editContact(contact)"]'));
        this.saveButton = element(by.css('button[type="submit"]'));

        //inputs
        this.searchInput = element(by.model('search'));

        this.addContact = function (name, username, street, city, email, phone) {
            this.name.sendKeys(name);
            this.username.sendKeys(username);
            this.street.sendKeys(street);
            this.city.sendKeys(city);
            this.email.sendKeys(email);
            this.phone.sendKeys(phone);

            this.saveButton.click();
        };

        this.editName = function (name) {
            this.name.getText();
        };
    };

    module.exports = AddOrEditContact;
})();

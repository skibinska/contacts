(function () {
    'use strict';
    var AddOrEditContact = function () {

        // add a new contact
        this.nameInput = element(by.model('vm.contact.name'));
        this.userNameInput = element(by.model('vm.contact.username'));
        this.streetInput = element(by.model('vm.contact.address.street'));
        this.cityInput = element(by.model('vm.contact.address.city'));
        this.emailInput = element(by.model('vm.contact.email'));
        this.phoneInput = element(by.model('vm.contact.phone'));

        //buttons
        this.addNewContactButton = element(by.css('[ng-click="vm.editContact({})"]'));
        this.deleteButton = element(by.css('[ng-click="vm.deleteContact(contact.id)"]'));
        this.detailButtons = element(by.css('[ng-click="vm.showContact(contact)"]'));
        this.editButtons = element(by.css('[ng-click="vm.editContact(contact)"]'));
        this.saveButton = element(by.css('button[type="submit"]'));

        //inputs
        this.searchInput = element(by.model('search'));

        this.addContact = function (name, username, street, city, email, phone) {
            this.nameInput.sendKeys(name);
            this.userNameInput.sendKeys(username);
            this.streetInput.sendKeys(street);
            this.cityInput.sendKeys(city);
            this.emailInput.sendKeys(email);
            this.phoneInput.sendKeys(phone);

            this.saveButton.click();
        };

        this.editName = function (newName) {
            this.addContact('Ewelina Skibinska', 'eweluszek', 'Brunswick', 'London', 'sk@gmail.com', '77777777').then(function () {
                this.editButtons.click().then(function () {
                    this.nameInput.clear().then(function () {
                        this.nameInput.sendKeys(newName).then(function () {
                            this.saveButton.click();
                        });
                    });
                });
            });
        };
    };

    module.exports = AddOrEditContact;
})();

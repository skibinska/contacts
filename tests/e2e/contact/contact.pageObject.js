(function () {
    'use strict';
    var AddOrEditContact = function () {

        this.name = element(by.model('vm.contact.name'));
        this.username = element(by.model('vm.contact.username'));
        this.street = element(by.model('vm.contact.address.street'));
        this.city = element(by.model('vm.contact.address.city'));
        this.email = element(by.model('vm.contact.email'));
        this.phone = element(by.model('vm.contact.phone'));
        this.saveButton = element(by.css('button[type="submit"]'));

        this.addContact = function (name, username, street, city, email, phone) {
            this.name.sendKeys(name);
            this.username.sendKeys(username);
            this.street.sendKeys(street);
            this.city.sendKeys(city);
            this.email.sendKeys(email);
            this.phone.sendKeys(phone);

            this.saveButton.click();
        };

        //this.editContact = function (name) {
        //    this.name.getText();
        //};
    };

    module.exports = AddOrEditContact;
})();

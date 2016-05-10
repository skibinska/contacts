'use strict';
xdescribe('contacts-gateway service: ', function () {

    beforeEach(function () {
        browser.get('http://local.contacts.com/');
    });

    it('should delete contact when delete button is clicked', function () {
        var deleteButton = element(by.repeater('contact in vm.contacts').row(0)).element(by.css('.btn.btn-danger'));
        var contacts = element.all(by.repeater('contact in vm.contacts')).then(function (contacts) {
            var firstContact = contacts[0]

            deleteButton.click();
            expect(contact).not.toBeDefined();
        });
    });

});
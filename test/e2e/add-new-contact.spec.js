'use strict';
xdescribe('contacts-gateway service: ', function () {

    beforeEach(function () {
        browser.get('http://local.contacts.com/');
    });

    describe('add new contact', function () {
        var button = element(by.linkText(' Add New Contact'));
        var modal = element(by.className('modal-fade'));
        button.click();
        expect(modal.isDisplayed()).toBe(true);
    });
});
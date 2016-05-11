'use strict';

var Contacts = require('./contacts.pageObject.js');

describe('contacts.config: ', function () {

    var contacts = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('page loading', function () {
        it('should check the page title', function () {
            var browserTitle = browser.getTitle();
            expect(browserTitle).toEqual('contacts');
        });
        it('should default to contacts page', function () {
            expect(browser.getLocationAbsUrl()).toContain('/contacts');
        });
        it('should display all contacts', function () {
            expect(contacts.allContacts.count()).toBe(10);
        });
        it('should display Add New Contact button', function () {
            expect(contacts.addContactButton).toBeDefined();
        });
    });

    describe('navigation', function () {
        it('should navigate to contact modal on click of the detail button', function () {
            contacts.detailButton.click();
            expect(browser.getLocationAbsUrl()).toContain('/preview');
        });
    });

    describe('redirection', function () {
        it('should redirect to contacts page if an unknown url is provided', function () {
            browser.get('http://local.contacts.com/dummy');
            expect(browser.getLocationAbsUrl()).toContain('/contacts');
        });
    });
});
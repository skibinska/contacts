'use strict';

var Contacts = require('./contacts.pageObject.js');

describe('contacts.config: ', function () {

    var contacts = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('page loading', function () {
        it('should check the page title', function () {
            expect(contacts.browserTitle()).toEqual('contacts');
        });
        it('should default to contacts page', function () {
            expect(contacts.findInUrl()).toContain('/contacts');
        });
        it('should display all contacts', function () {
            expect(contacts.countContacts()).toBe(10);
        });
        it('should display Add New Contact button', function () {
            expect(contacts.addContactButton).toBeDefined();
        });
        it('should Add New Contact button be present on the website', function () {
            expect(contacts.addContactButton.isPresent()).toBe(true);
        });
    });

    describe('navigation', function () {
        it('should navigate to contact modal on click of the detail button', function () {
            contacts.showDetails(0);
            expect(contacts.findInUrl()).toContain('/preview');
        });
        it('should navigate to add modal on click of the add new contact button', function () {
            contacts.openAddForm();
            expect(contacts.findInUrl()).toContain('/add');
        });
        it('should navigate to edit modal on click of the edit contact button', function () {
            contacts.openEditForm(0);
            expect(contacts.findInUrl()).toContain('/edit');
        });
    });

    describe('redirection', function () {
        it('should redirect to contacts page if an unknown url is provided', function () {
            browser.get('http://local.contacts.com/dummy');
            expect(contacts.findInUrl()).toContain('/contacts');
        });
    });
});
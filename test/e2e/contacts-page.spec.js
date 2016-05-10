'use strict';
describe('contacts.config: ', function () {

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    describe('page loading', function () {
        it('should default to contacts page', function () {
            expect(browser.getLocationAbsUrl()).toContain('/contacts');
        });
        it('should display all contacts', function () {
            var contacts = element.all(by.repeater('contact in vm.contacts'));
            expect(contacts.count()).toBe(10);
        });
        it('should display Add New Contact button', function () {
            var button = element(by.linkText(' Add New Contact'));
            expect(button).toBeDefined();
        });
    });

    describe('navigation', function () {
        it('should navigate to contact modal on click of the detail button', function () {
            var detail = element(by.linkText('Detail'));
            detail.click();
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
'use strict';
describe('search contacts', function () {

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should render at least one result', function () {
        var searchInput = element(by.model('search'));
        var contacts = element.all(by.repeater('contact in vm.contacts'));
        searchInput.sendKeys('ervin');
        expect(contacts.count()).toBe(1);
        searchInput.clear();
        expect(contacts.count()).toBe(10);
    });
});
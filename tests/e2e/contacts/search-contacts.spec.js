'use strict';

var Contacts = require('./contacts.pageObject.js');

describe('search contacts', function () {

    var search = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should render at least one result', function () {
        search.findInAllContacts('ervin');
        expect(search.countContacts()).toBe(1);
        browser.sleep(2000);

        search.clearInput();
        expect(search.countContacts()).toBe(10);
    });
});
'use strict';

var Contacts = require('./contacts.pageObject.js');

describe('search contacts', function () {

    var search = new Contacts();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should render at least one result', function () {
        search.findInAllContacts('ervin');
        expect(search.allContacts.count()).toBe(1);
        browser.sleep(2000);

        search.searchInput.clear();
        expect(search.allContacts.count()).toBe(10);
    });
});
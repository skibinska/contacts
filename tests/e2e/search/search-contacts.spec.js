'use strict';

var Search = require('./search.pageObject.js');

describe('search contacts', function () {

    var search = new Search();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should render at least one result', function () {
        search.findInAllContacts('ervin');
        expect(search.allContacts.count()).toBe(1);
        browser.sleep(3000);

        search.searchInput.clear();
        expect(search.allContacts.count()).toBe(10);
    });
});
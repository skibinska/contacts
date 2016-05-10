(function () {
    'use strict';
    var Search = function () {
        this.searchInput = element(by.model('search'));
        this.allContacts = element.all(by.repeater('contact in vm.contacts'));

        this.findInAllContacts = function (phrase) {
            this.searchInput.sendKeys(phrase);
        };
    };

    module.exports = Search;
})();
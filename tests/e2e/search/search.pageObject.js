(function () {
    'use strict';
    var Search = function () {
        this.searchInput = element(by.model('search'));
        this.allContacts = element.all(by.repeater('contact in vm.contacts'));

        this.findInAllContacts = function (word) {
            this.searchInput.sendKeys(word);
        };
    };

    module.exports = Search;
})();
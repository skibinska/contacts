(function () {
    'use strict';

    angular
        .module('contactsApp')
        .directive('elementAutofocus', directiveFn);

    function directiveFn() {
        var directive = {
            restrict: 'A',
            compile: compileFn
        };
        return directive;

        function compileFn(tElem, tAttrs) {

            var tagName = tElem[0].tagName.toLowerCase();

            if (tagName !== 'input' && tagName !== 'textarea') {
                throw new Error('only input and textarea are focusable');
            }

            return linkFn;

            function linkFn (scope,element,attrs) {
                element.focus();
            }
        }
    }
})();

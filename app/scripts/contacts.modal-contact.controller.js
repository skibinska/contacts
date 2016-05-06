(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ModalContactController', controllerFn);

    function controllerFn(contact, $scope, $uibModalInstance) {
        $scope.contact = contact;
        $scope.ok = ok;

        function ok() {
            $uibModalInstance.close();
        }
    }
})();
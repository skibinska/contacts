(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ModalContactDetailController', controllerFn);

    function controllerFn(contact, $scope, $uibModalInstance) {
        $scope.contact = contact;
        $scope.ok = ok;

        function ok() {
            $uibModalInstance.close();
        }
    }
})();
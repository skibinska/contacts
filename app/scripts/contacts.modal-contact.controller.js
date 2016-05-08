(function () {
    'use strict';
    angular
        .module('contactsApp')
        .controller('ModalContactController', controllerFn);

    function controllerFn(contact, $uibModalInstance) {
        var vm = this;
        vm.contact = angular.copy(contact);
        vm.cancel = cancel;
        vm.confirm = confirm;

        function cancel() {
            $uibModalInstance.dismiss();
        }

        function confirm() {
            for (var property in vm.contact) {
                if (vm.contact.hasOwnProperty(property)) {
                    //console.info(property, 'new', vm.contact[property], 'old', contact[property]);
                    contact[property] = vm.contact[property];
                }
            }
            $uibModalInstance.close();
        }
    }
})();
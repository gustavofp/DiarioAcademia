﻿(function () {

    "use strict";
    //using
    alunoDetailsController.$inject = ["alunoService", "turmaService", "$stateParams", "$state", "$scope", "cepService",
                                      "$translate", "SweetAlert"];

    //namespace
    angular
        .module("app.aluno")
        .controller("alunoDetailsController", alunoDetailsController);

    //class
    function alunoDetailsController(alunoService, turmaService, params, $state, $scope, cepService, $translate, SweetAlert) {
        var vm = this;
        vm.title = "Atualização de Alunos";
        vm.aluno = { endereco: { cep: "" } };
        vm.turmas = [];

        //script load
        activate();

        function activate() {
            turmaService.getTurmas()
                .then(function (dataTurmas) {

                    alunoService.getAlunoById(params.alunoId)
                        .then(function (resultsAluno) {

                            vm.turmas = dataTurmas;
                            vm.aluno = convertDtoToAluno(resultsAluno);
                        });
                });
        }

        //public methods
        vm.save = function () {
            SweetAlert.swal({
                title: $translate.instant('confirm.CONFIRM_EDIT'),
                text: $translate.instant('confirm.CONFIRM_EDIT_STUDENT', { studentName: vm.aluno.nome }),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('action.OK').toUpperCase(),
                cancelButtonText: $translate.instant('action.CANCEL').toUpperCase(),
                closeOnConfirm: false,
                closeOnCancel: false
            }, actionEdit);
        };

        vm.clearFields = function () {
            vm.aluno = {};
            vm.aluno = { endereco: { cep: "" } };
            vm.alunoForm.$setPristine();
        }

        $scope.$watch(angular.bind(this, function () {
            if (vm.aluno.endereco)
                return vm.aluno.endereco.cep;
            return vm.aluno.cep;
        }), function (newVal) {
            if (newVal) {
                cepService.getEndereco(newVal).then(function (result) {
                    vm.aluno.endereco.bairro = result.bairro;
                    vm.aluno.endereco.localidade = result.localidade;
                    vm.aluno.endereco.uf = result.uf;
                });
            }
        });

        //private methods
        function convertDto(aluno) {
            return {
                id: aluno.id,
                turmaId: aluno.turma.id,
                descricao: aluno.nome + ": Presenças: 0, Faltas: 0 ",
                cep: aluno.endereco.cep,
                bairro: aluno.endereco.bairro,
                localidade: aluno.endereco.localidade,
                uf: aluno.endereco.uf
            };
        }

        function getTurmaById(id) {
            for (var i = 0; i < vm.turmas.length; i++) {
                if (vm.turmas[i].id == id) {
                    return vm.turmas[i];
                }
            }
        }

        function convertDtoToAluno(alunoDto) {
            return {
                id: alunoDto.id,
                nome: alunoDto.nome.split(':')[0],
                turma: getTurmaById(alunoDto.turma.id),
                endereco: {
                    cep: alunoDto.endereco.cep,
                    bairro: alunoDto.endereco.bairro,
                    localidade: alunoDto.endereco.localidade,
                    uf: alunoDto.endereco.uf
                }
            };
        }

        function actionEdit(isConfirm) {
            if (!isConfirm) {
                SweetAlert.swal($translate.instant('status.ACTION_CANCELED'),
                                $translate.instant('info.STUDENT_NOT_EDITED'), 'error');
                return;
            }
            alunoService.edit(convertDto(vm.aluno)).then(function () {
                SweetAlert.swal($translate.instant('status.SUCCESS'),
                              $translate.instant('info.STUDENT_EDITED'), "success");
                $state.go('app.aluno.list');
            });
        }

    }

})();
﻿using Microsoft.VisualStudio.TestTools.UnitTesting;
using NDDigital.DiarioAcademia.Aplicacao.Services;
using NDDigital.DiarioAcademia.Infraestrutura.DAO.Common.Uow;
using NDDigital.DiarioAcademia.Infraestrutura.Orm.Security;
using NDDigital.DiarioAcademia.IntegrantionTests.Base;
using NDDigital.DiarioAcademia.IntegrationTests.Base;
using NDDigital.DiarioAcademia.IntegrationTests.Common;
using System.Data.Entity;

namespace NDDigital.DiarioAcademia.IntegrationTests.Security
{
    [TestClass]
    public class GroupRepositoryTest
    {
        public IGroupRepository _repoGroup;
        public IPermissionRepository _repoPermission;
        private AuthorizationService _service;

        public DatabaseFixture databaseFixture = new DatabaseFixture();

        private IUnitOfWork uow;

        [TestInitialize]
        public void Initialize()
        {
            _repoGroup = new GroupRepository(databaseFixture.Factory);
            _repoPermission = new PermissionRepository(databaseFixture.Factory);

            uow = databaseFixture.UnitOfWork;

            var store = new MyAccountStore(databaseFixture.Factory.Get());

            var userRepository = new AccountRepository(store);

            _service = new AuthorizationService(_repoGroup, _repoPermission, userRepository, uow);

            Database.SetInitializer(new BaseTest());
        }

        [TestMethod]
        [TestCategory("Authorization - Group")]
        public void Deveria_Adicionar_Um_Grupo()
        {
            _repoGroup.Add(ObjectBuilder.CreateGroup());

            uow.Commit();

            var list = _repoGroup.GetAll();

            Assert.AreEqual(3, list.Count);
        }

        [TestMethod]
        [TestCategory("Authorization - Group")]
        public void Deveria_Excluir_Um_Grupo()
        {
            var group = _repoGroup.GetById(1);

            _repoGroup.Delete(group);

            uow.Commit();

            var list = _repoGroup.GetAll();

            Assert.AreEqual(1, list.Count);
        }

        [TestMethod]
        [TestCategory("Authorization - Group")]
        public void Deveria_Buscar_Todos_Grupos()
        {
            var list = _repoGroup.GetAll();

            Assert.AreEqual(2, list.Count);
        }
    }
}
class UserService {
  searchUsers() {
    const users = [{
        nome: 'Diehl',
        sobrenome: 'Wesley',
        curso: 'Backend',
        instituicao: 'Awari'
      },{
        nome: 'Diehl',
        sobrenome: 'Wesley',
        curso: 'Backend',
        instituicao: 'Awari'
      }];
    return users;
  }
}

export default new UserService();
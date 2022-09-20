const knex = require("../database/connection");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { v4: uuid } = require('uuid');

const jwtSecret = "hfduhfsdfhsdksdff";

class User {

  async login(email, password) {
    const userEmail = await this.findByEmail(email);
    if(userEmail.status){
      const passwordConfirm = await bcrypt.compare(password, userEmail.user.password);
      if(passwordConfirm) {
        const token = await jwt.sign({email: userEmail.user.email, role: userEmail.user.role}, jwtSecret, {expiresIn: "48h"})
        return {status: true, msg: "Usuário logado", token: token}
      } else {
        return {status: false, scode: 401, err: "Senha incorreta"}
      }
    } else {
      return {status: false, scode: 404, err: "E-mail não cadastrado"}
    }
  }
  
  async create(name, email, password) {
    try {
      const userEmail = await this.findByEmail(email);
      if(userEmail.status) {
        return {status: false, err: "E-mail já cadastrado"}
      } else {
        const hash = await bcrypt.hash(password, 10)
        const user = await knex.insert({name, email, password: hash}).table("users");
        return {status: true}
      }
    } catch (err) {
      return {status: false, err: "Houve um erro ao criar usuário"}
    }
  }

  async findByEmail(email){
    try {
      const user = await knex.select("*").where({email: email}).table("users");
      if(user.length > 0) {
        return {status: true, user: user[0]}
      } else {
        return {status: false}
      }
    } catch (err) {
      return false
    }
  }

  async findAll() {
    try {
      const users = await knex.select("*").table("users");
      if(users.length>0) {
        return users;
      } else {
        return false
      }
      
    } catch (err) {
      return false
    }
  }

  async findById(id){
    try {
      const user = await knex.select("*").where({id_user: id}).table("users");
      if(user.length>0) {
        return {status: true, user: user[0]}
      } else {
        return {status: false, scode: 404, err: "O usuário não existe"}
      }
    } catch (err) {
      return {status: false, scode: 500, err: "Erro no servidor"}
    }
  }

  async update(id, name, email, role) {
    try {
      const userById = await this.findById(id);
      if(userById.status) {
        const user = await knex.update({name, email, role}).where({id_user:id}).table("users");
        return {status: true}
      } else {
        return {staus: false, scode: 404, err: "O usuário não existe"}
      }
    } catch (err) {
      return {status: false, scode: 400, err: "Houve algum erro ao atualizar usuário"}
    }
  }

  async remove(id) {
    try {
      const userById = await this.findById(id);
      if(userById.status) {
        const user = await knex.del().where({id_user: id}).table("users");
        return {status: true}
      } else {
        return {status: false, scode: 404, err: "O usuário não existe"}
      }
    } catch (err) {
      return {status: false, scode: 400, err: "Houve um erro ao deletar usuário"+err}
    }
  }

  async recoveryPassword(email) {
    const user = await knex.select("*").where({email: email}).table("users");
    try {
      if(user.length>0) {
        const userId = user[0].id_user;
        const createToken = await knex.insert({token: uuid(), user_id: userId}).table("passwordstokens");
        const token = await this.token(userId);
        return {status: true, token: token}
      } else {
        return {status: false, scode: 404, err: "Usuário não existe"}
      }
    } catch (err) {
      return {status: false, scode: 400, err: "Erro ao gerar token"}
    }
  }

  async token(id) {
    const token = await knex.select("*").where({user_id: id}).table("passwordstokens").orderBy("id_token", "desc");
    if(token.length>0) {
      return token[0].token;
    } else {
      return false
    }
  }

  async tokenRecovery(token, password) {
    try {
      const tokenPassword = await knex.select("*").where({token: token}).table("passwordstokens");
      if(tokenPassword.length>0){
          if(tokenPassword[0].used == "0") {
            const hash = await bcrypt.hash(password, 10)
            const passwordEdit = await knex.update({password: hash}).where({id_user: tokenPassword[0].user_id}).table("users")
            const tokenUsedEdit = await knex.update({used: "1"}).where({token: token}).table("passwordstokens")
            return {status: true}
          } else {
            return {status: false, scode: 400, err: "Token já usado"}
          }
      } else {
        return {staus: false, scode: 404, err: "Token inválido"}
      }
      
    } catch (err) {
      return {status: false, scode: 500, err: "Houve algum erro"+err}
    }
 
  }

}


module.exports = new User();
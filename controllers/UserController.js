const User = require("../services/User");
const nodemailer = require("nodemailer");

class UserController {

  async login(req, res) {
    const {email, password} = req.body;

    try {
      const user = await User.login(email, password);
      if(user.status) {
        res.status(200).json(user);
      } else {
        res.status(user.scode).json(user)
      }
    } catch (err) {
      
    }
  }

  async create(req, res) {
    const {name, email, password} = req.body;
    const user = await User.create(name, email, password);

    if(user.status) {
      res.status(201).json(user)
    } else {
      res.status(user.scode).json(user)
    }
  } 


  async findAll(req, res) {
    try {
      const users = await User.findAll();
      if(!users) {
        res.json({})
      } else {
        res.json(users)
      }
    } catch (err) {
      res.json({err: "Erro ao buscar usuários"})
    }
  }

  async findById(req, res) {
    try {
      const user = await User.findById(req.params.id)
      if(user) {
        res.json({user: user})
      } else {
        res.status(404).json({status: false, err: "O usuário não existe"})
      }
    } catch (err) {
      res.status(500).json({status: false, err: "Erro no servidor"})
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const {name, email, role} = req.body;

    const userEdit = await User.update(id, name, email, role)
    if(userEdit.status) {
      res.status(200).json({status: true, msg: "Usuário editado com sucesso!"})
    } else {
      res.status(userEdit.scode).json(userEdit);
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      const user = await User.remove(id);
      if(user.status) {
        res.status(200).json({status: true, msg: "Usuário deletado com sucesso!"})
      } else {
        res.status(user.scode).json(user)
      }
    } catch (err) {
      
    }
  }

  async recovery(req, res) {
    const email = req.body.email;
    const link = req.params.link;
    try {
      const userRecovery = await User.recoveryPassword(email)
      let user = await User.findByEmail(email)
      if(user.status) {
        user = user.user;
      }
      if(userRecovery.status) {
        if(userRecovery.token != false) {
          let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "guilherme09396@hotmail.com", // generated ethereal user
              pass: "matematica9812", // generated ethereal password
            },
          });

          transporter.sendMail({
            from: 'Guilherme Gomes <guilherme09396@hotmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Notificação sobre agendamento de consulta", // Subject line
            html: `Boa tarde ${user.name}, segue o link para recuperação de senha: <a href="${link}/${userRecovery.token}">${link}/${userRecovery.token}</a>` // html body
          }).then((message) => {
            console.log(message)
          }).catch((err) => {
            console.log(err)
          })


        } else {
          res.json({status: false, err: "Erro ao pegar token"})
        }
      } else {
        res.status(userRecovery.scode).json(userRecovery)
      }
    } catch (err) {
      res.status(500).json({status: false, err: "Erro no servidor"})
    }
  }

  async recoveryConfirm(req, res) {
    const token = req.params.token;
    const {password} = req.body;
    
    try {
      const tokenRecovery = await User.tokenRecovery(token, password);
      if(tokenRecovery.status) {
        res.status(200).json({status: true, msg: "Senha editada com sucesso!"})
      } else {
        res.status(tokenRecovery.scode).json(tokenRecovery)
      }
    } catch (err) {
      res.status(500).json({status: false, err: "Erro no servidor"})
    }
  }

}

module.exports = new UserController();
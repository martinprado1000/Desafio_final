const SessionsService = require("../services/sessionsService");

class SessionsController {
  constructor() {
    this.sessionService = new SessionsService();
  }

  async getRegister(req, res) {
    // const result = await this.sessionService.get()
    // res.json(result)
  }

  async postRegister(req, res) {
    // const data = req.query
    // const result = await this.sessionService.postRegister(data)
    // res.json(result)
    return res.redirect("/login");
  }

  async postLogin(req, res) {
    //const id = req.params.pid
    // const result = await this.sessionService.postLogin()
    // res.json(result)
    return res.redirect("/realTimeProducts");
  }

  async deleteRegister(req,res) {
    const result = await this.sessionService.deleteRegister(req);
    res.json(result);
  }

  async resetPassword(req, res) {
    // const id = req.params.pid
    // const body = req.body
    // const result = await this.sessionService.resetPassword(id,body)
    // res.json(result)
    const data = req.body;
    let response = await manager.getUser(data.email);
    if (response == null) {
      res.json({
        status: 400,
        data: `El usuario ${data.email} no existe`,
      });
      return;
    }
    let responseRecovery = await manager.recoveryPassword(data);
    res.json(responseRecovery);
  }
}

module.exports = SessionsController;

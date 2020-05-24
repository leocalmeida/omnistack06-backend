require("dotenv").config();

const VALIDA = process.env.VALIDA;

module.exports = {
  async validation(req, res) {
    const valida = req.headers.authorization;

    if (VALIDA != valida) {
      return res.json({
        fail:
          "Você não tem autorização para realizar o upload de arquivos. Em caso de dúvidas, contate o suporte! +55 16 9-9345-1699.",
      });
    }

    return res.json({ ok: true });
  },
};

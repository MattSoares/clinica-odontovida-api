const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario.js');

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const senhaValida = await usuario.compararSenha(senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        //gera o JWT token

        const token = jwt.sign(
            {
                id: usuario._id,
                papel: usuario.papel,
            },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({ 
            token,
        usuario: {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            papel: usuario.papel,
        } 
        });
    } catch (erro) {
        res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    login,
};
function permitirPapeis(...papeisPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        if (!papeisPermitidos.includes(req.usuario.papel)) {
            return res.status(403).json({ mensagem: 'Acesso negado: Você não tem permissão para essa ação' });
        }

        next();
    };
}

module.exports = permitirPapeis;


const userLogout =  (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion :', err);
            return res.redirect('/');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur lors de la destruction de la session :', err);
            }
            res.redirect('/');
        });
    });
}

module.exports = userLogout;
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SESSION_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
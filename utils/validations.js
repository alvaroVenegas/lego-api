const isValidPassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return re.test(String(password));
};

module.exports = {
    isValidPassword
}
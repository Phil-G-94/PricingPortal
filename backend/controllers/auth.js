const putSignup = (req, res, next) => {
    res.status(201).json({
        message: "Signup successful",
    });
};

const postLogin = (req, res, next) => {
    res.status(200).json({
        message: "Login successful",
    });
};

export { putSignup, postLogin };

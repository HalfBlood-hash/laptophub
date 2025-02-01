const { Product } = require('../db');
const {ProductModal}=require('../modal/productmodal')
const { UserModal } = require('../modal/usermodal');
const { sendEmailverification } = require('../middleware/emailVerification');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//........................Get all users.................................
const getAllUser = async (req, res) => {
    let userlist = await UserModal.find();
    res.send({ message: "All user list", payload: userlist });
};

// ....................Post the user........................

const registerNewUser = async (req, res) => {
    let userlist = new UserModal(req.body);
    if (!userlist.email || !userlist.username || !userlist.password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    let hashpassword = await bcrypt.hash(userlist.password, 10);
    userlist.password = hashpassword;
    let code = Math.floor(100000 + Math.random() * 900000).toString();
    userlist.verificationCode = code;
    let newuser = await userlist.save();
    sendEmailverification(userlist.email, userlist.verificationCode);
    res.status(200).json({ success: true, message: "User created", payload: newuser });
};

// ...........Cart View ....................................................
const cartview = async (req, res) => {
    let userData = await UserModal.findOne({ username: req.params.username });
    let cartdata = userData.cart;
    let product = [];
    const abcValues = cartdata.map(obj => obj.abc);
    for (let abc of abcValues) {
        let pid = abc;
        let plist = await ProductModal.findOne({ _id: pid });
        product.push(plist);
        console.log('plist', plist);
    }
    res.send({ message: "UserDetails", payload: product });
};

// ..........................................Login......................................................
const login = async (req, res) => {
    const SESSION_KEY = 'abcde';
    let userlist = await UserModal.findOne({ username: req.body.username });
    if (userlist === null) {
        res.send({ message: "Invalid Username" });
    } else {
        let password = await bcrypt.compare(req.body.password, userlist.password);
        console.log(password);
        if (password) {
            let jwttoken = jwt.sign({ username: req.body.username }, SESSION_KEY, { expiresIn: '1d' });
            res.send({ message: 'Login successful', token: jwttoken, payload: userlist, user: userlist });
        } else {
            res.send({ message: "Invalid password" });
        }
    }
};

// ..............................................Add to Cart................................................
const addtocart = async (req, res) => {
    let productId = req.body.abc;
    let user = req.params.username;
    let productlist = await ProductModal.findOne({ _id: productId });
    if (productlist === null) {
        res.send({ message: "Sorry, product is not available right now" });
    } else {
        let userlist = await UserModal.findOne({ username: user });
        userlist.cart.push(req.body);
        let updatedUser = await UserModal.findOneAndUpdate({ username: user }, userlist);
        res.send({ message: "Added to cart", payload: req.body });
    }
};

// ..............Delete From Cart............................
const deletetocart = async (req, res) => {
    let username = req.params.username;
    let data = req.body.abc;
    console.log('this is data', data);
    let result = await UserModal.findOneAndUpdate({ username: username }, { '$pull': { cart: { abc: data } } });
    res.send({ message: "Removed from cart", payload: result });
};

const verifyemail = async (req, res) => {
    console.log(req.body);
    let user = await UserModal.findOne({ verificationCode: req.body.otp });
    console.log(user);

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    let currentTime = new Date().getTime();
    let timeStamp = user.updatedAt;
    let time = new Date(timeStamp);
    time.setTime(time.getTime() + 2 * 60 * 1000);
    if (currentTime >= time) {
        return res.status(400).json({ success: false, message: "OTP expired" });
    }
    user.isverified = true;
    user.verificationCode = undefined;
    await user.save();
    res.status(200).json({ success: true, message: "Verification successful" });
};

const resendOpt = async (req, res) => {
    let reqbody = req.body;
    console.log(reqbody.email);
    let user = await UserModal.findOne({ email: reqbody.email });
    console.log(user);
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }
    let code1 = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = code1;
    let newcode = await user.save();
    sendEmailverification(user.email, user.verificationCode);
    res.status(200).json({ success: true, message: "New code is sent", payload: newcode.verificationCode });
};

module.exports = { getAllUser, registerNewUser, login, addtocart, deletetocart, cartview, verifyemail, resendOpt };

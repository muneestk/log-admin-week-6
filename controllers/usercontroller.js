const User = require("../models/usermodal");
const bcrypt = require("bcrypt");




const securePassword = async(password) =>{
    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
        
    } catch (error) {

        console.log(error.message);

    }
}
 
const loadRegister = async(req, res) => {
    try {

        res.render('registration');
        
    } catch (error) {

        console.log(error.message);
        
    }
}


const insertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.pwd);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.render("registration", {
        message: "Email already registered",
      });
    }

  
    if (!req.body.name || req.body.name.trim().length === 0) {
      return res.render("registration", {
        message: "Please enter a valid name",
      });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();

    if (userData) {
      res.render("registration", { message: "Registration Success" });
    } else {
      res.render("registration", { message: "Registration Failed" });
    }
  } catch (error) {
    console.log(error.message);
  }
};






const  loginLoad = async(req, res) => {
    try {

        res.render('login')
        
    } catch (error) {
        console.log(error.message);
    }
}

const   verifyLogin = async(req,res) => {

    try {
        
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});

        if (userData) {

            const passwordMatch = await bcrypt.compare(password, userData.password);

            if(passwordMatch){
                if(userData.is_admin === 0 
                  // ||
                  // userData.is_admin == 1 
                  ){
                req.session.user_id = userData._id;

                res.redirect('/home')
                }
                else{

                    res.render('login', {message : "Email or password is incorrect"});

                }

            }
            else{

                res.render('login', {message : "Email or password is incorrect"});
            }
            
        } else {

            res.render('login', {message : "Please provide your correct Email and password "});

        }

    } catch (error) {
        console.log(error.message);
    }
}

const loadHome = async (req,res)=> {

        try {
            
            const userData = await User.findById({_id : req.session.user_id});
            res.render('home',{product});

        } catch (error) {

            console.log(error.message);
            
        }
}

const userLogout = async(req,res) =>{
    try {

        req.session.destroy();
        res.redirect('/');
        
    } catch (error) {

        console.log(error.message);
    }
}

let product = [
  {
    Link: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F03%2F39%2F03397cbe7e6d64dd592c43df4665f6d4529ab231.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    title: "BEACH SHIRT",
    price: "Rs.2299",
  },
  {
    Link: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Faf%2F49%2Faf49129546b2797999b0fa961c6a8d9c82e9e8d2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "BROWN GLITTERY",
    price: "Rs.1499",
  },
  {
    Link: "http://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fd2%2F21%2Fd221d33ef5b1a13a109f6390874af4f536463bf2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "SHORT FITTED",
    price: "Rs.2449",
  },
  {
    Link: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F3a%2F82%2F3a82e7c2fddfb96d3c63fc5a5ac69143a9ae63d3.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "OVER SIZED",
    price: "Rs.2129",
  },
  {
    Link: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F66%2F4e%2F664eeeb95660cbbaf437278737436dfaefb1274e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_dresses_aline%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "BEIGE JERSEY",
    price: "Rs.3299",
  },
  {
    Link: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fef%2F9f%2Fef9f40bb1b71392814dae4a795979e396265f902.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "BLUE JACK",
    price: "Rs.3449",
  },
  {
    Link: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F29%2F4c%2F294c46b69d5d5cb69564efc8cf1dd719bd16de39.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "SPORTS WEAR",
    price: "Rs.4499",
  },
  {
    Link: "http://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F55%2Fb5%2F55b572a48841dc71be7d1ca007b73e1894705cbb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    title: "SLIM FIT",
    price: "Rs.5199",
  },
];

module.exports = {

    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
}
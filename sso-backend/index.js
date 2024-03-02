const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001'], // Replace with your frontend origin
    credentials: true
  }));
app.use(cookieParser());
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('demo');
});

// Route to render the login page
app.get('/login', (req, res) => {
    const { callbackUrl } = req.query;
    if(req.cookies.email){
        const url= callbackUrl+'?email='+req.cookies.email;
        return res.redirect(url);
    } 
    res.render('login', { callbackUrl });
});

app.post('/login', (req, res) => {
    const { email, callbackUrl } = req.body;
    console.log(email, callbackUrl)
    res.cookie('email',email, { maxAge: 3600000}, {secure: true});
    if(callbackUrl)
        return res.redirect(callbackUrl+'?email='+email);
    return res.status(200).send({ message: 'Logged in successfully' });
});


app.get("/auth", (req, res) => {
    const email = req.cookies?.email;
    const isAuthinticated= Boolean(email);
    res.status(200).send({isAuthinticated, email});
})

app.get('/logout', (req, res) => {
    console.log('Logged out successfully',req.cookies?.email);
    res.clearCookie('email');
    res.send({ message: 'Logged out successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

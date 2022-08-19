const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

const authRouter = require("./routes/auth-router");
const mainRouter = require("./routes/main-router");
const appRouter = require("./routes/app-router");

const app = express();

const RedisStore = connectRedis(session);
const client = redis.createClient();

client.on('error', function (err) {
    console.log('Could not connection with redis', err);
});
client.on('connect', function () {
    console.log('Connected to redis successfully');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    store: new RedisStore({
        client: client,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge:  10000000
    }
}));

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/app', appRouter);

app.use((req, res) => {
    res.status(404).send({
        success: false,
        messages: ['Error 404: Page Not Found'],
    })
});

app.listen(process.env.PORT || 5000);

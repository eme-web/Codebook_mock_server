import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const server = express();
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', '*')
    next()
})

const router = jsonServer.router('./data/db.json');
server.use('/api', router);
server.use(
    cors({
        origin: ["https://codebook-snowy.vercel.app", "http://localhost:3000"],
        methods: ["GET","POST","PUT","DELETE"]
    })
)
server.db = router.db

const middlewares = jsonServer.defaults()
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600
})

server.use(rules)
server.use(auth)
server.use(middlewares)
server.use(router)

server.listen(8000);
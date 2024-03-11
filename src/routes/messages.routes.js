import { Router } from "express";
import { engine } from "express-handlebars";

const router = Router()

router.get('/', (req, res) => {
    res.render('message');
});













export default router
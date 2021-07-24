import { Router } from "express";
import { CreateUserController } from "./src/controllers/createUserController";
import { CreateTagController } from "./src/controllers/createTagController";
import { ensureAdmin } from "./src/middlewares/ensureAdmin";
import { AuthenticateUserController } from "./src/controllers/AuthenticateUserController";
import { CreateComplimentController } from "./src/controllers/CreateComplimentController";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./src/controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./src/controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./src/controllers/ListTagsController";
import { ListUsersController } from "./src/controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);
/**
 * o middleware "ensureAdmin" aparece contido entre o router "./tags" e o controller "createTagController" para que antes de o user conseguir criar a tag, nosso servidor possa primeiro verificar e autenticar o acesso a função de criar tag. Caso ele não tenha nivel de admin, será emitido um erro de acesso não autorizado, status 401.
 */
export { router };
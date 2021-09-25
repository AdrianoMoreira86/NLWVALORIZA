import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./midellewares/ensureAdmin";
import { ensureAuthenticated } from "./midellewares/ensureAthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticatorController";
import { CreateComplimentController} from "./controllers/CreateComplimentController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController} from "./controllers/ListUserSendComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUserController = new ListUsersController();


router.post('/users', createUserController.handle);
router.get('/users', ensureAuthenticated, listUserController.handle)

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/compliments',ensureAuthenticated ,createComplimentController.handle)

router.get('/users/compliments/send',ensureAuthenticated,listUserReceiveComplimentsController.handle)
router.get('/users/compliments/receive',ensureAuthenticated, listUserSendComplimentsController.handle)

router.get('/tags', ensureAuthenticated, listTagsController.handle)

export { router };
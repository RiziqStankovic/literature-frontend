const express = require('express');
const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares/validateAuth');
const { upload } = require('../middlewares/uploadFile');
const { cloudUpload } = require('../middlewares/cloudinaryUpload');

const { login, register, getUser } = require('../controllers/auth');

const { getUsers, updateUser } = require('../controllers/user');

const {
  getLiteratures,
  getLiterature,
  addLiterature,
  editLiterature,
  deleteLiterature,
} = require('../controllers/literature');

const {
  getBookmarks,
  addBookmark,
  removeBookmark,
} = require('../controllers/bookmark');

router.post('/login', login);
router.post('/register', register);
router.get('/validate', isAuth, getUser);

router.get('/users', isAuth, isAdmin, getUsers);
router.patch('/user/:id', isAuth, cloudUpload('photo'), updateUser);

router.get('/literatures?', isAuth, getLiteratures);
router.get('/literature/:id', isAuth, getLiterature);
router.post('/literature', isAuth, cloudUpload('file'), addLiterature);
router.patch('/literature/:id', isAuth, editLiterature);
router.delete('/literature/:id', isAuth, isAdmin, deleteLiterature);

router.get('/bookmarks/:id', isAuth, getBookmarks);
router.post('/bookmark/:literatureId', isAuth, addBookmark);
router.delete('/unbookmark/:literatureId', isAuth, removeBookmark);

module.exports = router;

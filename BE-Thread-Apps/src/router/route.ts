import * as express from 'express';
import ThreadsControllers from '../controllers/ThreadsControllers';
import UsersControllers from '../controllers/UsersControllers';
import AuthControllers from '../controllers/AuthControllers';
import jwtAuthentication from '../middlewares/jwtAuthentication';
import RepliesControllers from '../controllers/RepliesControllers';
import LikesControllers from '../controllers/LikesControllers';
import FollowingControllers from '../controllers/FollowingControllers';
import uploadFiles from '../middlewares/uploadFiles';

const Route = express.Router();

//threads
Route.get('/threads', jwtAuthentication.Auth, ThreadsControllers.getThreads);
Route.get('/threads/:id', jwtAuthentication.Auth, ThreadsControllers.getThreadsById);
Route.get('/threads/user/:id', jwtAuthentication.Auth, ThreadsControllers.getThreadsLogin);
Route.post('/threads', jwtAuthentication.Auth, uploadFiles.upload('image'), ThreadsControllers.insertThreads);
Route.put('/threads/:id', jwtAuthentication.Auth, uploadFiles.upload('image'), ThreadsControllers.updateThreads);
Route.delete('/threads/:id', jwtAuthentication.Auth, ThreadsControllers.deleteThreads);

//Auth
Route.post('/register', AuthControllers.register);
Route.post('/login', AuthControllers.login);
Route.get('/check', AuthControllers.check);

//Users
Route.get('/users', UsersControllers.getUser);
Route.get('/users/suggest', jwtAuthentication.Auth, UsersControllers.Suggest);
Route.get('/users/:id', jwtAuthentication.Auth, UsersControllers.getUserById);
Route.put('/users/:id', jwtAuthentication.Auth, uploadFiles.upload('photo_profile'), UsersControllers.updateUser);
Route.put('/users/bg/:id', jwtAuthentication.Auth, uploadFiles.upload('background_profile'), UsersControllers.updateBg);
Route.delete('/users/:id', jwtAuthentication.Auth, UsersControllers.deleteUser);

//Replies
Route.post('/replies', jwtAuthentication.Auth, uploadFiles.upload('image'), RepliesControllers.insertReplies);
Route.get('/replies', RepliesControllers.getReplies);
Route.get('/replies/:id', RepliesControllers.getRepliesById);
Route.get('/replies/threads/:id', jwtAuthentication.Auth, RepliesControllers.getReplyByThreads);
Route.put('/replies/:id', jwtAuthentication.Auth, uploadFiles.upload('image'), RepliesControllers.updateReplies);
Route.delete('/replies/:id', jwtAuthentication.Auth, RepliesControllers.deleteReplies);

//Likes
Route.post('/likes', jwtAuthentication.Auth, LikesControllers.insertLikes);
Route.get('/likes', jwtAuthentication.Auth, LikesControllers.getLikes);

//Followings
Route.get('/following', jwtAuthentication.Auth, FollowingControllers.getFollowing);
Route.get('/follower', jwtAuthentication.Auth, FollowingControllers.getFollower);
Route.post('/following/:id', jwtAuthentication.Auth, FollowingControllers.followings);

export default Route;

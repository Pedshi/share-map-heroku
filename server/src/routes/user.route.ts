import express, { NextFunction, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import { Error } from 'mongoose';
import { authMiddlewareParams, authenticateUserToken } from '../middlewares/auth.middleware';

const userRouter = express.Router();

enum UserPaths {
  signUp = '/signup',
  login = '/login',
  authenticateToken = '/auth',
  addPlaces = '/place',
  getPlaces = '/place'
}

// Sign up
const signUpCB = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const user = await UserController.createUser(req);
    const uiUser = {
      id: user.id,
      email: user.email,
      token: user.token
    };
    res.status(201).send(uiUser);
  }catch(error){ next(error); }
};

userRouter.post(UserPaths.signUp, signUpCB);

// Login
const loginCB = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  if( !email || !password)
    return next(new Error('Empty Fields'));
  try{
    const token = await UserController.login({email, password});
    res.cookie('_t', token, {httpOnly: true}).sendStatus(200);
  }catch(error){ next(error); }
};

userRouter.post(UserPaths.login, loginCB);

// Authenticate Token
const authenticateTokenCB = async (req: Request<authMiddlewareParams>, res: Response, next: NextFunction) => {
  if( req.params.user.email )
    return res.sendStatus(200);
  next( new Error('Not authorized') );
};

userRouter.post(UserPaths.authenticateToken, authenticateUserToken , authenticateTokenCB);

// Add Places
const addPlaces = async (req: Request<authMiddlewareParams>, res: Response, next: NextFunction) => {
  const { places: placeIDs } = req.body;
  if (!placeIDs)
    return next(new Error('Empty fields'));
  try{
    const user = await UserController.addPlaces(req.params.user.id, placeIDs);
    if(!user)
      return res.status(404).send('User does not exist');
    return res.sendStatus(200);
  }catch(error) { next(error) }
};

userRouter.put(UserPaths.addPlaces, authenticateUserToken, addPlaces);

// Get Places
const getPlacesCB = async (req: Request<authMiddlewareParams>, res: Response, next: NextFunction) => {
  try{
    const places = await UserController.getPlaces(req.params.user.id!);
    if(!places)
      return res.status(404).send('No places to show');
    return res.send(places);
  }catch(error) { throw error }
};

userRouter.get(UserPaths.getPlaces, authenticateUserToken, getPlacesCB);


export default userRouter
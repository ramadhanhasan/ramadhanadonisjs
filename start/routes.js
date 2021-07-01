'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'UserListController.home');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/logout', async ({ auth, response }) => {
  await auth.logout();
  return response.redirect('/');
});

Route.get('/post-a-user', 'UserListController.userIndex');

Route.get('/post-a-user/delete/:id', 'UserListController.delete');
Route.get('/post-a-user/edit/:id', 'UserListController.edit');
Route.post('/post-a-user/update/:id', 'UserListController.update').validator('PostUser');
Route.post('/post-a-user', 'UserListController.create').validator('PostUser');

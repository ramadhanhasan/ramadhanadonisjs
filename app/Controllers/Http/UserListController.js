'use strict'

const UserList = use('App/Models/UserList')

class UserListController {
  async home({view}) {

    const users = await UserList.all();

    return view.render('index', { users: users.toJSON() })
  }

  async userIndex({view, auth}) {

    const users = await auth.user.users().fetch();

    return view.render('users', { users: users.toJSON() })
  }

  async create({ request, response, session, auth}) {
    console.log(request);
    const user = request.all();
    const posted = await auth.user.users().create({
        first_name : user.fname,
        last_name: user.lname,
        email: user.email,
        user_name: user.username,
        division: user.division
    });

    session.flash({ message: 'User has been posted!' });
    return response.redirect('back');
  }

  async delete({ response, session, params}) {
      const user = await UserList.find(params.id);

      await user.delete();
      session.flash({ message: 'User has been removed'});
      return response.redirect('back');
  }

  async edit({ params, view }) {
      const user = await UserList.find(params.id);
      console.log(user);
      return view.render('edit', { user: user });
  }

  async update ({ response, request, session, params }) {
      const user = await UserList.find(params.id);

      user.first_name = request.all().first_name;
      user.last_name = request.all().last_name;
      user.email = request.all().email;
      user.user_name = request.all().user_name;
      user.division = request.all().division;

      await user.save();

      session.flash({ message: 'User has been updated. '});
      return response.redirect('/post-a-user');
  }
}

module.exports = UserListController

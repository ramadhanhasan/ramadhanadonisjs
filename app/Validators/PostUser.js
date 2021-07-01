'use strict'

class PostUser {
  get rules () {
    return {
      fname: 'required',
      lname: 'required',
      email: 'required',
      username: 'required',
      division: 'required'
    }
  }
  get messages() {
    return {
      'required': 'Hold up, the {{ field }} is required.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = PostUser

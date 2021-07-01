'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserListSchema extends Schema {
  up () {
    this.create('user_lists', (table) => {
      table.increments()
      table.string('first_name')
      table.string('last_name')
      table.string('user_name')
      table.string('email')
      table.string('division')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_lists')
  }
}

module.exports = UserListSchema

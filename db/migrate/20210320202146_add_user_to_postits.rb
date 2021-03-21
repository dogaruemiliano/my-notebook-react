class AddUserToPostits < ActiveRecord::Migration[6.0]
  def change
    add_reference :postits, :user, null: false, foreign_key: true
  end
end

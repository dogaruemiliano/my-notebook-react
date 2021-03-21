class AddColorToPostits < ActiveRecord::Migration[6.0]
  def change
    add_column :postits, :color, :string
  end
end

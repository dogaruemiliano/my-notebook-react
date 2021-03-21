class CreatePostits < ActiveRecord::Migration[6.0]
  def change
    create_table :postits do |t|
      t.text :description

      t.timestamps
    end
  end
end

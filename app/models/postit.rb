class Postit < ApplicationRecord
  # Active Record Associations
  belongs_to :user
  # Active Record Validations
  validates :user, presence: true
  validates :description, presence: true
  validates :color, presence: true
end

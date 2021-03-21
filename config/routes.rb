Rails.application.routes.draw do
  resources :postits
  devise_for :users
  root to: 'postits#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

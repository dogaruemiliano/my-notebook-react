class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  include Pundit

  # Applying Pundit's white-list approach
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  def user_not_authorized
    flash[:alert] = "You are not authorized Modafucka!"
    redirect_to(root_path)
  end

  private

  def skip_pundit?
    devise_controller? || params[:controller] =~ /(^(rails_)?admin)|(^pages$)/
  end
end

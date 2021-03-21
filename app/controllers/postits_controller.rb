class PostitsController < ApplicationController
  before_action :set_postit, only: [:edit, :update, :destroy]

  # Define a colors constant
  COLORS = ["#86A1DA", "#88D6BA", "#F23595", "#283139", "#FEE269"]

  def index
    @postit = Postit.new
    @postits = policy_scope(Postit)
  end

  def create
    # Create a new Postit using strong params
    @postit = Postit.new(postit_params)
    # Add a random color to the Postit
    @postit.color = COLORS.sample
    # Add current user to @postit
    @postit.user = current_user
    # Check if user authorized
    authorize @postit
    # Save and check if successful
    if @postit.save
      # If successful
      # Redirect to root_path
      redirect_to root_path
      # Flash with a nice message to confirm action success
      flash[:alert] = "Postit created Modafucka!"
    end
  end

  def edit
    # Set post using id from params (before_action :set_postit)
    # Check if user authorized
    authorize @postit
  end

  def update
    # Set post using id from params (before_action :set_postit)
    # Check if user authorized
    authorize @postit
    # Update and check if successful
    if @postit.update(postit_params)
      # If successful
      # Redirect to postits#index
      redirect_to root_path
      # Flash with a nice message to confirm action success
      flash[:alert] = "Postit updated Modafucka!"
    end
  end

  def destroy
    # Set post using id from params (before_action :set_postit)
    # Check if user authorized
    authorize @postit
    # Destroy and check if successful
    if @postit.destroy
      # If successful
      # Redirect to postits#index
      # redirect_to root_path
      # Flash with a nice message to confirm action success
      flash[:alert] = "Postit destroyed Modafucka!"
    end
  end

  private

  def postit_params
    # Permit only description to be used from params
    # !!! This might be a problem, not sure...
    # changed from this
    # params.require(:postit).permit(:description)
    # to this because I encountered a problem with the fetch from React edit function
    params.permit(:description)
  end

  def set_postit
    # Find Postit model using id from url params
    @postit = Postit.find(params[:id])
  end
end

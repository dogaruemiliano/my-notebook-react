class PostitPolicy < ApplicationPolicy
  def create?
    return true
  end

  def edit?
    return record.user == @user
  end

  def update?
    return record.user == @user
  end

  def destroy?
    return record.user == @user
  end

  class Scope < Scope
    def resolve
      scope.where(user: @user)
    end
  end
end

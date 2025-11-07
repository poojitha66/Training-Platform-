module Api
  class AuthController < ApplicationController
    include Authenticatable

    def register
      user = User.new(user_params)
      user.role ||= "customer"

      if user.save
        render json: { token: issue_token(user), user: user_payload(user) }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def login
      user = User.find_by(email: params.dig(:user, :email) || params[:email])

      if user&.authenticate(params.dig(:user, :password) || params[:password])
        render json: { token: issue_token(user), user: user_payload(user) }
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :role)
    end

    def user_payload(user)
      user.slice(:id, :name, :email, :role)
    end
  end
end

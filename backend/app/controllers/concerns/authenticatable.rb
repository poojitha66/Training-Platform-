module Authenticatable
  extend ActiveSupport::Concern

  included do
    attr_reader :current_user
  end

  private

  def authenticate_request!
    token = bearer_token
    return unauthorized! if token.blank?

    payload = decode_token(token)
    @current_user = User.find_by(id: payload["user_id"])
    unauthorized! unless @current_user
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound, KeyError
    unauthorized!
  end

  def authorize_admin!
    return if current_user&.admin?

    render json: { error: "Forbidden" }, status: :forbidden
  end

  def issue_token(user)
    JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, jwt_secret, "HS256")
  end

  def decode_token(token)
    JWT.decode(token, jwt_secret, true, { algorithm: "HS256" }).first
  end

  def bearer_token
    header = request.headers["Authorization"].to_s
    header.split(" ").last if header.start_with?("Bearer ")
  end

  def jwt_secret
    ENV["JWT_SECRET"] || Rails.application.credentials.dig(:jwt_secret) || raise(KeyError, "Missing JWT secret")
  end

  def unauthorized!
    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end

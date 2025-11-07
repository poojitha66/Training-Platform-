module Api
  class BaseController < ApplicationController
    include Authenticatable

    before_action :authenticate_request!
  end
end

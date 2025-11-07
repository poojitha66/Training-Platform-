Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    scope :auth do
      post :register, to: "auth#register"
      post :login, to: "auth#login"
    end

    resources :products, except: %i[new edit]
    resources :orders, only: %i[index show create update]

    post :checkout, to: "checkout#create"
  end
end

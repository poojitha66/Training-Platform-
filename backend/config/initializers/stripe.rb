stripe_secret = ENV["STRIPE_SECRET_KEY"] || Rails.application.credentials.dig(:stripe, :secret_key)
Stripe.api_key = stripe_secret if stripe_secret.present?

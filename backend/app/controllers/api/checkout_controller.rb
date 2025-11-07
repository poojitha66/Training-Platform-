module Api
  class CheckoutController < BaseController
    def create
      line_items = stripe_line_items
      success_url = params[:success_url] || default_success_url
      cancel_url = params[:cancel_url] || default_cancel_url

      session = Stripe::Checkout::Session.create(
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: current_user.email,
        line_items: line_items,
        success_url: success_url,
        cancel_url: cancel_url,
        metadata: checkout_metadata
      )

      render json: { session_id: session.id }
    rescue Stripe::StripeError => e
      render json: { error: e.message }, status: :unprocessable_entity
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: e.message }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    private

    def stripe_line_items
      items = Array(params[:line_items])
      raise StandardError, "line_items is required" if items.empty?

      items.map do |item|
        product = Product.find(item[:product_id] || item["product_id"])
        quantity = (item[:quantity] || item["quantity"]).to_i
        raise StandardError, "Quantity must be positive" if quantity <= 0

        {
          price_data: {
            currency: params[:currency] || "usd",
            product_data: {
              name: product.name,
              description: product.description
            },
            unit_amount: (product.price.to_f * 100).to_i
          },
          quantity: quantity
        }
      end
    end

    def checkout_metadata
      (params[:metadata] || {}).merge(user_id: current_user.id)
    end

    def default_success_url
      params[:origin].presence || ENV.fetch("CHECKOUT_SUCCESS_URL", "http://localhost:3000/success")
    end

    def default_cancel_url
      params[:origin].presence || ENV.fetch("CHECKOUT_CANCEL_URL", "http://localhost:3000/cancel")
    end
  end
end

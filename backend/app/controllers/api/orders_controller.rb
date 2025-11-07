module Api
  class OrdersController < BaseController
    before_action :set_order, only: %i[show update]
    before_action :authorize_admin!, only: :update

    def index
      orders = if current_user.admin?
                 Order.includes(:user).order(created_at: :desc)
               else
                 current_user.orders.order(created_at: :desc)
               end
      render json: orders.as_json(include: { user: { only: %i[id name email role] } })
    end

    def show
      unless owns_order? || current_user.admin?
        return render json: { error: "Forbidden" }, status: :forbidden
      end

      render json: @order.as_json(include: { user: { only: %i[id name email role] } })
    end

    def create
      order = current_user.orders.build(shipping_address: order_params[:shipping_address])
      order.metadata = order_params[:metadata] if order_params.key?(:metadata)

      line_items = Array(order_params[:line_items])
      if line_items.empty?
        return render json: { error: "At least one line item is required" }, status: :unprocessable_entity
      end

      Order.transaction do
        line_items.each do |item|
          product = Product.find(item[:product_id] || item["product_id"])
          quantity = item[:quantity] || item["quantity"]
          quantity = quantity.to_i

          if quantity <= 0
            raise StandardError, "Quantity must be positive"
          end

          if product.stock < quantity
            raise StandardError, "#{product.name} does not have enough stock"
          end

          order.add_line_item(product: product, quantity: quantity)
          product.update!(stock: product.stock - quantity)
        end

        order.status = "processing"
        order.save!
      end

      render json: order, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Product not found" }, status: :not_found
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end

    def update
      if @order.update(update_params)
        render json: @order
      else
        render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_order
      @order = Order.find(params[:id])
    end

    def owns_order?
      @order.user_id == current_user.id
    end

    def order_params
      params.require(:order).permit(:shipping_address, metadata: {}, line_items: %i[product_id quantity])
    end

    def update_params
      params.require(:order).permit(:status, :payment_status, metadata: {})
    end
  end
end

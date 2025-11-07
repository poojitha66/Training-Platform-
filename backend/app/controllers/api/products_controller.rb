module Api
  class ProductsController < BaseController
    skip_before_action :authenticate_request!, only: %i[index show]
    before_action :set_product, only: %i[show update destroy]
    before_action :authorize_admin!, only: %i[create update destroy]

    def index
      products = Product.order(:name)
      render json: products
    end

    def show
      render json: @product
    end

    def create
      product = Product.new(product_params)

      if product.save
        render json: product, status: :created
      else
        render json: { errors: product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @product.update(product_params)
        render json: @product
      else
        render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @product.destroy
      head :no_content
    end

    private

    def set_product
      @product = Product.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:name, :description, :price, :stock)
    end
  end
end

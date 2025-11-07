class Order < ApplicationRecord
  belongs_to :user

  STATUSES = %w[pending processing fulfilled cancelled].freeze
  PAYMENT_STATUSES = %w[unpaid paid refunded failed].freeze

  validates :status, inclusion: { in: STATUSES }
  validates :payment_status, inclusion: { in: PAYMENT_STATUSES }
  validates :total_amount, numericality: { greater_than_or_equal_to: 0 }

  def add_line_item(product:, quantity:)
    raise ArgumentError, "Quantity must be positive" if quantity.to_i <= 0

    new_item = {
      product_id: product.id,
      name: product.name,
      unit_price: product.price.to_f,
      quantity: quantity.to_i,
      subtotal: (product.price.to_f * quantity.to_i).round(2)
    }

    self.line_items = (line_items || []) + [new_item]
    self.total_amount = line_items.sum { |item| item.with_indifferent_access[:subtotal].to_f }
  end
end

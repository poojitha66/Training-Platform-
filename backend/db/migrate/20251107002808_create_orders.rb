class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.string :status, null: false, default: "pending"
      t.decimal :total_amount, precision: 10, scale: 2, null: false, default: 0
      t.text :shipping_address
      t.string :payment_status, null: false, default: "unpaid"
      t.jsonb :line_items, null: false, default: []
      t.jsonb :metadata, null: false, default: {}

      t.timestamps
    end

    add_index :orders, :status
    add_index :orders, :payment_status
  end
end

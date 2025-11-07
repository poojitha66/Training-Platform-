class User < ApplicationRecord
  has_secure_password

  has_many :orders, dependent: :destroy

  enum role: {
    customer: "customer",
    admin: "admin"
  }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role, inclusion: { in: roles.keys }
end

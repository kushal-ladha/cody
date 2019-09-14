# typed: true
class AddEncryptedAccessKeyToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :encrypted_access_key, :string
    add_column :users, :encrypted_access_key_iv, :string
  end
end

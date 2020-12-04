# typed: strict
class ApiKey < ApplicationRecord
  sig { returns(T.nilable(::String)) }
  def password; end

  sig { params(value: T.nilable(::String)).returns(T.nilable(::String)) }
  def password=(value); end
end

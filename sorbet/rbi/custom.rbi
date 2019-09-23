# typed: strong
class ApiKey
  sig { params(password: T.nilable(String)).returns(T::Boolean) }
  def authenticate(password); end
end

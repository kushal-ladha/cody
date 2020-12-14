# typed: true
# frozen_string_literal: true

class RepositoryPolicy < ApplicationPolicy
  class Scope < ::ApplicationPolicy::Scope
    def resolve
      Repository.all
    end
  end
end

# typed: true
# frozen_string_literal: true

class ReviewRuleAlways < ReviewRule
  def matches?(*)
    self.match_context = "  - This rule is always triggered"
  end
end

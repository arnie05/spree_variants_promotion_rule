Spree::Core::Engine.routes.draw do
  get '/admin/search/variants', to: "admin/search#variants", as: :promotion_rule_variants
end

object false
node(:count) { @variants.count }
node(:total_count) { @variants.total_count }
node(:current_page) { params[:page] ? params[:page].to_i : 1 }
node(:per_page) { params[:per_page] || Kaminari.config.default_per_page }
node(:pages) { @variants.num_pages }
child(@variants => :variants) do
  attributes :id, :name, :options_text
end

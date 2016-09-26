Spree::Admin::SearchController.class_eval do  
  def variants
    if params[:ids]
      @variants = Spree::Variant.where(id: params[:ids].split(",").flatten)
    else
      @variants = Spree::Variant.ransack(params[:q]).result
    end
      @variants = @variants.distinct.page(params[:page]).per(params[:per_page])
      expires_in 15.minutes, public: true
      headers['Surrogate-Control'] = "max-age=#{15.minutes}"
  end
end

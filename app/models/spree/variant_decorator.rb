Spree::Variant.class_eval do
  def name_and_options_text
    if self.options_text.blank?
      "#{name}"      
    else
      "#{name} ( #{options_text.downcase} )".strip
    end
  end
end
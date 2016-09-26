$.fn.PromotionRuleVariantAutocomplete = function (options) {
  'use strict';

  // Default options
  options = options || {};
  var multiple = typeof(options.multiple) !== 'undefined' ? options.multiple : true;

  function formatVariant(variant) {
    if (!!variant.options_text) {
      return Select2.util.escapeMarkup(variant.name + " (" + variant.options_text + ")");
    } else {
      return Select2.util.escapeMarkup(variant.name);
    }
  }

  this.select2({
    minimumInputLength: 3,
    multiple: multiple,
    initSelection: function (element, callback) {
      $.get(Spree.routes.promotion_rule_variants, {
        ids: element.val().split(','),
        token: Spree.api_key
      }, function (data) {
        callback(multiple ? data.variants : data.variants[0]);
      });
    },
    ajax: {
      //url: Spree.routes.toto_variants,
      url: Spree.routes.variants_api,
      datatype: 'json',
      data: function (term, page) {
        return {
          q: {
            product_name_or_sku_cont: term,
          },
          m: 'OR',
          token: Spree.api_key
        };
      },
      results: function (data, page) {
        var variants = data.variants ? data.variants : [];
        return {
          results: variants
        };
      }
    },
    formatResult: formatVariant,
    formatSelection: formatVariant
  });
};

$(document).ready(function () {
  Spree.routes.promotion_rule_variants = Spree.pathFor('admin/search/variants')
  $('.promotion_rule_variant_picker').PromotionRuleVariantAutocomplete();
});

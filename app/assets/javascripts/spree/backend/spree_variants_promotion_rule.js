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
    //minimumInputLength: 3,
    multiple: multiple,
    closeOnSelect: false,
    maximumSelectionSize: 0,
    initSelection: function (element, callback) {
      $.get(Spree.routes.promotion_rule_variants, {
        ids: element.val().split(','),
        token: Spree.api_key
      }, function (data) {
        callback(multiple ? data.variants : data.variants[0]);
      });
    },
 

    // From : http://select2.github.io/select2/


    // ajax: {
    //     url: "https://api.github.com/search/repositories",
    //     dataType: 'json',
    //     quietMillis: 250,
    //     data: function (term, page) { // page is the one-based page number tracked by Select2
    //         return {
    //             q: term, //search term
    //             page: page // page number
    //         };
    //     },
    //     results: function (data, page) {
    //         var more = (page * 30) < data.total_count; // whether or not there are more results available
 
    //         // notice we return the value of more so Select2 knows if more results can be loaded
    //         return { results: data.items, more: more };
    //     }
    // },
    // formatResult: repoFormatResult, // omitted for brevity, see the source of this page
    // formatSelection: repoFormatSelection, // omitted for brevity, see the source of this page
    // dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
    // escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results




    ajax: {
      //url: Spree.routes.toto_variants,
      url: Spree.routes.variants_api,
      datatype: 'json',
      quietMillis: 250,
      data: function (term, page) {
        return {
          q: {
            product_name_or_sku_cont: term,
          },
          m: 'OR',
          token: Spree.api_key,
          page: page // page number
        };
      },
      results: function (data, page) {
        var more = (page * 30) < data.total_count; // whether or not there are more results available
        var variants = data.variants ? data.variants : [];
        return {
          results: variants, more: more
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

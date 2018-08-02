<template>
<div class="product-card">
  <a v-bind:href="'/products/' + product.handle">
  <img v-bind:src="product.featured_image" />
  <h3>{{ product.title }}</h3>
  <p>{{product.price | formatMoney}}</p>
  </a>
  <button v-on:click="addToCart(product.variants[0].id)">{{ addToCartText }}</button>
</div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  data() {
    return {
      addToCartText: 'Add To Cart',
    };
  },
  methods: {
    postAddToCart() {
      this.addToCartText = 'Added to Cart';
      const self = this;
      setTimeout(function() {
        self.addToCartText = 'Add To Cart';
      }, 1000);
    },
    addToCart(id) {
      const self = this;
      $.ajax({
        url: '/cart/add.js',
        data: {
          id,
          quantity: 1
        },
        method: 'POST',
        dataType: 'json',
        success: (response) => { 
          console.log(response);
          self.postAddToCart();
        },
        error: (response) => {
          console.error(response);
        }
      })
    }
  },
  filters: {
    formatMoney: function(cents) {
      const format = theme.moneyFormat || "${{amount}}";
      if (typeof cents === 'string') {
        cents = cents.replace('.', '');
      }
      let value = '';
      const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      const formatString = (format || moneyFormat);
      function formatWithDelimiters(number, precision, thousands, decimal) {
        thousands = thousands || ',';
        decimal = decimal || '.';

        if (isNaN(number) || number == null) {
          return 0;
        }
        number = (number / 100.0).toFixed(precision);
        const parts = number.split('.');
        const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
        const centsAmount = parts[1] ? (decimal + parts[1]) : '';
        return dollarsAmount + centsAmount;
      }
      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
        case 'amount_no_decimals_with_space_separator':
          value = formatWithDelimiters(cents, 0, ' ');
          break;
      }
      return formatString.replace(placeholderRegex, value);
    }
  }
}
</script>
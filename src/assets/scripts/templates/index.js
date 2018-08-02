import '../sections/product';
import $ from 'jquery';
import sections from '@shopify/theme-sections';
import '../mealplanner/product-card.vue';

$(document).ready(() => {
  sections.load([
    'product',
  ]);
});

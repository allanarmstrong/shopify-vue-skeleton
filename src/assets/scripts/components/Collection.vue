<template>
  <div>
    <h1>{{greetings}}</h1>
    <div class="grid">
      <div class="grid__item one-whole medium--one-quarter" 
      v-for="(product, index) in products" 
      v-bind:key="index">
        <ProductCard v-bind:product="product"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
export default {
  data () {
    return {
      greetings: "Hello, World",
      products: theme.collection.products
    }
  },
  components: {ProductCard}
}
</script>

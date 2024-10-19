<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { _ } from 'lodash'

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: number;
}

const summ = ref(0)
const count = ref(0)
const currentCategory = ref<number | null>(null)
const categories: Category[] = [
  { id: 1, name: 'Чехол' },
  { id: 2, name: 'Наушники' },
  { id: 3, name: 'Смартфоны' },
]
const currentProduct = ref<Product | null>(null)
const products = ref<Product[]>([
  { id: 1, name: 'Чехол на Samsung', price: 200, category: 1 },
  { id: 2, name: 'Чехол на Vivo', price: 200, category: 1 },
  { id: 3, name: 'Наушники TFN Saibot ZX-6 blue', price: 10000, category: 2 },
  { id: 4, name: 'Наушники Audio-Technica ATH-M40x', price: 14100, category: 2 },
  { id: 5, name: 'Samsung Galaxy A13', price: 30000, category: 3 },
  { id: 6, name: 'Google Pixel 3 3XL', price: 60400, category: 3 },
])
const fistProductList = _.cloneDeep(products)

function updateSumm() {
  if (currentProduct.value && count.value)
    summ.value += currentProduct.value.price * count.value;
}

watch(currentCategory, (category) => {
  if (category)
    products.value = fistProductList.value?.filter((p) => p.category === category);
})

watchEffect(() => {
  if (currentProduct.value || currentCategory.value)
    count.value = 0;
})
</script>

<template>
  <div class="container">
    <h1>Магазин</h1>
    <select
      v-model="currentCategory"
      class="select"
    >
      <option
        v-for="c in categories"
        :key="c.id"
        :value="c.id"
      >
        {{ c.name }}
      </option>
    </select>
    <select
      v-model="currentProduct"
      class="select"
    >
      <option
        v-for="p in products"
        :key="p.id"
        :value="p"
      >
        {{ p.name }}
      </option>
    </select>
    <input
      v-model="count"
      type="number"
      min="1"
      max="100"
      class="count"
    />
    <div class="summ">
      <span>Итого:</span>
      <span>{{ summ }} руб.</span>
    </div>
    <button @click="updateSumm">Добавить</button>
  </div>
</template>

<style scoped>
.container {
  background-color: beige;
  padding: 20px;
  width: 500px;
  display: flex;
  border-radius: 10px;
  gap: 20px;
  flex-direction: column;
}

.select {
  height: 40px;
  font-size: 16px;
}

.count {
  height: 40px;
  font-size: 16px;
  width: 50%; 
}

button {
  height: 40px;
  font-size: 16px;
  width: fit-content;
  background-color: chocolate;
  cursor: pointer;
}

.summ {
  gap: 10px;
  display: flex;
}

h1 {
  display: flex;
  align-self: center;
}
</style>

<template>
  <div class="card-tatica">
    <h2>{{ titulo }}</h2>
    <p>{{ descricao }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardTatica',
  props: {
    titulo: String,
    descricao: String
  }
}
</script>

<style scoped>
.card-tatica {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  max-width: 300px;
  background-color: #f9f9f9;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.card-tatica:hover {
  transform: scale(1.05);
}

.card-tatica h2 {
  margin: 10px 0 5px;
  font-size: 1.2em;
}

.card-tatica p {
  font-size: 0.95em;
  color: #555;
}
</style>
<template>
  <div class="display">
    {{ value }}
  </div>
</template>

<script>
export default {
  props: ['value']

  // professor usou assim, eu não entendi e funcionou tb da maneira abaixo
  // props: {
  //   value: {}
  // }
}
</script>

<style>
.display {
  grid-column: span 4;
  background-color: #0004;
  
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  font-size: 2.1em;
  overflow: hidden;
}
</style>

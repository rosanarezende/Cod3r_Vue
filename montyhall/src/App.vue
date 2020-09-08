<template>
  <div id="app">
    <h1>Problema de Monty Hall</h1>
    <div class="form">

      <!-- Aparece se não tiver startado
      v-model - two way data binding
      v-model.number - significa que quero salvar como um valor numérico
      -->
      <div v-if="!started">
        <label for="portsAmount">Quantas portas? </label>
        <input type="text" id="portsAmount" size="3"
          v-model.number="portsAmount"
        >
      </div>
      <div v-if="!started">
        <label for="giftedPort">Qual a porta premiada? </label>
        <input type="text" id="giftedPort" size="3"
          v-model.number="giftedPort"
        >
      </div>
      <button v-if="!started" @click="started = true">Iniciar</button>

      <!-- Quando estiver startado -->
      <button v-if="started" @click="started = false">Reiniciar</button>
    </div>

    <div class="doors" v-if="started">
      <div v-for="i in portsAmount" :key="i">
        <Door 
          :number="i" 
          :hasGift="i === giftedPort"

          @portSelected="portSelected" 
          :selected="selectedPort == i"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Door from './components/Door';

export default {
  name: 'App', // isso pode ajuda na hora de depurar - saber de onde vem o erro
  components: { Door },
  data: function(){
    return {
      started: false,
      portsAmount: 3,
      selectedDoor: null,
      giftedPort: null,
    }
  },
  methods: {
    portSelected(selectedPort) {
      this.selectedPort = selectedPort
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  color: #fff;
  background: linear-gradient(to right, #8ebb96, #8d5583);
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app h1 {
  border: 1px solid #5a5a5a;
  background-color: #5a5a5a40;
  padding: 20px;
  margin-bottom: 60px;
  border-radius: 10px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
}

.form button {
  background-color: #483d8b;
  color: #fff;
  padding: 10px 20px;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  outline: 0;

  transition-duration: 0.4s;
}

.form button:hover{
  box-shadow: 0 12px 16px 0 #2e275a4d, 0 17px 50px 0 #2e275a2a;
}

.form,
.form input,
.form button {
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.doors {
  /* pra tirar o alinhamento que ele tava, centralizado */
  align-self: stretch; /*estico */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>

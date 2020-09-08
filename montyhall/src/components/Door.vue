<template>
  <div class="door-area">

    <div class="door-frame" :class="{ selected: selected && !open }">
      <!-- ao invés de colocar stop na maçaneta poderia colocar aqui
      selected: selected && !open -->
      
      <Gift v-if="open && hasGift"/>

    </div>

    <div 
      class="door" 
      @click="selected = !selected"
      :class="{ open }"
    >

      <div 
        class="number" 
        :class="{ selected }"
      >
        {{ number }}
      </div>

      <div 
        class="knob" 
        :class="{ selected }"
        @click="open = true" 
      ></div>
      <!-- Poderia usar @click.stop pra não clicar/selecionar 
      na porta quando clica na maçaneta -->

    </div>

  </div>
</template>

<script>
import Gift from './Gift';

export default {
  name: 'Door',
  components: { Gift },
  props: {
    number: {},
    hasGift: { type: Boolean }
  }, 
  data: function(){
    return {
      open: false,
      selected: false
    }
  }
};
</script>

<style>
:root {
  --door-border: 5px solid #5a3654;
  --selected-border: 5px solid #ffffe0;
}

.door-area {
  position: relative;
  width: 200px;
  height: 310px;
  border-bottom: 10px solid #a9a9a9;
  margin-bottom: 20px;
  font-size: 3rem;

  /* centralizar porta e frame */
  display: flex;
  justify-content: center;
}

.door-frame {
  position: absolute;
  height: 300px;
  width: 180px;
  border-left: var(--door-border);
  border-top: var(--door-border);
  border-right: var(--door-border);
  
  /* Para o presente aparecer no chão da porta */
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.door {
  position: absolute;
  top: 4.9px;
  height: 295px;
  width: 170.5px;
  background-color: #993399;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.door .knob {
  height: 22px;
  width: 22px;
  border-radius: 15px;
  background-color: #5a3654;
  box-shadow: 0px 2px 2px #5e135250;

  /* tava no meio, voltei pro início */
  align-self: flex-start;
  margin-top: 60px;
}

/* Selected */

.door-frame.selected {
  border-left: var(--selected-border);
  border-top: var(--selected-border);
  border-right: var(--selected-border);
}

.door > .number.selected {
  color: #adff2f;
}

.door > .knob.selected {
  background-color: #ffffe0;
}

/* Open */

.door.open {
  background-color: #6c4966; 
}

.door.open .knob {
  display: none;
}

.door.open .number {
  display: none;
}
</style>

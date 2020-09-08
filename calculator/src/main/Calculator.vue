<template>
  <div class="calculator">
    <Display :value="displayValue" />
    <Button label="AC" triple @onClick="clearMemory" />
    <Button label="/" operation @onClick="setOperation" />
    <Button label="7" @onClick="addDigit" />
    <Button label="8" @onClick="addDigit" />
    <Button label="9" @onClick="addDigit" />
    <Button label="*" operation @onClick="setOperation" />
    <Button label="4" @onClick="addDigit" />
    <Button label="5" @onClick="addDigit" />
    <Button label="6" @onClick="addDigit" />
    <Button label="-" operation @onClick="setOperation" />
    <Button label="1" @onClick="addDigit" />
    <Button label="2" @onClick="addDigit" />
    <Button label="3" @onClick="addDigit" />
    <Button label="+" operation @onClick="setOperation" />
    <Button label="0" double @onClick="addDigit"/>
    <Button label="." @onClick="addDigit" />
    <Button label="=" operation @onClick="setOperation" />
  </div>
</template>

<script>
import Button from '../components/Button'
import Display from '../components/Display'

export default {
  data: function() {
    return {
      displayValue: "0",
      clearDisplay: false,
      operation: null,
      values: [0, 0], // primeiro valor digitado ele passa pro segundo -- resultado é a operação entre eles
      current: 0 // quando o índice do valor está sendo usado no momento
    }
  },
  components: { Button, Display },
  methods: {
    clearMemory() {
      // vou limpar pra voltar pro estado inicial - atribuir ao data o estado inicial
      Object.assign(this.$data, this.$options.data())
            /* o "this.$data" vai pegar o estado corrente/atual, 
            e o "this.$options.data()) " vai fazer a aplicação executar "data" novamente,
            quando data é executada ela retorna o estado inicial, isto é, 
            a calculadora zerada. */
    },

    addDigit(n) {
      if(n === "." && this.displayValue.includes(".")) {
        return
      }

      // Da primeira forma se digito . e depois n fica .n --- da segunda 0.n
      // const clearDisplay = this.displayValue === "0" || this.clearDisplay // setada como true
      const clearDisplay = (this.displayValue === "0" && n !== ".") || this.clearDisplay
      const currentValue = clearDisplay ? "" : this.displayValue
      const displayValue = currentValue + n
      this.displayValue = displayValue

      this.clearDisplay = false

      const i = this.current // se é o valor de índice 0 ou 1

      // const newValue = parseFloat(displayValue) // converti a string pra float
            /* Como vamos trabalhar com eval nas operações nem precisaria,
            pq ele já iria interpretar da forma certa 
            mas se for substituir o eval por switch, por exemplo, tem q ser float */
      // this.values[i] = newValue

      this.values[i] = displayValue
    },

    setOperation(operation) {
      // quando o usuário está mexendo no primeiro número
      if(this.current === 0) {
        this.operation = operation

        this.current = 1 // passa pro segundo número

        this.clearDisplay = true // próximo dígito já limpa o display
      } 

      // quando está mexendo no segungo (após informar a operação)
      else { 
        const currentOperation = this.operation

        // Faço a operação e jogo na posição 0
        try {
          this.values[0] = eval(`${this.values[0]} ${currentOperation} ${this.values[1]}`)
              /* a função eval recebe uma string e irá validar essa expressão, 
              verificando se ela é código JS ou não. Se for, é executada. 
              Senão, não é executada :) */

        } catch (e) {
          // esse evento pode ser tratado lá no App, por exemplo, colocando um toast na tela
          this.$emit('onError', e)
        }

        // Coloco no display aquele resultado da posição 0
        this.displayValue = this.values[0]

        // Zero a posição 1, pra ficar pronto pra outra operação
        this.values[1] = 0

        const equals = operation === "="

        // se pressiona = a operação é nula (ele finalizou o resultado),
        // mas qq outro eu atribuo
        this.operation = equals ? null : operation

        // se pressiona = o current é o 0
        // qq outro o currente é o 1 (continua operando)
        this.current = equals ? 0 : 1

        // se não for =, limpe o display 
        this.clearDisplay = !equals
      }
    },
  }
}
</script>

<style>
.calculator {
  height: 320px;
  width: 235px;
  border-radius: 5px;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 1fr 48px 48px 48px 48px;
}
</style>

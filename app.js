// app.js
angular.module('slotApp', [])
  .controller('SlotCtrl', ['$timeout', function($timeout) {
    const vm = this;

    // Lista de símbolos
    vm.symbols = [
      'bar.jpg',
      'cereza.jpg',
      'palanca.jpg',
      'limon.jpg',
      'campana.jpg',
      'siete.jpg'
    ];

    // Función para obtener símbolo aleatorio
    vm.randomSymbol = function() {
      const i = Math.floor(Math.random() * vm.symbols.length);
      return vm.symbols[i];
    };

    // Estado inicial: 3 símbolos aleatorios
    vm.reels = [
      vm.randomSymbol(),
      vm.randomSymbol(),
      vm.randomSymbol()
    ];

    vm.spinning = false;
    vm.resultText = '';
    vm.resultClass = '';
    vm.stats = { win: 0, almost: 0, lose: 0 };

    // Evaluación del resultado después del giro
    vm.evaluate = function() {
      const [a, b, c] = vm.reels;

      if (a === b && b === c) {
        vm.resultText = 'GANASTE';
        vm.resultClass = 'result-win';
        vm.stats.win++;
      } else if (a === b || a === c || b === c) {
        vm.resultText = 'CASI';
        vm.resultClass = 'result-almost';
        vm.stats.almost++;
      } else {
        vm.resultText = 'PERDISTE';
        vm.resultClass = 'result-lose';
        vm.stats.lose++;
      }
    };

    // Animación del giro
    vm.spin = function() {
      if (vm.spinning) return;

      vm.spinning = true;
      vm.resultText = '';
      vm.resultClass = '';

      let steps = 15;
      let interval = 80;

      function spinStep() {
        vm.reels = [
          vm.randomSymbol(),
          vm.randomSymbol(),
          vm.randomSymbol()
        ];
        steps--;

        if (steps > 0) {
          $timeout(spinStep, interval);
        } else {
          vm.reels = [
            vm.randomSymbol(),
            vm.randomSymbol(),
            vm.randomSymbol()
          ];
          vm.evaluate();
          vm.spinning = false;
        }
      }

      spinStep();
    };
  }]);

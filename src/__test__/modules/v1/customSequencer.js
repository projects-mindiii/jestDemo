const Sequencer = require('@jest/test-sequencer').default;
const path      = require('path');

class CustomSequencer extends Sequencer {
   /**
   * Sort test to determine order of execution
   * Sorting is applied after sharding
   * In order to execute test in non-parallel manner use CLI flag(--runInBand).
   */
  sort(tests) {

        const orderPath = [
                           path.join(__dirname, 'product/product.test.js'),
                           path.join(__dirname, 'user/user.test.js'),
                           path.join(__dirname, 'auth/auth.test.js')
                          ];

        console.log('Inside customSequencer');
        console.log(orderPath);
        return tests.sort((testA, testB) => {
            const indexA = orderPath.indexOf(testA.path);
            const indexB = orderPath.indexOf(testB.path);
            if (indexA === indexB) return 0; // do not swap when tests both not specify in order.
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            console.log(indexA < indexB ? -1 : 1);
        return indexA < indexB ? -1 : 1;
        })
  }
}

module.exports = CustomSequencer;
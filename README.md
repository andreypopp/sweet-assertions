# sweet-assertions

Syntax for writing informative testing assertions.

Install:

    % npm install --global sweet.js
    % npm install sweet-bdd sweet-assertions

Use:

    sjs -m sweet-bdd -m sweet-assertions tests.sjs

where `tests.sjs` looks like this:

    var assert = require('assert');

    describe "sweet-assertions" {

      function no() { throw new Error('x'); }
      function yes() { }

      it "works" {

        1 + 2 should be == 2 + 1
        2 should be != 1

        2 should be > 1
        2 should be >= 1
        1 should be < 2
        1 should be <= 2

        {x: 1} should have x

        true should be true
        false should be false

        true should be truthy
        null should be falsy

        no() should throw
        yes() should not throw

        "aabbcc" should contain "bb"
      }
    }

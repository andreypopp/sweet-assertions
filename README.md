# sweet-assertions

Syntax for writing informative testing assertions.

This is a set of macros for [Sweet.js][1] which extends JavaScript grammar with
syntax for writing informative testing assertions. It tries to generate
assertion messages which contain useful information, like `1 should be == 2`
would generate `1 should be equal to 2` error message and so on.

I suggest using it with [sweet-bdd][2] for better `describe`, `it` syntax:

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

        1 + 2 should == 2 + 1
        2 should != 1

        2 should > 1
        2 should >= 1
        1 should < 2
        1 should <= 2

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

[1]: http://sweetjs.org/
[2]: https://github.com/Havvy/sweet-bdd

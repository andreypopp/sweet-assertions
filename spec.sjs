var assert = require('assert');

describe "sweet-assertions" {

  function no() { throw new Error('x'); }
  function yes() { }

  it "works" {

    1 + 2 should == 2 + 1
    1 + 2 should == 2 + 1
    2 should != 1

    2 should > 1
    2 should >= 1
    1 should < 2
    1 should <= 2

    {x: 1} should have x

    true should be truthy
    null should be falsy

    no() should throw
    yes() should not throw

    "aabbcc" should contain "bb"

    true should be true
    false should be false
    null should be null

    var x = 12

    x should == 12

    var z = {y: 60};

    z should have y

  }
}

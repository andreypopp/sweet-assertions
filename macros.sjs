let describe = macro {
 	rule { $name { $body... } } => {
 		describe($name, function() {

 		  $body...
 		} );
 	}
}

let it = macro {
  rule { $name { $body... } } => {
    it($name, function() {
      $body...
    });
  }
}

macro fmt {
  case { _ ( $val:expr ) } => {
		function fmt(v) {
		  return v.map(function(x){
		    return x.token.inner ?
		      x.token.value[0] + fmt(x.token.inner) + x.token.value[1] :
		      x.token.value;
		  }).join('');
		}
		return [makeValue('`' + fmt(#{$val}) + '`', #{here})];
  }
}

macro should {
	rule infix { $lhs:expr | be === $rhs:expr } => {
    assert.deepEqual(
      $lhs, $rhs,
      fmt($lhs) + " should be equal to " + fmt($rhs))
	}

	rule infix { $lhs:expr | be !== $rhs:expr } => {
    assert.notDeepEqual(
      $lhs, $rhs,
      fmt($lhs) + " should not be equal to " + fmt($rhs))
	}

	rule infix { $lhs:expr | be > $rhs:expr } => {
    assert.ok(
      $lhs > $rhs,
      fmt($lhs) + " should be greater than " + fmt($rhs))
	}
	rule infix { $lhs:expr | be >= $rhs:expr } => {
    assert.ok(
      $lhs >= $rhs,
      fmt($lhs) + " should be greater or equal than " + fmt($rhs))
	}
	rule infix { $lhs:expr | be < $rhs:expr } => {
    assert.ok(
      $lhs < $rhs,
      fmt($lhs) + " should be less than " + fmt($rhs))
	}
	rule infix { $lhs:expr | be <= $rhs:expr } => {
    assert.ok(
      $lhs <= $rhs,
      fmt($lhs) + " should be less or equal than " + fmt($rhs))
	}

	rule infix { $lhs:expr | have $rhs:expr } => {
    assert.ok(
      typeof $lhs.$rhs !== 'undefined',
      fmt($lhs) + " should have " + fmt($rhs) + " property")
	}

	rule infix { $lhs:expr | be true } => {
    assert.ok(
      $lhs === true,
      fmt($lhs) + " should be true")
	}
	rule infix { $lhs:expr | be false } => {
    assert.ok(
      $lhs === false,
      fmt($lhs) + " should be false")
	}
	rule infix { $lhs:expr | be truthy } => {
    assert.ok(
      $lhs,
      fmt($lhs) + " should be truthy")
	}
	rule infix { $lhs:expr | be falsy } => {
    assert.ok(
      !$lhs,
      fmt($lhs) + " should be falsy")
	}

	rule infix { $lhs:expr | contain $rhs } => {
	  assert.ok(
	    $lhs.indexOf($rhs) > -1,
	    fmt($lhs) + " should contain " + fmt($rhs))
	}

	rule infix { $lhs:expr | throw } => {
	  assert.throws(
      function() { $lhs },
      Error,
	    fmt($lhs) + " should throw")
	}
	rule infix { $lhs:expr | not throw } => {
	  assert.doesNotThrow(
      function() { $lhs },
	    fmt($lhs) + " should not throw")
	}
}

export describe;
export it;
export should;

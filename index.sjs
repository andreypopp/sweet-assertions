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

let assert = macro {
  case { _ ( $tok:expr ) } => {
    var tok = #{$tok}[0];
    var x = makeIdent('assert', #{$tok}[0]);
    x.context = tok.deferredContext || tok.context;
    return [x];
  }
}

macro should {
  rule infix { $lhs:expr | == $rhs:expr } => {
    assert($lhs).deepEqual(
      $lhs, $rhs,
      fmt($lhs) + " should be equal to " + fmt($rhs))
  }

  rule infix { $lhs:expr | != $rhs:expr } => {
    assert($lhs).notDeepEqual(
      $lhs, $rhs,
      fmt($lhs) + " should not be equal to " + fmt($rhs))
  }

  rule infix { $lhs:expr | > $rhs:expr } => {
    assert($lhs).ok(
      $lhs > $rhs,
      fmt($lhs) + " should be greater than " + fmt($rhs))
  }
  rule infix { $lhs:expr | >= $rhs:expr } => {
    assert($lhs).ok(
      $lhs >= $rhs,
      fmt($lhs) + " should be greater or equal than " + fmt($rhs))
  }
  rule infix { $lhs:expr | < $rhs:expr } => {
    assert($lhs).ok(
      $lhs < $rhs,
      fmt($lhs) + " should be less than " + fmt($rhs))
  }
  rule infix { $lhs:expr | <= $rhs:expr } => {
    assert($lhs).ok(
      $lhs <= $rhs,
      fmt($lhs) + " should be less or equal than " + fmt($rhs))
  }

  rule infix { $lhs:expr | have $rhs:expr } => {
    assert($lhs).ok(
      typeof $lhs.$rhs !== 'undefined',
      fmt($lhs) + " should have " + fmt($rhs) + " property")
  }

  rule infix { $lhs:expr | be truthy } => {
    assert($lhs).ok(
      $lhs,
      fmt($lhs) + " should be truthy")
  }
  rule infix { $lhs:expr | be falsy } => {
    assert($lhs).ok(
      !$lhs,
      fmt($lhs) + " should be falsy")
  }

  rule infix { $lhs:expr | contain $rhs } => {
    assert($lhs).ok(
      $lhs.indexOf($rhs) > -1,
      fmt($lhs) + " should contain " + fmt($rhs))
  }

  rule infix { $lhs:expr | throw } => {
    assert($lhs).throws(
      function() { $lhs },
      Error,
      fmt($lhs) + " should throw")
  }
  rule infix { $lhs:expr | not throw } => {
    assert($lhs).doesNotThrow(
      function() { $lhs },
      fmt($lhs) + " should not throw")
  }

  rule infix { $lhs:expr | be $rhs } => {
    assert($lhs).ok(
      $lhs === $rhs,
      fmt($lhs) + " should be " + fmt($rhs))
  }
}

export should;

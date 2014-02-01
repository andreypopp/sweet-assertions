macro fmt {
  case { _ ( $val:expr ) } => {
    function fmt(v) {
      return v.map(function(x){
        return x.token.inner ?
          x.token.value[0] + fmt(x.token.inner) + x.token.value[1] :
          x.token.value;
      }).join('');
    }
    return [makeValue(fmt(#{$val}), #{here})];
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

// This is workaround for https://github.com/mozilla/sweet.js/issues/232
macro scope {
  rule { { $body ... } } => {
    !(function () {
      $body ...
    })();
  }
}

macro should {
  rule infix { $lhs:expr | == $rhs:expr } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).deepEqual(
        lhs, rhs,
        fmt($lhs) + " should be equal to " + fmt($rhs) +
        " but got " + lhs + " != " + rhs)
    }
  }

  rule infix { $lhs:expr | != $rhs:expr } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).notDeepEqual(
        lhs, rhs,
        fmt($lhs) + " should not be equal to " + fmt($rhs) +
        " but got " + lhs + " == " + rhs)
    }
  }

  rule infix { $lhs:expr | > $rhs:expr } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).ok(
        lhs > rhs,
        fmt($lhs) + " should be greater than " + fmt($rhs) +
        " but got " + lhs + " <= " + rhs)
    }
  }
  rule infix { $lhs:expr | >= $rhs:expr } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).ok(
        lhs >= rhs,
        fmt($lhs) + " should be greater or equal than " + fmt($rhs) +
        " but got " + lhs + " < " + rhs)
    }
  }
  rule infix { $lhs:expr | < $rhs:expr } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).ok(
        lhs < rhs,
        fmt($lhs) + " should be less than " + fmt($rhs) +
        " but got " + lhs + " >= " + rhs)
    }
  }
  rule infix { $lhs:expr | <= $rhs:expr } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).ok(
        lhs <= rhs,
        fmt($lhs) + " should be less or equal than " + fmt($rhs) +
        " but got " + lhs + " > " + rhs)
    }
  }

  rule infix { $lhs:expr | have $rhs:expr } => {
    scope {
      var lhs = $lhs;
      assert($lhs).ok(
        typeof $lhs.$rhs !== 'undefined',
        fmt($lhs) + " should have " + fmt($rhs) + " property" +
        " but " + lhs + " has such property")
    }
  }

  rule infix { $lhs:expr | be truthy } => {
    scope {
      var lhs = $lhs;
      assert($lhs).ok(
        lhs,
        fmt($lhs) + " should be truthy" +
        " but it is " + lhs)
    }
  }
  rule infix { $lhs:expr | be falsy } => {
    scope {
      var lhs = $lhs;
      assert($lhs).ok(
        !lhs,
        fmt($lhs) + " should be falsy" +
        " but it is " + lhs)
    }
  }

  rule infix { $lhs:expr | contain $rhs } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).ok(
        lhs.indexOf(rhs) > -1,
        fmt($lhs) + " should contain " + fmt($rhs) +
        " but " + lhs + " doesn't contain " + rhs)
    }
  }

  rule infix { $lhs:expr | throw } => {
    scope {
      assert($lhs).throws(
        function() { $lhs },
        Error,
        fmt($lhs) + " should throw")
    }
  }
  rule infix { $lhs:expr | not throw } => {
    scope {
      assert($lhs).doesNotThrow(
        function() { $lhs },
        fmt($lhs) + " should not throw")
    }
  }

  rule infix { $lhs:expr | be $rhs } => {
    scope {
      var lhs = $lhs;
      var rhs = $rhs;
      assert($lhs).ok(
        lhs === rhs,
        fmt($lhs) + " should be " + fmt($rhs) +
        " but " + lhs + " isn't " + rhs)
    }
  }
}

export should;

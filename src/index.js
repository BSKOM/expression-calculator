function eval(exp) {

}

function expressionCalculator(expr) {
  let res = 0
  let arr = clearerArr(expr)
 
  for (; arr.length > 1;) {
    if (arr.indexOf(')') < 0) {
      return ternar(arr)
    }
    let end = arr.indexOf(')') >= 0 ? arr.indexOf(')') : arr.length
    let start = arr.lastIndexOf('(', end) >= 0 ? arr.lastIndexOf('(', end) + 1 : 0
    let tern = ternar(arr.slice(start, end, ...arr.filter((v, i) => i > end)))
    arr = [...arr.slice(0, start - 1), tern, ...arr.slice(end + 1)]
  }
  res = arr[0]
  if (Number.isInteger(res)) {
    console.log('isint', arr)
    return res
  }
  return res.toFixed(4)
}
function ternar(arr) {

  if ((arr || []).length < 3) {
    return Number(arr[0])
  }
  let i = 0
  if (arr.includes('*') && arr.includes('/')) {
    i = Math.min(arr.indexOf('*'), arr.indexOf('/'))
  }
  else if (arr.includes('*')) {
    i = arr.indexOf('*')
  } else if (arr.includes('/')) {
    i = arr.indexOf('/')
  } else if (arr.includes('+') && arr.includes('-')) {
    i = Math.min(arr.indexOf('+'), arr.indexOf('-'))
  } else if (arr.includes('+')) {
    i = arr.indexOf('+')
  } else if (arr.includes('-')) {
    i = arr.indexOf('-')
  } else return arr
  arr = [...arr.slice(0, i - 1), simpleCalc([arr[i - 1], arr[i], arr[i + 1]]), ...arr.slice(i + 2)]
  return ternar(arr)
}

function clearerArr(expr) {
  let carr = []
  let num = ''
  let countBrack = 0
  expr.split('').forEach(el => {
    if (/[0-9]/.test(el)) {
      num += el
    }
    if (/[\*\/\+\-\(\)]/.test(el)) {
      if (num.length) {
        carr[carr.length] = Number(num)
        num = ''
      }
      countBrack += el === '(' ? 1 : el === ')' ? -1 : 0
      carr[carr.length] = el
    }
  })
  if (num.length) {
    carr[carr.length] = Number(num)
    num = ''
  }
  if (countBrack) throw new Error("ExpressionError: Brackets must be paired")
  return carr
}

function simpleCalc(exp) {
  if (Number(exp[2]) == 0 && exp[1] == '/') {
    throw new Error('TypeError: Division by zero.')
  }
  switch (exp[1]) {
    case '*':
      return exp[0] * exp[2]
    case '/':
      return exp[0] / exp[2]
    case '+':
      return exp[0] + exp[2]
    case '-':
      return exp[0] - exp[2]
    default:
      break
  }
}


module.exports = {
  expressionCalculator
}
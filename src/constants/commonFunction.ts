export function isObjectEmpty(obj:Object) {
    for (var i in obj) return false;
    return true;
  }
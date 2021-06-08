export function useCompare(obj1, obj2) {
  if (obj1.word !== obj2.word) {
    return false;
  }
  if (obj1.tran !== obj2.tran) {
    return false;
  }
  if (obj1.kind !== obj2.kind) {
    return false;
  }
  if (obj1.pro !== obj2.pro) {
    return false;
  }
  return true;
}

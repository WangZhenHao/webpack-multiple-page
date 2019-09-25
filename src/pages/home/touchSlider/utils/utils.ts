export function getTransformX(value) {
  let re = /\d+/g;
  let arr = value.match(re);
  return arr ? arr[1] : 0;
}

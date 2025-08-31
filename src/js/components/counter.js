// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }
export class Counter {
  constructor(selector, initialValue = 0) {
    this.el = document.querySelector(selector);
    this.value = initialValue;
    this.render();
  }
  increment() {
    this.value += 1;
    this.render();
  }
  decrement() {
    this.value -= 1;
    this.render();
  }
  render() {
    if (this.el) this.el.textContent = this.value;
  }
}

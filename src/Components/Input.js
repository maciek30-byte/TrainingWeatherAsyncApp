class Input {
  constructor(placeHolder, value, onInput,classForElement) {
    this.placeHolder = placeHolder;
    this.value = value;
    this.onInput = onInput;
    this.classForElement = classForElement;
  }
  render() {
    const input = document.createElement("input");
    input.value = this.value
    input.classList.add(this.classForElement)
    input.placeholder = this.placeHolder;
    input.addEventListener("input", this.onInput);

    // poprawa autofocusu na inpucie
    setTimeout(() => input.focus(), 0);
    return input;
  }
}
export default Input
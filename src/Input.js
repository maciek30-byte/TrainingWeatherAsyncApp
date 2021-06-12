class Input {
  constructor(placeHolder, value, onInput) {
    this.placeHolder = placeHolder;
    this.value = value;
    this.onInput = onInput;
  }
  render() {
    const input = document.createElement("input");
    input.placeholder = this.placeHolder;
    input.addEventListener("input", this.onInput);

    // poprawa autofocusu na inpucie
    setTimeout(() => input.focus(), 0);
    return input;
  }
}

class Button {
  constructor (label, onClick){
    this.label = label;
    this.onClick = onClick
  }
  render(){
    const button = document.createElement('button');
    button.innerText = this.label;
    button.addEventListener('click', this.onClick);
    return button
  }

}
export default Button
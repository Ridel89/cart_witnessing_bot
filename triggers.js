function myOnEdit(e){
  const range = e.range;
  const val = e.value;
  let row = range.getRow()
  let col = range.getColumn()
  if (val && val !== ''){
    scriptProperties.setProperty(`${row},${col}`,'')
  }else{
    scriptProperties.deleteProperty(`${row},${col}`)
  }
  // range.setFontFamily("Arial");
  // range.setFontSize(14);
  // range.setHorizontalAlignment("center");
  // return range.setValue(val)
  
}

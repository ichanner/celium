export default(number, labels=['',''])=>{

  const fixed_label = number == 1 ? labels[0] : labels[1]

  if(number < 1000) return `${number.toString()}${fixed_label}`

  const suffixes = ['', 'K', 'M', 'B', 'T']
  const suffix_index = Math.floor(Math.log10(Math.abs(number)) / 3)
  const truncated_number = (number / Math.pow(10, suffix_index * 3)).toFixed(1)
  const suffix = suffixes[suffix_index]

  return `${truncated_number}${suffix}${labels[1]}`;
}
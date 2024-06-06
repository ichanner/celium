export default ():string =>{

	const avaliableCharacters = '0123456789ABCDEF'
	let color = '#'

	for(let i = 0; i < 6; i++){

		color+=avaliableCharacters[Math.floor(Math.random()*avaliableCharacters.length)]
	}

	return color;
}
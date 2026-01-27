const number = [25, 45, 15, 84, 45]


fetch('url')
    .then(response => response.json())
    .then(data => {

    })
    .catch(error => console.log(error))

console.log('test')


const isOk = async () => {
    const habilitado = await fetch('url')

    console.log(habilitado)
}
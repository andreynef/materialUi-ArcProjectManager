// Скачано с https://github.com/vercel/next.js/issues/512#issuecomment-322026199
// Типа решение одного чувака.
const FontFaceObserver = require('fontfaceobserver')

const Fonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Pacifico|Roboto:300,400,500,700&display=swap'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const roboto = new FontFaceObserver('Roboto')

  roboto.load().then(() => {
    document.documentElement.classList.add('roboto')
  })

}

export default Fonts
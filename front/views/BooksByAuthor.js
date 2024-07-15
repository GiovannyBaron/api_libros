// Dependencias
const m = require('mithril')
const b = require('bss').default
const { Routing } = require('meiosis-routing/state')
const { map } = require('rambda')

// Utilidades
const { mkComponent } = require('../views/utils')

export default mkComponent(
    ({ actions }) => {
        let search

        return ({ state }) => {
            const routing = Routing(state.route)
            const booksByAuthor = state?.Books?.booksByAuthor || []
            const hasError = booksByAuthor?.detail

            return m('',
                m('h2', 'Bienvenido al buscador de libros por autor'),
                m('input', { type: 'text', oninput: ({ target: { value } }) => search = value }),
                m('button', { onclick: _ => actions.authorRequest(search) }, 'Buscar libros'),
                !hasError ? map(({ Titulo }) => m('p', Titulo), booksByAuthor)
                    : m('p', booksByAuthor?.detail),
            )
        }
    },
)
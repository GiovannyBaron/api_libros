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
            console.warn('Login', { state })
            const booksByAuthor = state?.Books?.booksByAuthor || []
            console.log('books :>> ', booksByAuthor);
            const hasError = booksByAuthor?.detail
            console.log('hasError :>> ', hasError);

            return m('',
                m('h2', 'Bienvenido al buscador de libros por autor'),
                m('input', { type: 'text', oninput: ({ target: { value } }) => search = value }, 'Funciono'),
                m('button', { onclick: _ => actions.authorRequest(search) }, 'Botón'),
                !hasError ? map(({ Titulo }) => m('p', Titulo), booksByAuthor)
                    : m('p', booksByAuthor?.detail),
            )
        }
    },
)
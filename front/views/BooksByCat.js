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
            const booksByCat = state?.Books?.booksByCat || []
            const hasError = booksByCat?.detail

            return m('',
                m('h2', 'Bienvenido al buscador de libros por categoría'),
                m('input', { type: 'text', oninput: ({ target: { value } }) => search = value }),
                m('button', { onclick: _ => actions.categoryRequest(search) }, 'Buscar autores'),
                !hasError ? map(({ Titulo }) => m('p', Titulo), booksByCat)
                    : m('p', booksByCat?.detail),
            )
        }
    },
)
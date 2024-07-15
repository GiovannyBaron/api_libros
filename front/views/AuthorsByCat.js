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
            const authorsByCat = state?.Books?.authorsByCat || []
            const hasError = authorsByCat?.detail

            return m('',
                m('h2', 'Bienvenido al buscador de autores por categoría'),
                m('input', { type: 'text', oninput: ({ target: { value } }) => search = value }),
                m('button', { onclick: _ => actions.authorsByCatRequest(search) }, 'Buscar autores'),
                !hasError ? map(autor => m('p', autor), authorsByCat)
                    : m('p', authorsByCat?.detail),
            )
        }
    },
)
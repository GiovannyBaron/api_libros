import BooksByAuthor from './BooksByAuthor';

// Dependencias
const m = require('mithril')
const b = require('bss').default
const { Routing } = require('meiosis-routing/state')
const { map } = require('rambda')
const { Route } = require('../routes')

// Utilidades
const { mkComponent } = require('../views/utils')

const viewMap = {
    BooksByAuthor
}

export default mkComponent(
    ({ actions }) => {
        let search

        return ({ state }) => {
            const routing = Routing(state.route)
            const mainView = routing.localSegment.id
            console.log('mainView :>> ', mainView);

            return m('',
                m('h1', 'Bienvenido a la biblioteca'),
                m('p', '¿Qué desea hacer?'),
                m('' + b.d('flex'),
                    m('button' + b.m('0 2rem'), { onclick: _ => actions.navigateTo([Route.BooksByAuthor()]) }, 'Buscar libros por autor'),
                    m('button' + b.m('0 2rem'), { onclick: _ => actions.navigateTo([Route.BooksByAuthor()]) }, 'Buscar libros por categoría'),
                    m('button' + b.m('0 2rem'), { onclick: _ => actions.navigateTo([Route.BooksByAuthor()]) }, 'Buscar libros por editorial'),
                ),
                viewMap[mainView] && m('',
                    m(viewMap[mainView], { actions, state }),
                    m('button', { onclick: _ => actions.navigateTo([Route.Home()]) }, 'Volver')
                )
            )
        }
    },
)
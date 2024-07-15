const m = require('mithril')
const { always, keys, map } = require('rambda')

const { navTo, Route, routeService } = require('../routes')

const app = {
    initial: {
        ...navTo([Route.Home()]),

    },
    Actions: (update, getState) => ({
        navigateTo: route => update(navTo(route)),

        authorRequest: author => m.request({ url: `/libros-por-autor/${author}`, method: 'GET' })
            .then(data => update({ Books: { booksByAuthor: data } }))
            .catch(error => update({ Books: { booksByAuthor: error } }))
    }),
    Effects: (update, actions) => [
    ],
    services: [
        routeService,
        // state => {
        //     const { routeTransition: { arrive, leave } } = state
        //     return [map(v => ({ [v]: always({ ...initialState[v]?.(state) }) }), keys(arrive)), map(always(undefined), leave)]
        // },
    ]
}

export { app };
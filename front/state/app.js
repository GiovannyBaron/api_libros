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
            .catch(error => update({ Books: { booksByAuthor: error } })),

        categoryRequest: categoria => m.request({ url: `/libros-por-categoria/${categoria}`, method: 'GET' })
            .then(data => update({ Books: { booksByCat: data } }))
            .catch(error => update({ Books: { booksByCat: error } })),

        publisherRequest: editorial => m.request({ url: `/libros-por-editorial/${editorial}`, method: 'GET' })
            .then(data => update({ Books: { booksByPublisher: data } }))
            .catch(error => update({ Books: { booksByPublisher: error } })),

        authorsByCatRequest: categoria => m.request({ url: `/autores-libros-por-categoria/${categoria}`, method: 'GET' })
            .then(data => update({ Books: { authorsByCat: data } }))
            .catch(error => update({ Books: { authorsByCat: error } }))
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
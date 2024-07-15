const m = require('mithril')
const { routeTransition, createRouteSegments } = require('meiosis-routing/state')
const { createMithrilRouter } = require('meiosis-routing/router-helper')

const navTo = route => ({ nextRoute: () => Array.isArray(route) ? route : [route] })

const Route = createRouteSegments([
    'Home',
    'BooksByAuthor',
    'BooksByCat',
    'BooksByPublisher',
    'AuthorsByCat'
])

const routeService = state => ({
    routeTransition: () => routeTransition(state.route, state.nextRoute),
    route: state.nextRoute
})

const routeConfig = {
    Home: '/',
    BooksByAuthor: '/libros-por-autor',
    BooksByCat: '/libros-por-categoria',
    BooksByPublisher: '/libros-por-editorial',
    AuthorsByCat: '/autores-por-categoria'
}

const router = createMithrilRouter({
    m,
    routeConfig
})

export { navTo, Route, router, routeService };
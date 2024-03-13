class AbstractRoute {
    async run(req, reply) {
        throw new Error('Abstract method run must be implemented in derived classes');
    }
}

module.exports = AbstractRoute;

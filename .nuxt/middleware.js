const middleware = {}

middleware['AdminGaurd'] = require('..\\middleware\\AdminGaurd.js')
middleware['AdminGaurd'] = middleware['AdminGaurd'].default || middleware['AdminGaurd']

middleware['e-agent'] = require('..\\middleware\\e-agent.js')
middleware['e-agent'] = middleware['e-agent'].default || middleware['e-agent']

export default middleware

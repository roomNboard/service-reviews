LOAD WEBPACK BUNDLE TO CREATE COMPONENTS

const renderComponents = (components, props = {}) => {
    return Object.keys(components).map(item => {
        let component = React.createElement(components(item), props);
        return ReactDom.renderToString(component);
    })
}

app.get('/items/:id', function(req, res) => {
  let components = renderComponents(services, {itemid: req.params.id});
  res.end(Layout(
        'SDC Demo',
        App(...components),
        Scripts(Object.keys(services))
  ));
});


const clientBundles = ('./public/services');
const serverBundles = './templates/services';
const sericeConfig = require('./')
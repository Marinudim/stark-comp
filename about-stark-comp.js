// setup stark-comp object-processor for all components
const sc = new StarkComp()

sc.setComp({/* comp */ }) // set up component
sc.getComp("component name") // return component by its name
sc.getComps() // return all components in sc

// replace method
sc.replace({ name: 'component name', params: {/* params for init function */ }, force: true })
// flag force used if it is single component you need to replace completely, not only its data
// multiple component always replaced by new one

// insert method
sc.insert({ name: 'component name', params, index: 'after' }) // index where to insert [after,before,number]

// refresh method
sc.refresh({ name: 'component name', target }) // target for multiple component if there is monitoring
// refresh method changes only data between, inside HTML

some_component = {
    data, // data for html
    html, // html code
    length, // length, 1 for single component
    name, // name of component
    sc_info, // here you can place any data that Stark-Comp don't procceded
    sigle, // true or false
    target, // place in HTML document where is this component

    // next data returned into event function.
    root, // for multiple componentn means certain element
    datum, // same as data[index]
    index // index of element. 0 for single component

}
// example of Stark-Comp's component object
{
    // place here local variables for this component
    let resp = {}

    sc.setComp({ // example of single component header
        name: 'header', params: false,
        init: async function (params, method) { // params for reuse component by methods replace and insert
            // used method returned by StarkComp - "init", "replace" or "insert"
            if (!params) return {} // if you want postponed initialization

            // params inside response to server-side
            // get response from server depend on params and method
            switch (params || method) {
                case "one": {
                    resp = (await ajaxRequest({ wh: 'get_data', name: this.name, params })).data;
                }; break;
                default: {
                    // response remain the same
                }; break;
            } // switch params || method

            // prepare data for place it into HTML of component
            // types of data: text, html, src, value, href, title and objects style, dataset
            let data = {
                user_name: { text: resp.data_one, dataset: { _id: resp._id } },
                avatar: { src: resp.data_src },
                class_name3: { html: resp.data_html },
                class_name4: { style: { color: 'red' } }
            }

            afterLoad()

            return {
                target: document.querySelector(`.${this.name}`),
                data: data,
                html: HTML[this.name]
            }
        },
        events: [  // events array
            {
                target: 'some_class', event: 'click',
                func: async function (e) {
                    const otherComponent = await sc.getComp('otherComponent')
                    otherComponent.data.forEach(datum => {
                        // some actions with datum
                        datum.style.color = 'yellow';
                    })
                    await sc.refresh({ name: 'otherComponent' })
                } // event func
            },
            {
                target: 'other_class', event: 'mouseover',
                func: function () { } // event func
            }
        ]
    }) // set comp

    // place here local functions
    async function afterLoad() {
        const header = await sc.getComp('header')
        // Code here executes after header is ready to use anywhere
        // You can set event handlers here.
    } // func start after loaded

}
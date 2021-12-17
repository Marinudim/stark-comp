// example of Stark-Comp's component object
{
    // place here local variables

    sc.setComp({ // example of single component header
        name: 'header', params: false,
        init: async function (params) { // params for reuse component by methods replace and insert
            if (!params) return {} // if you want postponed initialization

            // params inside response to server-side
            let resp = (await ajaxRequest({ wh: 'get_data', name: this.name, params })).data;

            /* prepare data for place it into HTML of component */
            let data = {
                class_name: { text: resp.data_one },
                class_name: { src: resp.data_src },
                class_name: { html: resp.data_html }
            }

            startAfterLoaded()

            return {
                target: document.querySelector(`.${this.name}`),
                data: data,
                html: HTML[this.name]
            }
        },
        events: [  // events array
            {
                target: 'some_class', event: 'click',
                func: function (e) { } // event func
            },
            {
                target: 'other_class', event: 'click',
                func: async function (e) { } // event func
            }
        ]
    }) // set comp

    // place here local functions
    async function startAfterLoaded() {
        const header = await sc.getComp('header')
        // code here executes after header is ready to use anywhere
    } // func start after loaded

}
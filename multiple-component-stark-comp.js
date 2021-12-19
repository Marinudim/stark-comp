// example of Stark-Comp's component object
{
    // place here local variables for this component
    let resp = {}

    sc.setComp({ // example of single component header
        name: 'article', params: false,
        init: async function (params, method) { // params for reuse component by methods replace and insert
            // used method returned by StarkComp - "init", "replace" or "insert"
            if (!params) return [] // if you want postponed initialization

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

            let data = [], index = 0;
            for (let item of resp) {
                data[index] = {
                    title: { text: item.title, dataset: { _id: item._id } },
                    image: { src: item.image },
                    content: { html: item.content },
                    class_name4: { style: { color: 'red' } }
                }
                index++
            } // for item of resp

            afterLoad()

            setIntersectionObserver()

            return {
                target: document.querySelector(`.${this.name}`),
                data: data,
                html: HTML[this.name]
            }
        },
        events: [  // events array
            {
                target: 'some_class', event: 'click',
                func: async function (e) { } // event func
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
        // You can get data from header here
        console.log('header data', header.data)
        // You can set event handlers here.
    } // func start after loaded

    async function setIntersectionObserver() {
        const article = await sc.getComp('article')
        const lastArticle = article.target.children[article.length - 1]
        let options = {
            root: null, // article.target,
            rootMargin: '0px',
            threshold: 1 // 1 - whole in body, .5 - half
        }
        let observer = new IntersectionObserver(async (e) => {
            if (e[0].isIntersecting) {
                observer.unobserve(lastArticle)
                let limit = 2,
                    skip = article.length - 1;
                await sc.insert({ name: 'article', params: { skip, limit, article_id: params.article_id }, index: 'after' })
            }
        }, options);
        observer.observe(lastArticle)
    } // func set intersection observer

}
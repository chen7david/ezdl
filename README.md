# EZ-Downlaoder

```js
const DL = require('ezdl')({
    folder: path.resolve(__dirname, 'downloads'),
    baseURL:'http://some-url/'
})

const configured = async () => {

       const result = await DL
            .params('url-param-one', 'url-param-two', /* url-param-n */)
            .name('file-name')
            .start('parent-folder', 'child-foler-one', /* child-foler-n */)

}

configured()
```

```js
const { Downloader } = require('ezdl')
const DL = new Downloader()

const instance = async () => {

    const result = await DL
        .baseURL('http://image.tmdb.org/t/p/')
        .params('url-param-one', 'url-param-two', /* url-param-n */)
        .name('file-name')
        .start('parent-folder', 'child-foler-one', /* child-foler-n */)

}

instance()
```


```js
.force(/* boolean */) /* optional - foreces redownload of already existing files */ 
```
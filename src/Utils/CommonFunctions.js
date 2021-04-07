const APICall = async (link, object, callback) => {
    fetch(link, object)
        .then(res => res.json())
        .then(result => {
            callback(null, result)
        })
        .catch(err => console.log(err))
}

export { APICall }
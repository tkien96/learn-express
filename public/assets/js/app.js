function callAjax(url, data, dataType = 'json', type = 'POST') {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: dataType,
            success: resolve,
            error: reject
        })
    })
}

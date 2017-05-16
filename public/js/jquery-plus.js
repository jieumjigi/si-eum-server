$.put = function(url, data) {
  if (arguments.length == 1) {
    return function(data) {
      return $.ajax({
        method: "PUT",
        url: url,
        data: data
      })
    }
  }
  else {
    return $.ajax({
      method: "PUT",
      url: url,
      data: data
    })
  }
};
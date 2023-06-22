
class Utils { 
    array2postgres(arr) {
        var res = ""
        for(var i=0;i<arr.length;i++) {
            switch(i) {
                case 0:
                    if(arr.length===1) res+=`{${arr[i]}}`
                    else res+=`{${arr[0]}`
                    break
                case arr.length-1:
                    res+=`,${arr[i]}}`
                    break
                default: 
                    res+=`,${arr[i]}`
                    break
            }
        } 
        return res
    }
    array2postgres_ex(arr, expression) {
        var res = ""
        for(var i=0;i<arr.length;i++) {
            switch(i) {
                case 0:
                    if(arr.length===1) res+=`{${arr[i][expression]}}`
                    else res+=`{${arr[0][expression]}`
                    break
                case arr.length-1:
                    res+=`,${arr[i][expression]}}`
                    break
                default: 
                    res+=`,${arr[i][expression]}`
                    break
            }
        }
        return res 
    }
    
    verify_film_model(model) {
        if(
            (model === undefined || model === null) || 
            (model.id  === undefined || model.id === null) || 
            (model._id === undefined || model._id === null) || 
            (model.language === undefined || model.language === null) || 
            (model.title  === undefined || model.title === null) || 
            (model.description === undefined || model.desctiption === null) || 
            (model.year === undefined || model.year === null) || 
            (model.countries === undefined || model.countries === null) || 
            (model.duration  === undefined || model.duration === null) || 
            (model.genres === undefined || model.genres === null) || 
            (model.poster === undefined || model.poster === null) || 
            (model.players === undefined || model.players === null)
        ) return false 
        return true
    }
}

module.exports = new Utils()
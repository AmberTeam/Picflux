
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
            !model||
            !model.id ||
            !model._id||
            !model.language||
            !model.title ||
            !model.description||
            !model.year||
            !model.countries||
            !model.duration ||
            !model.genres||
            !model.poster||
            !model.players
        ) return false 
        return true
    }
}

module.exports = new Utils()
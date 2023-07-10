
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
            (model === undefined || model === null) 
        ) return false 
        return true
    }

    string_up_to_char(str, starter_val, char, limit = 10) {
        const starter_i = str.indexOf(starter_val) + starter_val.length
        for(var i=starter_i;i < starter_i + limit;i++) {
            if(str[i] === char) return str.slice(starter_i, i)
        }
    }

    split2n(v, n) {
        const s = v.split("") 
        for(var i=0;i < s.length;i+=n) {
            var r = s[i]
            for(var a=1;a < n;a++) {
                if(s[i+a]) r += s[i+a]
            }
            return r
        }
    }
}

module.exports = new Utils()
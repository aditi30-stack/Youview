

export const Throttle = (fn: ()=> void, delay: number) =>{
    let lastCall = 0;
    let timerId:any;

    

    return function() {
        const now = Date.now();
        clearTimeout(timerId)
        if(now - timerId >= delay ) {
            lastCall = Date.now()
            fn()

        }
        else {
            timerId = setTimeout(()=>{
                lastCall = now;
                fn()
            }, delay - (now-lastCall))
        }
        
    }

}
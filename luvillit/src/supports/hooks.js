import { useEffect, useRef } from "react";

const autoWakeLook = () => {
    const wakeLockRef = useRef(null)

    useEffect(()=>{
        const reqWakeLock = async () => {
            if('wakeLock' in navigator){
                try{
                    wakeLockRef.current = await navigator.wakeLock.request('screen')
                    console.log('Wake Lock is active')
                }catch(err){
                    console.log(`${err.name}, ${err.message}`)
                }
            }
        }

        reqWakeLock()

        const handleVis = () => {
            if(document.visibilityState === 'visible'){
                reqWakeLock();
            }
        }

        document.addEventListener('visibilitychange', handleVis)

        return () => {
            document.removeEventListener('visibilitychange', handleVis)
            if(wakeLockRef.current){
                wakeLockRef.current.release()
                wakeLockRef.current = null
            }
        }
    }, [])
}

export default autoWakeLook


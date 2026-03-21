import { useEffect, useRef } from "react";

const useAutoWakeLock = () => {
    const wakeLockRef = useRef(null);

    useEffect(() => {
        const reqWakeLock = async () => {
            if ('wakeLock' in navigator) {
                try {
                    if (wakeLockRef.current) return; 

                    wakeLockRef.current = await navigator.wakeLock.request('screen');
                    console.log('Wake Lock is active');

                    wakeLockRef.current?.addEventListener('release', () => {
                        console.log('Wake Lock was released');
                        wakeLockRef.current = null;
                    });
                } catch (err) {
                    console.warn(`Wake Lock Error: ${err?.name}, ${err?.message}`, err);
                }
            }
        };

        const handleVis = () => {
            if (document.visibilityState === 'visible') {
                reqWakeLock();
            }
        };

        const handleFirstTouch = () => {
            if (!wakeLockRef.current) {
                reqWakeLock();
            }
            document.removeEventListener('touchstart', handleFirstTouch);
            document.removeEventListener('click', handleFirstTouch);
        };

        document.addEventListener('visibilitychange', handleVis);
        document.addEventListener('touchstart', handleFirstTouch);
        document.addEventListener('click', handleFirstTouch);

        return () => {
            document.removeEventListener('visibilitychange', handleVis);
            document.removeEventListener('touchstart', handleFirstTouch);
            document.removeEventListener('click', handleFirstTouch);

            if (wakeLockRef.current) {
                wakeLockRef.current?.release();
                wakeLockRef.current = null;
            }
        };
    }, []);
};

export default useAutoWakeLock;
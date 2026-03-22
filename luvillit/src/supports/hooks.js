import { useEffect, useRef } from "react";

const createNoSleepVideo = () => {
    // Chuỗi MP4 gốc của bạn (giữ nguyên)
    const mp4 =
        "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiBwaXJhPTAgYXE9MToxLjAwAAAAAWWIhAA3//728P4FNjuZQJcRzeid";

    const video = document.createElement("video");
    video.setAttribute("loop", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("controls", "false"); 
    video.style.cssText =
        "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-9999;top:0;left:0";

    const source = document.createElement("source");
    source.src = mp4;
    source.type = "video/mp4";

    video.appendChild(source);
    document.body.appendChild(video);

    video.load();

    return video;
};

const useAutoWakeLock = () => {
    const wakeLockRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        let isVideoFallbackActive = false;
        let isInteracting = false; // "Chốt chặn" chống double-fire

        const requestNativeWakeLock = async () => {
            if ("wakeLock" in navigator) {
                try {
                    if (wakeLockRef.current) return true;
                    wakeLockRef.current = await navigator.wakeLock.request("screen");
                    console.log("Native Wake Lock is active");
                    
                    wakeLockRef.current.addEventListener("release", () => {
                        console.log("Native Wake Lock was released");
                        wakeLockRef.current = null;
                    });
                    return true;
                } catch (err) {
                    console.warn(`Native Wake Lock failed (${err?.name})`);
                    return false;
                }
            }
            return false;
        };

        const handleFirstInteraction = async () => {
            if (isInteracting) return;
            isInteracting = true;

            document.removeEventListener("touchstart", handleFirstInteraction);
            document.removeEventListener("click", handleFirstInteraction);

            if (!videoRef.current) {
                videoRef.current = createNoSleepVideo();
            }

            try {
                await videoRef.current.play();
                isVideoFallbackActive = true;
                console.log("Video fallback started successfully");
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.warn("Could not play fallback video", err);
                }
            }

            const nativeSuccess = await requestNativeWakeLock();

            if (nativeSuccess && videoRef.current) {
                videoRef.current.pause();
                isVideoFallbackActive = false;
                console.log("Stopped video fallback, using Native Wake Lock");
            }
        };

        const handleVis = () => {
            if (document.visibilityState === "visible") {
                requestNativeWakeLock().then(success => {
                    if (!success && isVideoFallbackActive && videoRef.current) {
                        videoRef.current.play().catch(() => {});
                    }
                });
            } else {
                if (videoRef.current) videoRef.current.pause();
            }
        };

        document.addEventListener("visibilitychange", handleVis);
        document.addEventListener("touchstart", handleFirstInteraction, { once: true });
        document.addEventListener("click", handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener("visibilitychange", handleVis);
            document.removeEventListener("touchstart", handleFirstInteraction);
            document.removeEventListener("click", handleFirstInteraction);

            if (wakeLockRef.current) {
                wakeLockRef.current.release();
                wakeLockRef.current = null;
            }
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.remove();
                videoRef.current = null;
            }
        };
    }, []);
};

export default useAutoWakeLock;
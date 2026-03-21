import { useEffect, useRef } from "react";

// iOS Safari does not support the Screen Wake Lock API — it throws NotAllowedError.
// Workaround: play a silent invisible looping video, which prevents iOS from dimming the screen.
const createNoSleepVideo = () => {
    // Minimal silent MP4 encoded as a data URI (1×1 px, ~70 bytes)
    const mp4 =
        "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiBwaXJhPTAgYXE9MToxLjAwAAAAAWWIhAA3//728P4FNjuZQJcRzeid";

    const video = document.createElement("video");
    video.setAttribute("loop", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.style.cssText =
        "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-9999;top:0;left:0";

    const source = document.createElement("source");
    source.src = mp4;
    source.type = "video/mp4";

    video.appendChild(source);
    document.body.appendChild(video);
    return video;
};

const useAutoWakeLock = () => {
    const wakeLockRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        let usingVideoFallback = false;

        const startVideoFallback = () => {
            if (usingVideoFallback) return;
            usingVideoFallback = true;
            if (!videoRef.current) {
                videoRef.current = createNoSleepVideo();
            }
            videoRef.current.play().catch(() => {});
            console.log("Wake lock: using iOS video fallback");
        };

        const reqWakeLock = async () => {
            if (!("wakeLock" in navigator)) {
                startVideoFallback();
                return;
            }
            try {
                if (wakeLockRef.current) return;
                wakeLockRef.current = await navigator.wakeLock.request("screen");
                console.log("Wake Lock is active");
                wakeLockRef.current.addEventListener("release", () => {
                    console.log("Wake Lock was released");
                    wakeLockRef.current = null;
                });
            } catch (err) {
                // iOS throws NotAllowedError — fall back to video trick
                console.warn(`Wake Lock failed (${err?.name}), switching to video fallback`);
                startVideoFallback();
            }
        };

        const handleVis = () => {
            if (document.visibilityState === "visible") {
                if (usingVideoFallback && videoRef.current) {
                    videoRef.current.play().catch(() => {});
                } else {
                    reqWakeLock();
                }
            } else {
                // Pause video when tab is hidden to save battery
                if (videoRef.current) videoRef.current.pause();
            }
        };

        const handleFirstInteraction = () => {
            // iOS requires a user gesture before video.play() is allowed
            reqWakeLock();
            document.removeEventListener("touchstart", handleFirstInteraction);
            document.removeEventListener("click", handleFirstInteraction);
        };

        document.addEventListener("visibilitychange", handleVis);
        document.addEventListener("touchstart", handleFirstInteraction);
        document.addEventListener("click", handleFirstInteraction);

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
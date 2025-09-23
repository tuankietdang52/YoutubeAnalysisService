import { readFileSync } from "fs"
import { FFMPEGOption } from "./service/ffmpeg-service";

interface AppConfig {
    downloadTimedOut: number,
    verifyTimedOut: number,
    audioDownloadOptions: FFMPEGOption
}

export let appConfigure: AppConfig;

export const configure = () => {
    const raw = readFileSync('app-config.json', 'utf-8');
    appConfigure = JSON.parse(raw);
}
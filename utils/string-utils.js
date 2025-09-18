export const isYoutubeVideoUrl = (url) => {
    const regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?(youtube\.com|youtu\.be)(\/(?:watch\?v=|embed\/|v\/|live\/)?)([\w\-]{11})(\S*)?$/;
    return url.match(regex);
}
export interface SingleVideoType {
    kind: string;
    etag: string;
    id: Id;
    snippet: Snippet;
}

interface Id {
    kind: string;
    videoId: string;
}

interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
}

interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
}


export interface AllVideoItemsType {
    kind: string,
    etag: string,
    nextPageToken: string,
    regionCode: string,
    pageinfo : {
        totalResults: number,
        resultsPerPage: number
    },
    items : SingleVideoType[]

}
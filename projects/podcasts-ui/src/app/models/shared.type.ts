export enum Status {
    True = "true",
    False = "false"
}

export enum Value {
    Any = "any",
    Lightning = "lightning",
    Hive = "hive",
    WebMonetization = "webmonetization",
}

export enum LiveStatus {
    Ended = "ended",
    Live = "live"
}

export enum TranscriptType {
    Plain = "text/plain",
    HTML = "text/html",
    SRT = "application/srt",
    VTT = "text/vtt",
    Json = "application/json",
}

export enum SocialProtocol {
    Disabled = "disabled",
    ActivityPub = "activitypub",
    Twitter = "twitter",
    Lightning = "lightning",
}

export enum Medium {
    AudioBook = "audiobook",
    Blog = "blog ",
    Film = "film",
    Music = "music",
    Newsletter = "newsletter",
    Podcast = "podcast",
    Video = "video",
}

export type AnyQueryOptions = Record<
    string,
    string | string[] | number | number[] | boolean | undefined
>;

export type BaseResponse = {
    status: Status;
    description: string;
}

export type Category = {
    id: number;
    name: string;
};

export type CategoriesResponse  = BaseResponse & {    
    count: number,    
    feeds: Array<Category>
} ;

export type Funding = {
    url: string;
    message: string;
}

export type ValueModel = {
    type: Value;
    method: string;
    suggested: string;
}

export type ValueForValue = {
    model: ValueModel;
    destinations: Array<Destination>;
}

export type Destination = {
    name: string;
    address: string;
    type: unknown;
    split: number;
    fee: boolean;
    customKey: string;
    customValue: string;
}

export type Query = {
    id: string;
}

export type Transcript = {
    url: string;
    type: TranscriptType;
}

export type Soundbite = {
    startTime: number;
    duration: number;
    title: string;
}

export type Person = {
    id: number;
    name: string;
    role: string;
    group: string
    href: string
    img: string
}

export type SocialInteract = {
    url: string;
    protocol: SocialProtocol;
    accountId: string;
    accountUrl: string;
    priority: number;
}

export type Stats = {
    feedCountTotal: number;
    episodeCountTotal: number;
    feedsWithNewEpisodes3days: number;
    feedsWithNewEpisodes10days: number;
    feedsWithNewEpisodes30days: number;
    feedsWithNewEpisodes90days: number;
    feedsWithValueBlocks: number;
}

export type StatsResponse = BaseResponse & {
    stats: Stats;
}

export type Feed = {
    id: number;
    url: string;
    title: string;
    description: string;
    author: string;
    image: string;
    artwork: string;
    newestItemPublishTime: number;
    itunesId: number;
    trendScore: number;
    language: string;
    categories: Record<number, string>;
}

export type TrendingResponse = BaseResponse & {
    feeds: Array<Feed>;
    count: number;
    max: number;
    since: number;
}

export type Item = {
    enclosureUrl: string;
    title: string;
    startTime: number;
    duration: number;
    episodeId: number;
    episodeTitle: number;
    feedTitle: number;
    feedUrl: number;
    feedId: number;
}

export type SoundbitesResponse = BaseResponse & {
    items: Array<Item>;
}

export type SearchFeed = Feed & {
    podcastGuid: string;
    originalUrl: string;
    link: string;
    ownerName: string;
    lastUpdateTime: number;
    lastCrawlTime: number;
    lastParseTime: number;
    lastGoodHttpStatusTime: number;
    lastHttpStatus: number;
    contentType: string;
    generator: string;
    explicit: boolean;
    type: number;
    dead: number;
    episodeCount: number;
    crawlErrors: number;
    parseErrors: number;
    locked: number;
    imageUrlHash: number;
    newestItemPubdate: number;
}

export type SearchResponse = BaseResponse & {
    feeds: Array<SearchFeed>;
    count: number;
    query: string;
}

export type RecentEpisodeFeed = Feed & {
    link: string;
    guid: string
    datePublished: number;
    dateCrawled: number;
    enclosureUrl: string;
    enclosureType: string;
    enclosureLength: number;
    explicit: number;
    episode: number;
    episodeType: string;
    season: number;
    feedItunesId: number;
    feedImage: string;
    feedId: number;
    feedTitle: string;
    feedLanguage: string;
}

export type RecentEpisodesResponse = BaseResponse & {
    items: Array<RecentEpisodeFeed>;
    count: number;
    max: number;
}

export type RecentPodcastFeed = Omit<Feed, "description | author | image | artwork | trendScore"> & {
    oldestItemPublishTime: number;
}

export type RecentFeedsResponse = BaseResponse & {
    feeds: Array<RecentPodcastFeed>;
    count: number;
    max: number;
    since: number;
}

export type PodcastsByIdFeed = SearchFeed & {
    itunesType: string;
    chash: string;
    value: unknown; // Work in progress
    funding: Funding;
}

export type PodcastsByIdResponse = BaseResponse & {
    query: Query;
    feed: PodcastsByIdFeed;
}

export type PodcastsByMediumFeed = SearchFeed & {
    //TODO
}

export type PodcastsByMediumResponse = BaseResponse & {
    feeds: Array<PodcastsByMediumFeed>;
    count: number;
    medium: string;
}

export type EpisodesByIdLiveItems = RecentEpisodeFeed & {
    startTime: number;
    endTime: number;
    status: LiveStatus;
    contentLink: string;
    duration: number;
    feedDead: number;
    feedDuplicateOf: number;
    chaptersUrl: string;
    transcriptUrl: string;
}

export type EpisodesByIdItems = RecentEpisodeFeed & {
    duration: number;
    feedDead: number;
    feedDuplicateOf: number;
    chaptersUrl: string;
    transcriptUrl: string;
    transcripts: Array<Transcript>;
    soundbite: Soundbite;
    soundbites: Array<Soundbite>;
    persons: Array<Person>;
    socialInteract: Array<SocialInteract>;
    value: ValueForValue;
}

export type EpisodesByIdResponse = BaseResponse & {
    liveItems: Array<EpisodesByIdLiveItems>;
    items: Array<EpisodesByIdItems>;
    count: number;
    query: string | string[];
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AnyQueryOptions,
  CategoriesResponse,
  EpisodesByIdResponse,
  Medium,
  PodcastsByIdResponse,
  RecentEpisodesResponse,
  RecentFeedsResponse,
  SearchResponse,
  SoundbitesResponse,
  StatsResponse,
  TrendingResponse,
  Value
} from '../models/shared.type';

const API_URL = "http://192.168.1.4:3000"

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns List of podcast categories
   */
  getCategories(): Observable<CategoriesResponse> {
    return this.fetch<CategoriesResponse>("/categories/list");
  }

  /**
   * 
   * @returns Stats for the items in podcast index
   */
  getStats(): Observable<StatsResponse> {
    return this.fetch<StatsResponse>("/stats/current");
  }

  /**
   * 
   * @param {number} max Maximum number of items 
   * @param lang 
   * @param since 
   * @param cat 
   * @param notcat 
   * @returns Podcasts/Feeds that are trending
   */
  getTrending(
    max?: number,
    lang?: string,
    since?: number,
    cat?: string,
    notcat?: string
  ): Observable<TrendingResponse> {
    let qs: AnyQueryOptions = {
      max: max ?? 25,
      lang: lang ?? 'en',
      since: since,
      cat: cat,
      notcat: notcat
    };
    return this.fetch<TrendingResponse>("/podcasts/trending", qs);
  }

  getSoundbites(
    max?: number
  ): Observable<SoundbitesResponse> {
    let qs: AnyQueryOptions = {
      max: max
    };
    return this.fetch<SoundbitesResponse>("/recent/soundbites", qs);
  }


  getRecentEpisodes(
    max?: number,
    before?: number,
    excludeString?: string,
    fulltext?: boolean
  ): Observable<RecentEpisodesResponse> {
    let qs: AnyQueryOptions = {
      max: max ?? 25,
      excludeString: excludeString,
      before: before,
      fulltext: fulltext
    };
    const result = this.fetch<RecentEpisodesResponse>("/recent/episodes", qs);
    return result;
  }


  getRecentFeeds(
    max?: number,
    lang?: string,
    since?: number,
    cat?: string,
    notcat?: string
  ): Observable<RecentFeedsResponse> {
    let qs: AnyQueryOptions = {
      max: max ?? 25,
      lang: lang ?? 'en',
      since: since,
      cat: cat,
      notcat: notcat
    };
    const result = this.fetch<RecentFeedsResponse>("/recent/feeds", qs);
    return result;
  }

  getPodcastsById(
    id?: number,
  ): Observable<PodcastsByIdResponse> {
    let qs: AnyQueryOptions = {
      id
    }
    const result = this.fetch<PodcastsByIdResponse>("/podcasts/byfeedid", qs);
    return result;
  }


  getPodcastsByMedium(
    medium?: Medium,
  ): Observable<PodcastsByIdResponse> {
    let qs: AnyQueryOptions = {
      medium
    }
    console.log(qs, medium);
    const result = this.fetch<PodcastsByIdResponse>("/podcasts/bymedium", qs);
    return result;
  }


  getEpisodesById(
    id?: string,
  ): Observable<EpisodesByIdResponse> {
    let qs: AnyQueryOptions = {
      id
    }
    const result = this.fetch<EpisodesByIdResponse>("/episodes/byfeedid", qs);
    return result;
  }


  searchByTerm(
    q: string,
    clean?: boolean,
    max?: number,
    fulltext?: boolean,
    val?: Value,
    aponly?: boolean
  ): Observable<SearchResponse> {
    let qs: AnyQueryOptions = {
      q: q,
      max: max ?? 25,
      val: val,
      aponly: aponly,
      clean: clean,
      fulltext: fulltext,
    };
    const result = this.fetch<SearchResponse>("/search/byterm", qs);
    return result;
  }

  encodeObjectToQueryString(qs?: AnyQueryOptions) {
    if (!qs) {
      return null;
    }

    return Object.entries(qs)
      .map(([key, val]) => {
        if (!val) {
          return null;
        }

        if (Array.isArray(val)) {
          return `${key}[]=${(val as unknown[]).map((v) => encodeURI(`${v}`)).join(",")}`;
        }

        if (val === true) {
          return key;
        }

        return `${key}=${encodeURI(`${val}`)}`;
      })
      .filter((x) => x)
      .join("&");
  }

  fetch<T>(endpoint: string, qs?: AnyQueryOptions): Observable<T> {
    const queryString = qs ? this.encodeObjectToQueryString(qs) : null;
    const url = `${API_URL}${endpoint}${queryString ? `?${queryString}` : ``}`;
    return this.http.get<T>(url);
  }
}

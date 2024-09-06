// Interfaces.ts

export interface VideoSnippet {
    title: string;
    description: string;
    channelTitle: string
    
  }
  
  export interface VideoContentDetails {
    duration: string;
    
  }
  
  export interface VideoStatistics {
    viewCount: string;
   
  }
  
  export interface VideoData {
    id: string;
    snippet: VideoSnippet;
    contentDetails: VideoContentDetails;
    statistics: VideoStatistics;
  }
  
  export interface YouTubeApiResponse {
    items: VideoData[];
  }
  
import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { from, Observable } from 'rxjs';

export interface Client {
  id?: number;
  name: string;
  notes: string;
  leftHanded: boolean;
  oneHandBackhand: boolean;
}

export interface VideoEntry {
  id?: number;
  name: string;
  swingType: string;
  contactPoint: number;   // seconds
  notes: string;
  leftHanded: boolean;
  oneHandBackhand: boolean;
  linkedClient: string;
  fileName: string;
  fileSize: number;
}

const DB_NAME = 'tennis-replay-db';
const DB_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class StorageService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('clients')) {
          db.createObjectStore('clients', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('videoFiles')) {
          // stores raw video Blobs keyed by video id
          db.createObjectStore('videoFiles');
        }
      }
    });
  }

  // ── Clients ──────────────────────────────────────────────────────────────

  async getClients(): Promise<Client[]> {
    const db = await this.dbPromise;
    return db.getAll('clients');
  }

  async addClient(client: Client): Promise<number> {
    const db = await this.dbPromise;
    return db.add('clients', client) as Promise<number>;
  }

  async updateClient(client: Client): Promise<void> {
    const db = await this.dbPromise;
    await db.put('clients', client);
  }

  async deleteClient(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('clients', id);
  }

  // ── Videos ───────────────────────────────────────────────────────────────

  async getVideos(): Promise<VideoEntry[]> {
    const db = await this.dbPromise;
    return db.getAll('videos');
  }

  async addVideo(video: VideoEntry, file: Blob): Promise<number> {
    const db = await this.dbPromise;
    const id = await db.add('videos', video) as number;
    await db.put('videoFiles', file, id);
    return id;
  }

  async updateVideo(video: VideoEntry): Promise<void> {
    const db = await this.dbPromise;
    await db.put('videos', video);
  }

  async updateVideoWithFile(video: VideoEntry, file: Blob): Promise<void> {
    const db = await this.dbPromise;
    await db.put('videos', video);
    await db.put('videoFiles', file, video.id);
  }

  async deleteVideo(id: number): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('videos', id);
    await db.delete('videoFiles', id);
  }

  async getVideoBlob(id: number): Promise<Blob | undefined> {
    const db = await this.dbPromise;
    return db.get('videoFiles', id);
  }

  async getVideoObjectUrl(id: number): Promise<string | null> {
    const blob = await this.getVideoBlob(id);
    if (!blob) return null;
    return URL.createObjectURL(blob);
  }
}

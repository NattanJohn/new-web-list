import type { FullConfig } from '@playwright/test';
import { ReadableStream, TransformStream, WritableStream } from 'node:stream/web';

export default async function globalSetup(_: FullConfig) {
  const globalAny = globalThis as any;

  if (typeof globalAny.TransformStream === 'undefined') {
    globalAny.TransformStream = TransformStream;
  }
  if (typeof globalAny.ReadableStream === 'undefined') {
    globalAny.ReadableStream = ReadableStream;
  }
  if (typeof globalAny.WritableStream === 'undefined') {
    globalAny.WritableStream = WritableStream;
  }
}

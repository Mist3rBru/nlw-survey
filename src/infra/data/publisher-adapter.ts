/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
  type IPublisher,
  type Subscriber,
} from '#services/protocols/data/publisher.js'

export class PublisherAdapter implements IPublisher {
  private channels: Record<string, Subscriber[]> = {}

  private subscribe(channelId: string, subscriber: Subscriber): void {
    if (!this.channels[channelId]) {
      this.channels[channelId] = []
    }
    this.channels[channelId].push(subscriber)
  }

  public publish(channelId: string, message: unknown): void {
    for (const subscriber of this.channels[channelId]) {
      subscriber(message)
    }
  }

  public onPublish(channelId: string, subscriber: Subscriber): void {
    this.subscribe(channelId, subscriber)
  }
}
